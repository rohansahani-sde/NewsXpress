import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="bg-[#192025] text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-semibold">
          <Link to="/"> 📰 NewsExpress </Link>
        </h1>
        

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/">Home</Link>
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/world">World</Link>
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/business">Business</Link>
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/technology">Technology</Link>
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/politics">Politics</Link>
          <Link className="text-blue-300 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/health">Health</Link>
        </div>

        {/* Search Bar (Large scrren  visible) */}
        <form onSubmit={handleSearch} className="hidden xl:flex gap-2">
            <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded text-black w-64"
            />
        <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Search
        </button>
    </form>

        


        {/*  Menu (Mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl ml-3 focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>



      <form
  onSubmit={handleSearch}
  className="flex  gap-2 items-center justify-end lg:justify-center xl:hidden "
>
  <input
    type="text"
    placeholder="Search news..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="px-3 py-2 border rounded text-black outline-none text-sm sm:text-base"
  />
  
  <button
    type="submit"
    className="text-xs sm:text-sm md:text-base 
               bg-blue-500 hover:bg-blue-600 
               text-white 
               px-3 sm:px-3 md:px-4 
               py-3 sm:py-2 
               rounded 
               flex items-center gap-x-1 sm:gap-x-2"
  >
    Search <FaSearch />
  </button>
</form>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#192025] flex items-center flex-col gap-4 p-4">
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/world" onClick={() => setMenuOpen(false)}>World</Link>
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/business" onClick={() => setMenuOpen(false)}>Business</Link>
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/technology" onClick={() => setMenuOpen(false)}>Technology</Link>
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/politics" onClick={() => setMenuOpen(false)}>Politics</Link>
          <Link className="text-blue-500 hover:text-white rounded-md p-2 hover:bg-blue-500" to="/news/health" onClick={() => setMenuOpen(false)}>Health</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




// // import React from 'react'
// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa'
// // import logo from '/logo.png'
// import { Link, Links, useNavigate } from 'react-router-dom';

// const Navbar = () => {

//     const [query, setQuery] = useState('');
//     const navigate = useNavigate();

  
//     const handleSearch = (e) =>{
//         e.preventDefault();    
//         if (query.trim()) {
//             navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//             // setQuery(''); // Clear input after search
//         }
//         console.log('search button clicked')
//     }
    
    
//   return (
//     <>
//     <nav className=' text-white'>
//         <div className='bg-[#192025] flex h-24 justify-evenly items-center'>

//             {/* logo */}
//             <div>
//                 <h1 className=' text-3xl font-semibold '><Link to='/'> 📰 NewsExpress </Link></h1>
//             </div>
//             <div className='flex justify-between w-1/3'>
//                 <div> <Link to="/">Home</Link></div>
//                 <div> <Link to="/news/world">World</Link></div>
//                 <div> <Link to="/news/business">Business</Link></div>
//                 <div> <Link to="/news/technology">Technology</Link></div>
//                 <div> <Link to="/news/politics">Politics</Link></div>
//                 <div> <Link to="/news/health">Helth</Link></div>
                
//             </div>
//             {/* search logo */}
//             {/* <div className='flex items-center bg-white text-[#192025] border rounded p-2'>
//                 <input
//                 type="text"
//                 placeholder="Search news..."
                
//                 />

//                 <FaSearch/>
                

//             </div> */}
//             <form onSubmit={handleSearch} className="flex gap-2" >
//                 <input
//                 type="text"
//                 placeholder="Search news..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="px-3 py-1 border rounded text-black"
//                 />
//                 <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                     Search
//                 </button>
//             </form>
            
//         </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar