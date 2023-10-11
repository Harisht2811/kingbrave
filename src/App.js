import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Login } from './Component/Pages/Login';
import { UserAuthContextProvider } from './Firebase/UserAuth';



function App() {

  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <div><Toaster /></div>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>


  )
}

export default App