import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    
    return ( data.map((post) => <Card key={post._id} {...post} />)
);
  }
    return (
      <h2 className="mt-5 font-bold text[#6449ff] text-xl uppercase"> {title} </h2> );
};
const Home = () => {
  const [loading, setloading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            setloading(true);

            try {
              const response = await fetch('https://dallepic.onrender.com/api/v1/posts', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',}
              }
            );
            if(response.ok) {
              const result = await response.json();
              setAllPosts(result.data.reverse());
            }
          } catch (error) {
              alert(error);
            } finally {
                setloading(false);
        }
      };

        fetchPosts();
    }, []);
      const handleSearchChange = (e) => {
          clearTimeout(searchTimeout);

        setsearchText(e.target.value);


        setSearchTimeout(
        setTimeout(() => {
          const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResults);
        }, 200)
        );
      }
    return (
    <section className="max-w-7x1 mx-auto">
        <div>
          <h1 className="font-extrabold text-[#070231] text-[32px]">Discover</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w [500px]"> Check out what others has generated so far, will yours better? </p>
        </div>
        <div className="mt-16">
          <FormField
          labelName="search posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange} />
        </div>
        
        <div className="mt-10">
          { loading ? (
            <div className="flex justify-center items-center">
              <Loader 
              />
            </div>
          ) : (
            <>
            { searchText && (
              <h2 className="font-medium text-[#666e75] text -xl mb-3">
                Showing results for <span className="text-[#666e75]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCards 
                data={searchedResults}
                title="No search results found"
                />
          ) : (
            <RenderCards
            data={allPosts}
            title="No posts found"
            />
          )}
            </div>
            </>
          )}
        </div>
    </section>
  )
}

export default Home;