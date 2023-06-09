// This code is responsible for rendering the CreatePost component, which allows users to create and share images using DALL-E.

import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets';
import {getRandomPrompts} from '../utils';
import {FormField, Loader} from '../components';

// Get a random prompt from the list of prompts
const prompts = getRandomPrompts()

/**
 * CreatePost component allows users to create and share images using DALL-E.
 * @returns {JSX.Element} CreatePost component
 */
const CreatePost = () => {
  const  navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Generate an image using the DALL-E API
   * @returns {Promise<void>}
   */
  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true); 
        const response = await fetch('https://dallepic.onrender.com/api/v1/dalle', {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
              },
                body: JSON.stringify({prompt: form.prompt})
            
        })
        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (error) {
       alert(error)
      } finally {
        setGeneratingImg(false); 
       }
      } else {
          alert('Please enter a prompt')
      }
    };

  /**
   * Handle form submission
   * @param {Event} e - form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
        setLoading(true);

          try {
          const response = await fetch('https://dallepic.onrender.com/api/v1/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
          })
          await response.json();
          navigate('/');
     
        } catch (err) {
          alert(err)
         } finally {
          setLoading(false);
         }
        } 
        else {
          alert('Please enter a prompt and generate an image')
        } 
      
  }

  /**
   * Handle form input changes
   * @param {Event} e - form input change event
   */
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  /**
   * Handle "Surprise Me" button click
   */
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setForm({...form, prompt: randomPrompt})
  }

  // Render the CreatePost component
  return (
    <section className="max-w-7xl mx-auto ">
      <div>
          <h1 className="font-extrabold text-[#070231] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w [500px]"> Create Stunning Images using DALL-E and share them with others. </p>
        </div>
        <div>
            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <FormField
                  labelName="Your Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  handleChange={handleChange}
                  /> 
                  <FormField
                  labelName="Prompt"
                  type="text"
                  name="prompt"
                  placeholder="A futuristic cyborg dance club, neon lights"
                  value={form.prompt}
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
                
                  />
                <div className="relative bg-[#cdd6da] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-3 h-64 flex justify-center items-center">
                  {form.photo ? (
                  <img 
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                  />  
                  ) : (
                    <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"/>
                )}
                    {generatingImg && (
                      <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                        <Loader />
                      </div>
                    )}
                </div>
              </div>
              <div className="mt-5 flex gap-5">
                <button
                type="button"
                onClick={generateImage}
                className="text-white bg-[#15058f] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                  {generatingImg ? 'Generating...' : 'Generate'}
                </button>

              </div>
              <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">Now if you want you can share this image with other.</p>
                    <button 
                    type="submit"
                    className="mt-3 text-white bg-[#247075] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                   >
                      {loading ? 'Sharing...' : 'Share it with others'}
                    </button>
              </div>
            </form>
        </div>

    </section>
  )
}

export default CreatePost



