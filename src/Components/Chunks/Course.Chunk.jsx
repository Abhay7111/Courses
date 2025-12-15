import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

function Course_Chunk() {
    const { courseId } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://server-01-v2cx.onrender.com/getcourse');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                let course = null;
                if (Array.isArray(result)) {
                    course = result.find(item => item._id === courseId);
                } else if (result && result._id === courseId) {
                    course = result;
                }
                if (course) {
                    setData(course);
                } else {
                    setData(null);
                    setError('Course not found');
                }
            } catch (error) {
                setData(null);
                setError('Data not found', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId]);

    if (loading) return <div className='text-white'>Loading...</div>;
    if (error) return <div className='text-white'>Error: {error}</div>;
    if (!data) return <div className='text-white'>No data available</div>;

    // Try to support possible variations of subPosts field (e.g., subPosts, subposts, or subCourse)
    let subPosts = [];
    if (Array.isArray(data.subPosts)) {
        subPosts = data.subPosts;
    } else if (Array.isArray(data.subposts)) { // In case API returns in lowercase
        subPosts = data.subposts;
    } else if (Array.isArray(data.subCourse)) { // In case the property is subCourse (as seen in other code)
        subPosts = data.subCourse;
    }

    return (
        <div className='text-white h-full overflow-y-auto w-full overflow-hidden p-4 poppins'>
            <div className='w-full h-10 rounded-md overflow-x-auto flex items-start justify-start p-2'>
                <div className='w-fit h-full flex items-center justify-start gap-0'>
                    {subPosts.length > 0 ? subPosts.map((subPost, index) => (
                <NavLink key={index} to={`${subPost._id}`} className={`text-sm flex-nowrap text-nowrap poppins bg-transparent hover:bg-zinc-700/50 border border-transparent hover:border-zinc-200/30 py-1 px-3 hover:text-zinc-100 rounded-lg`}>{subPost.title}</NavLink>
            )) : <span className='text-red-500'>No chapters available</span>}
                </div>
            </div>
            <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
            <div>
            <div className="markdown-style bg-zinc-800/80 rounded p-4 mb-4 overflow-x-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.description}
                </ReactMarkdown>
            </div>
            </div>
        </div>
    );
}

export default Course_Chunk
