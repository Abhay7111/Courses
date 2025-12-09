import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../../Css/Dashboard.Css/Root.Dashboard.css'

function Root_Chunks() {
  return (
    <div className=' w-full '>
     <Outlet/>
    </div>
  )
}

export default Root_Chunks