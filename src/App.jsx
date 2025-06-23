
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Newsdetails from './components/Newsdetails';
import CategoryNews from './components/CategoryNews';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:category" element={<CategoryNews />} />
        <Route path="/news/details/:title" element={<Newsdetails />} />
      </Routes>
    </>
  );
}

export default App;







// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'
// import Home from './components/Home'
// import Sport from './pages/Sport'
// import { Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Loader from './components/Loader'
// import PageWrapper from './pages/PageWrapper'
// import Newsdetails from './components/Newsdetails'
// import CategoryNews from './components/CategoryNews'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     {/* <PageWrapper> */}
//     <Navbar/>
//     {/* </PageWrapper> */}
//     {/* <Loader/> */}
    
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* <Route path="/sports" element={<Sport />} /> */}
//       {/* <Route path="/news/:category" element={<CategoryNews />} /> */}
//       <Route path="/news/details/:title" element={<CategoryNews />} />
//     </Routes>
//       {/* <Home/> */}

//     </>
//   )
// }

// export default App
