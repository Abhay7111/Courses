import React from 'react'
import Book from '../../assets/BookReading.mp4'

function Hero_Chunk() {
  return (
    <div className={`w-full h-[800px] rounded-4xl p-2 bg-zinc-800 overflow-hidden relative`}>
     <video src={Book} autoplay='true' muted loop className={`w-full h-full object-cover object-bottom rounded-3xl opacity-70 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></video>
     <div className={`w-full h-full rounded-3xl`}></div>
    </div>
  )
}

export default Hero_Chunk