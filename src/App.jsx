import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import Navbar from './components/Navbar'
import PrivateRoutes from './components/PrivateRoutes'


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/'  element={ 
        <PrivateRoutes> 
          <Todos/>
        </PrivateRoutes>
    } />
      <Route path='/login' element={ <Login />}  />
      <Route  path='/register' element={ <Register/>  } />
    </Routes>
    </>
  )
}

export default App
