
/**
 * This is the main component of the application.
 * It renders the header and main content of the app.
 * The header contains a logo and a link to create a new post.
 * The main content contains the routes to the home page and create post page.
 * @return {JSX.Element} Returns the main component of the app.
 */
import React from 'react';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      {/* Header section */}
      <header className="w-full flex justify-between items-center bg-[#eef5fc] sm:px-8 px-4 py-4 ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 h-15 object-contain"/>
        </Link>
        <Link to="/createpost" className="font-inter font-medium bg-[#120476] text-white py-2 px-4 rounded-md">Create</Link>
      </header>
      {/* Main content section */}
      <main className="sm:p-8 px-4 py-8 w-full bg-[#eef5fc] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/createpost" element={<CreatePost />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App


