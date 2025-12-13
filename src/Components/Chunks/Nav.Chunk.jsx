import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav_Chunk() {
  return (
    <div className='w-full min-h-10 flex items-center justify-between text-white'>
      <NavLink to={`/`} className={`text-2xl font-medium denk-one-regular`} >Abhay7111</NavLink>
      <div className={`min-w-40 h-10 flex items-center justify-start gap-4`}>
        <NavLink to={``} className={`poppins text-base font-light opacity-50 hover:opacity-100 transition-all duration-300`}>Home</NavLink>
        <NavLink to={`dashboard`} className={`poppins text-base font-light opacity-50 hover:opacity-100 transition-all duration-300`}>Dashboard</NavLink>
        <NavLink to={``} className={`poppins text-base font-light opacity-50 hover:opacity-100 transition-all duration-300`}>Course</NavLink>
        <NavLink to={``} className={`poppins text-base font-light opacity-50 hover:opacity-100 transition-all duration-300`}>Blog</NavLink>
        <NavLink to={``} className={`poppins text-base font-light opacity-50 hover:opacity-100 transition-all duration-300`}>Login</NavLink>
      </div>
    </div>
  )
}

export default Nav_Chunk