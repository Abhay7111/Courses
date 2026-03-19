import React, { useEffect, useState } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';

function Main_Chapter_Chunk() {
  const { courseId, chapterId } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openChapterName, setOpenChapterName] = useState(true);

  // Util: sort subPosts as in Chapters_Chunk
  function sortSubPosts(arr) {
    if (!Array.isArray(arr)) return [];
    const subPostsArr = [...arr];
    const firstPageIndex = subPostsArr.findIndex(sp => Number(sp.page) === 1);
    let firstPageSubPost = null;
    if (firstPageIndex !== -1) {
      firstPageSubPost = subPostsArr.splice(firstPageIndex, 1)[0];
    }
    const restSorted = subPostsArr.sort((a, b) => {
      const pageA = Number(a.page ?? Infinity);
      const pageB = Number(b.page ?? Infinity);
      return pageA - pageB;
    });
    return firstPageSubPost ? [firstPageSubPost, ...restSorted] : restSorted;
  }

  useEffect(() => {
    let ignore = false;
    async function fetchCourseAndChapters() {
      setLoading(true);
      setError(null);
      try {
        let courseRes = await fetch('https://server-01-v2cx.onrender.com/getcourse');
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          let foundCourse = null;
          if (Array.isArray(courseData)) {
            foundCourse = courseData.find(item => item._id === courseId);
          } else if (courseData && courseData._id === courseId) {
            foundCourse = courseData;
          }
          if (foundCourse) {
            let subPostsArr =
              Array.isArray(foundCourse.subPosts)
                ? sortSubPosts(foundCourse.subPosts)
                : Array.isArray(foundCourse.subposts)
                ? foundCourse.subposts
                : Array.isArray(foundCourse.subCourse)
                ? foundCourse.subCourse
                : [];
            if (!ignore) {
              setCourse(foundCourse);
              setChapters(subPostsArr || []);
            }
          } else {
            if (!ignore) {
              setCourse(null);
              setChapters([]);
              setError("Course not found");
            }
          }
        } else {
          if (!ignore) {
            setCourse(null);
            setChapters([]);
            setError("Failed to load course");
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchCourseAndChapters();
    return () => { ignore = true; };
  }, [courseId]);

  // Helper: get course name (matches Chapters.Chunk style)
  const courseName = (course && (course.title || course.name)) || "Unnamed Course";

  // Helper: ordinal
  const getOrdinal = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + 'st';
    if (j === 2 && k !== 12) return num + 'nd';
    if (j === 3 && k !== 13) return num + 'rd';
    return num + 'th';
  };

  // Helper: detect active chapter by id
  const isChapterActive = (chapter) => {
    return (chapterId
      && (chapter._id === chapterId || chapter.id === chapterId)
    );
  };

  return (
    <div className="text-white w-full md:max-w-full h-full flex overflow-hidden poppins">
      {/* <div className='w-full flex items-center'>
        <h1 className="text-2xl font-bold text-zinc-200">
          {loading
            ? "Loading..."
            : error
            ? error
            : courseName}
        </h1>
      </div> */}
      {/* Render chapter nav if chapters exist */}
      {(!loading && !error && chapters.length > 0) && (
        <div className={`${openChapterName ? 'w-60' : 'w-20'} lg:min-w-fit px-1.5 transition-all duration-300 relative rounded-md overflow-y-scroll overflow-x-visible`}>
          <div
            onClick={() => setOpenChapterName(prev => !prev)}
            className=' lg:hidden absolute w-5 h-5 rounded-full bg-green-400/20 right-0 top-2 flex items-center justify-center'>
            <i className={`${openChapterName ? 'ri-arrow-left-line' : 'ri-arrow-right-line'}`}></i>
          </div>
          <div className=' h-fit flex flex-col items-start justify-start text-nowrap overflow-hidden gap-1'>
            <div className='w-full h-10 bg-transparent flex items-center justify-start px-1'>
              <h2>Chapters</h2>
            </div>
            {chapters.map((chapter, index) => {
              const pageNum = chapter.page || (index + 1);
              return (
                <NavLink
                  key={chapter._id || chapter.id || index}
                  to={`${chapter._id || chapter.id}`}
                  className={({ isActive }) =>
                    `text-sm w-fit font-light poppins py-0.5 px-1.5 hover:text-zinc-100 rounded-md
                    ${
                      isActive || isChapterActive(chapter)
                        ? 'bg-zinc-700/50 border-zinc-200/20 border text-zinc-100'
                        : 'bg-transparent text-zinc-500 border border-transparent hover:border-zinc-500/10 transition-all duration-300'
                    }`
                  }
                  title={`${chapter.title ? chapter.title + ' - ' : ''}${getOrdinal(pageNum)}`}
                  end={false}
                >
                  <p className='w-fit'>{chapter.title}</p>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
      {/* No chapters fallback */}
      {(!loading && !error && chapters.length === 0) && (
        <span className='text-red-500'>No chapters found for this course.</span>
      )}
      <Outlet />
    </div>
  );
}

export default Main_Chapter_Chunk;