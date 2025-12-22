import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId]);

    if (loading) return <div className='text-white'>Loading...</div>;
    if (error) return <div className='text-white'>Error: {error}</div>;
    if (!data) return <div className='text-white'>No data available</div>;

    return (
        <div className='text-white h-full overflow-y-auto w-full overflow-hidden p-4 poppins'>
            <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
            <div>
                <div className="markdown-style bg-zinc-800/80 rounded p-4 mb-4 overflow-x-auto">
                    <ReactMarkdown>
                        {data.description}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default Course_Chunk
