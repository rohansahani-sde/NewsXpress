import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({children }) => {
    const[loading, setLoading] = useState(true);
    const location = useLocation();
    useEffect(() =>{
        setLoading(true);
        const timer = setTimeout(() =>setLoading(false), 700);
        return () => clearTimeout(timer);
    },[location.pathname])

  return loading ? <Loader /> : <>{children }</>
  
}

export default PageWrapper