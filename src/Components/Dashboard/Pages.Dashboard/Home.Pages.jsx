import React from 'react'
import Nav_Chunk from '../Chunks.Dashboard/Nav.Chunk'
import Home_Chunk from '../Chunks.Dashboard/Home.Chunk'
import { Outlet } from 'react-router-dom'

function Home_Pages() {
  return (
    <div className=' w-full h-screen flex items-start justify-start gap-4 overflow-hidden p-1'>
     <div>
     <Nav_Chunk/>
     </div>
     <div className='w-full h-screen'>
      <Outlet/>
     </div>
    </div>
  )
}

export default Home_Pages