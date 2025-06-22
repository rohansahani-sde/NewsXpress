import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home'
import Sport from './pages/Sport'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import PageWrapper from './pages/PageWrapper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <PageWrapper> */}
    <Navbar/>
    {/* </PageWrapper> */}
    {/* <Loader/> */}
    
    <Routes>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/sports" element={<Sport />} />
    </Routes>
      {/* <Home/> */}

    </>
  )
}

export default App
