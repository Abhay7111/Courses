import { useEffect } from 'react'
import Book from '../../assets/BookReading.mp4'

function Hero_Chunk() {
  useEffect(() => {
    const video = document.getElementById("herovideo");
    if (video) {
      video.addEventListener("canplay", () => {
        setTimeout(() => {
          video.play();
        }, 5000);
      });
    }
  }, []);
  return (
    <div className={`w-full h-96 lg:h-[800px] rounded-4xl p-2 bg-zinc-800 overflow-hidden relative transition-all`}>
     <video id='herovideo' src={Book} poster='https://cdn.pixabay.com/photo/2021/10/14/13/50/book-6709160_1280.jpg' autoplay='true' muted loop className={`w-full h-full object-cover object-bottom rounded-3xl opacity-70 absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></video>
     <div className={`w-full h-full rounded-3xl relative z-10 flex flex-col justify-end items-start`}>
      <div className='w-full min-h-60 text-white bg-zinc-800/50 rounded-b-3xl rounded-t-xl p-3 flex flex-col justify-start items-start gap-4'>
        <p className='text-sm font-mono opacity-70 poppins'><i className='ri-home-5-line'></i> Home / Study with Abhay7111</p>
        <h1 className='text-3xl font-medium poppins'>Empowering Education <br /> For All: Making Learning <br /> Accessible and Affordable</h1>
        <p className='text- font-light opacity-75'>Uncover the workinga and advantages of the Education system, explore local and international study options, and discover the application proces...</p>
      </div>
     </div>
    </div>
  )
}

export default Hero_Chunk