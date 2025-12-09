import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

function Nav_Chunk() {
     const [openNav, setOpenNav] = useState(null)
     const [courses, setCourses] = useState([]);

     useEffect(() => {


          const fetchCourses = async () => {
               try {
                    const response = await fetch('https://server-01-v2cx.onrender.com/getcourse');
                    const data = await response.json();
                    setCourses(data);
               } catch (error) {
                    console.error('Error fetching courses:', error);
               }
          };

          fetchCourses();
     }, []);

     return (
          <div className={`${openNav ? 'w-40 items-start' : 'w-[55px] items-center'} h-screen bg-gradient-to-t from-[#452829]/10 to-[#E8D1C5]/30 border-r border-zinc-800 overflow-hidden flex flex-col justify-between p-3 gap-2 transition-all `}>
               <div className={` w-full flex flex-col ${openNav ? 'items-start' : 'items-start '} gap-3 h-full`}>
                    <div className={`w-full flex ${openNav ? 'flex-row' : 'flex-col '} items-center justify-between`}>
                         <div className='w-10 h-11      rounded-md flex items-center justify-center'>
                              <img src="https://cdn.pixabay.com/photo/2017/07/26/13/51/ammonite-2541707_1280.png" />
                         </div>
                         <div onClick={() => setOpenNav((prev)=>!prev)} className={` transition-all h-8 rounded-lg flex items-center justify-center cursor-pointer`}>
                              {openNav ? <div className='flex flex-nowrap items-center justify-center text-sm font-bold overflow-hidden'><i title='close sider bar' class="ri-side-bar-fill"></i> </div> : <i title='Open sider bar' class="ri-side-bar-line"></i>}
                         </div>
                    </div>
                    <ul className='flex flex-col gap-2 rounded-md overflow-auto h-full'>
                         {courses.length > 0 ? courses.map((course, index) => (
                              <NavLink title={course.title} key={index} to={`/course/${course._id}`} className={`flex items-center flex-nowrap rounded-md gap-2 h-8 px-2 hover:scale-[1.03] ${openNav ? 'w-full justify-start' : 'w-8 justify-center'}`} ><i className={`${course.icon} text-[1.23rem]`}></i> { openNav && <h2 className='text-nowrap poppins text-sm'>{course.title}</h2>}</NavLink>
                         )) : <div className='animate-spin bg-transparent flex items-center justify-center size-5 rounded-full'><RefreshTwoToneIcon/></div>}
                    </ul>
               </div>
               <div className='w-8 h-8 bg-red-400 rounded-md'>
                    {/* Profile Section */}
                    <div>
                         <img src="https://cdn.pixabay.com/photo/2016/10/17/19/40/indians-1748464_960_720.jpg" className='size-8 rounded-md object-cover object-center' />
                    </div>
               </div>
          </div>
     );
}

export default Nav_Chunk;