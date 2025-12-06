import React, { useState } from 'react'
import Nav_Chunk from '../Components/Chunks/Nav.Chunk'
import Header_Chunk from '../Components/Chunks/Header.Chunk'
import Hero_Chunk from '../Components/Chunks/Hero.Chunk'
import Links_Chunks from '../Components/Chunks/Links.Chunks';

function Landing_Page() {
     const [head] = useState(false);
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start gap-2 p-2'>
     <div className={`max-h-12 w-full bg-green-400`}>
          {head && <Header_Chunk/>}
     </div>
     <Nav_Chunk/>
     <Hero_Chunk/>
     <Links_Chunks/>
    </div>
  )
}

export default Landing_Page