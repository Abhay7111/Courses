import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav_Chunk() {
     const [courses, setCourses] = useState([]);
     const {openNav, setOpenNav} = useState(null)

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
          <div className={`${openNav ? 'w-32' : 'w-14'} h-screen bg-red-400 flex flex-col items-center p-3 gap-2 transition-all `}>
               <div className={`${openNav ? 'w-full' : 'w-8'} transition-all h-8 rounded-lg bg-green-400 flex items-center justify-center cursor-pointer`} onClick={() => setOpenNav(openNav)}>

               </div>
               <ul className='flex flex-col gap-2'>
                    {courses.map((course, index) => (
                         <NavLink key={index} to={`/course/${course._id}`} className={`flex items-center flex-nowrap gap-2`} ><i className={`${course.icon}`}></i> { openNav && <h2 className='text-nowrap'>{course.title}</h2>}</NavLink>
                    ))}
               </ul>
          </div>
     );
}

export default Nav_Chunk;