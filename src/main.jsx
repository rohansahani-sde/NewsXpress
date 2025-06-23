import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PageWrapper from './pages/PageWrapper.jsx';

createRoot(document.getElementById('root')).render(
  //  <React.StrictMode>
    <StrictMode>
      <BrowserRouter>
      {/* <Navbar /> */}
      <PageWrapper>

      <App />
      </PageWrapper>
      </BrowserRouter>
    </StrictMode>,
  // </React.StrictMode>
)
