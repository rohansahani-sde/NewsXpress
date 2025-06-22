// import React from 'react'
import { FaSearch } from 'react-icons/fa'
// import logo from '/logo.png'
import { Link, Links } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <nav className=' text-white'>
        <div className='bg-[#192025] flex h-24 justify-evenly items-center'>

            {/* logo */}
            <div>
                <h1 className=' text-3xl font-semibold '><Link to='/'> 📰 NewsExpress </Link></h1>
            </div>
            <div className='flex justify-between w-1/3'>
                <div> <Link to="/" className="font-semibold hover:underline">Home</Link></div>
                <div>Top HeadLines</div>
                <div>Technology</div>
                <div><Link to="/sports"> Sport </Link></div>
                <div>Entertainment</div>
            </div>
            {/* search logo */}
            <div className='flex items-center bg-white text-[#192025] border rounded p-2'>
                <input
                type="text"
                placeholder="Search news..."
                
                />

                <FaSearch/>
                

            </div>
            
        </div>
    </nav>
    </>
  )
}

export default Navbar