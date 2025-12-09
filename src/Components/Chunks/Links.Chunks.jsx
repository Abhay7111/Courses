import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';

function Links_Chunks() {
     const API = 'https://server-01-v2cx.onrender.com/getcourse';
     const [data, setData] = useState('');
     // const [error, setError] = useState(null);

     useEffect(() => {
          const fetchData = async () => {
               const responce = await axios.get(API);
               setData(responce.data);
          }
          fetchData();
     }, []);

     const Loading = <div className='animate-spin bg-transparent flex items-center justify-center size-5 rounded-full'><RefreshTwoToneIcon/></div>;

  return (
    <div className='w-full flex flex-col gap-4 items-center py-3 font-color'>
     <h1 className='text-3xl font-medium w-full text-center'>Quick link</h1> 
     <p className='w-full text-center opacity-60 font-light'>Easily access important pages, resources, and services, and services all in one place</p>
     <div className='w-full max-w-[1200px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
          {data ? data.map((items, index) => (
               <NavLink to={`/course/${items._id}`} key={index} className='w-full h-40 bg-zinc-800 rounded-2xl p-3 flex flex-col justify-between items-start gap-2 hover:bg-[#393E46]/40 transition-all border border-zinc-700/30'>
                    <div>
                         <h1 className='text-xl font-medium poppins'><i className={`${items.icon} text-2xl font-light`}></i>{items.title}</h1>
                         <p className='text-sm font-extralight opacity-70 poppins line-clamp-2'>{items.description}</p>
                    </div>
                    <div>
                         <NavLink to={`/course/${items._id}`} className='text-sm font-mono underline underline-offset-2 hover:text-blue-500 opacity-70 poppins'>Explore Now <i className='ri-arrow-right-line'></i></NavLink>
                    </div>
               </NavLink>
          )) : <div className='text-lg font-light opacity-60'>{Loading}</div>}
     </div>
    </div>
  )
}

export default Links_Chunks