import React from 'react'
import Nav_Chunk from '../Chunks.Dashboard/Nav.Chunk'
import Home_Chunk from '../Chunks.Dashboard/Home.Chunk'
import { Outlet } from 'react-router-dom'

function Home_Pages() {
  return (
    <div className=' w-full h-screen flex items-start justify-start gap-4 overflow-hidden'>
     <Nav_Chunk/>
     <Outlet/>
    </div>
  )
}

export default Home_Pages