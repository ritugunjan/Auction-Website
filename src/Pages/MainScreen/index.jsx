import React from 'react'
import NavBar from '../../Components/NavBar'
import { Outlet } from "react-router-dom";

const MainScreen = ({ }) =>
{
  return (
    <div className='h-[100vh] w-100'>
      <NavBar />
      <Outlet />
    </div >
  )
}

export default MainScreen