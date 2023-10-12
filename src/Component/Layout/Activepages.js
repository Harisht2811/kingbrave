import React from 'react'
import { useParams } from 'react-router-dom'

import Home from '../Pages/Home';
import About from '../Pages/About';
import Userprofile from '../Pages/Userprofile';

const Activepages = () => {
  const params = useParams();
  const activeScreens = params.screens
  // console.log(activeScreens)
  
  const activeRoutes = {
    home:<Home/>,
    about:<About/>,
    userprofile:<Userprofile/>,
  }
  return (
    <div className=' ml-[200px]'> 
     {activeRoutes[activeScreens] || <Home/>}
    </div>
  )
}

export default Activepages