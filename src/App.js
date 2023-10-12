import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserAuthContextProvider } from './Firebase/UserAuth';

import { Login } from './Component/Pages/Login';
import Mainpage from './Component/Layout/Mainpage';


function App() {

  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <div><Toaster /></div>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/:screens' element={<Mainpage />}></Route>
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  )
}

export default App