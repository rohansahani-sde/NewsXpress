import React from 'react'
import load from '/load.gif'

const Loader = () => {
  return (
    <div className='bg-black w-full min-h-screen flex flex-col justify-center items-center '>
        <img src={load} alt="" 
        className=' h-40'
        />
        <h1 className='text-[#FFFFFE]'>Loading...</h1>
    </div>
  )
}

export default Loader