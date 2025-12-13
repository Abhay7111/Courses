import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Course_Chunk() {
    const { id } = useParams()
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
                    course = result.find(item => item._id === id);
                } else if (result && result._id === id) {
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
                setError('Data not found');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

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
        <div className='text-white bg-green-400 overflow-y-auto max-w-[90%] overflow-hidden p-4'>
            <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
            {Array.isArray(subPosts) && subPosts.length > 0 ? (
                subPosts.map((sub, index) => (
                    <div key={index} className='mb-4'>
                        {/* For different possible structures, fallback to sensible keys */}
                        <h2 className='text-xl font-bold mb-2'>
                            {sub.subTitle || sub.title || sub.name || `subposts ${index + 1}`}
                        </h2>
                        <p className='text-base'>
                            {sub.subDescription || sub.description || sub.desc || ''}
                        </p>
                    </div>
                ))
            ) : (
                <div className='text-white'>No sub-posts available.</div>
            )}
        </div>
    );
}

export default Course_Chunk
