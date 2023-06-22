/**
 * This component is the home page of the application. It fetches posts from an API and displays them in a grid. 
 * It also allows users to search for posts by name or prompt. 
 * 
 * @component
 */

import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'

/**
 * This component renders the cards for each post. 
 * 
 * @param {Array} data - An array of post objects to be rendered as cards.
 * @param {string} title - The title to be displayed if there are no posts to render.
 * @returns {JSX.Element} - The rendered cards or the title if there are no posts to render.
 */
const RenderCards = ({ data, title }) => {
  if(data?.length > 0) {
    return ( data.map((post) => <Card key={post._id} {...post} />));
  }
  return (
    <h2 className="mt-5 font-bold text[#6449ff] text-xl uppercase"> {title} </h2> 
  );
};

/**
 * This component is the home page of the application. It fetches posts from an API and displays them in a grid. 
 * It also allows users to search for posts by name or prompt. 
 * 
 * @returns {JSX.Element} - The rendered home page.
 */
const Home = () => {
  const [loading, setloading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null);

  /**
   * This function fetches all posts from the API and sets the state of allPosts. 
   * It also sets the loading state to true while the data is being fetched. 
   */
  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);

      try {
        const response = await fetch('https://dallepic.onrender.com/api/v1/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
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

  /**
   * This function handles changes to the search input field. 
   * It sets the searchText state and sets a timeout to search for posts after 200ms. 
   * 
   * @param {Object} e - The event object.
   */
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

