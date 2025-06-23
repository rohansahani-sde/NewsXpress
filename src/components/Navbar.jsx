// import React from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
// import logo from '/logo.png'
import { Link, Links, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

  
    const handleSearch = (e) =>{
        e.preventDefault();    
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            // setQuery(''); // Clear input after search
        }
        console.log('search button clicked')
    }
    
    
  return (
    <>
    <nav className=' text-white'>
        <div className='bg-[#192025] flex h-24 justify-evenly items-center'>

            {/* logo */}
            <div>
                <h1 className=' text-3xl font-semibold '><Link to='/'> 📰 NewsExpress </Link></h1>
            </div>
            <div className='flex justify-between w-1/3'>
                <div> <Link to="/">Home</Link></div>
                <div> <Link to="/news/world">World</Link></div>
                <div> <Link to="/news/business">Business</Link></div>
                <div> <Link to="/news/technology">Technology</Link></div>
                <div> <Link to="/news/politics">Politics</Link></div>
                <div> <Link to="/news/health">Helth</Link></div>
                
            </div>
            {/* search logo */}
            {/* <div className='flex items-center bg-white text-[#192025] border rounded p-2'>
                <input
                type="text"
                placeholder="Search news..."
                
                />

                <FaSearch/>
                

            </div> */}
            <form onSubmit={handleSearch} className="flex gap-2" >
                <input
                type="text"
                placeholder="Search news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 border rounded text-black"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Search
                </button>
            </form>
            
        </div>
    </nav>
    </>
  )
}

export default Navbar