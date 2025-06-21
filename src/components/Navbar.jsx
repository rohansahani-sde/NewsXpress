// import React from 'react'
import { FaSearch } from 'react-icons/fa'
// import logo from '/logo.png'

const Navbar = () => {
  return (
    <>
    <nav className=' text-white'>
        <div className='bg-[#192025] flex h-24 justify-evenly items-center'>

            {/* logo */}
            <div>
                <h1 className=' text-3xl font-semibold '>NewsExpress</h1>
            </div>
            <div className='flex justify-between w-1/3'>
                <div>Home</div>
                <div>Top HeadLines</div>
                <div>Technology</div>
                <div>Sport</div>
                <div>Entertainment</div>
            </div>
            {/* search logo */}
            <div>
                <FaSearch/>
                

            </div>
            
        </div>
    </nav>
    </>
  )
}

export default Navbar