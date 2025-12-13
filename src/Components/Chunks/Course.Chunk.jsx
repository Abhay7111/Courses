import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Course_Chunk() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://server-01-v2cx.onrender.com/getcourse');
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json();
                if (Array.isArray(result)) {
                    const course = result.find(item => item._id === id)
                    if (course) {
                        setData(course); // Store the course object directly
                    } else {
                        setError('Course not found');
                    }
                } else if (result && result._id === id) {
                    setData(JSON.stringify(result)); // Convert single object to string
                } else {
                    setError('Course not found');
                }
            }
            catch (error) {
                setError('Data Not found', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id])

    if (loading) return <div className='text-white'>Loading...</div>
    if (error) return <div className='text-white'>Error: {error}</div>
    if (!data) return <div className='text-white'>No data available</div>

    return (
        <div className='text-white bg-green-400 overflow-y-auto max-w-[90%] overflow-hidden'>
            <pre>
            </pre> {/* Display the course title */}
{data.title}    
{Array.isArray(data.subPost) && data.subPost.map((sub, index) => (
    <div key={index} className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>{sub.subTitle}</h2>
        <p className='text-base'>{sub.subDescription}</p>
    </div>
))}
        </div>
    )
}

export default Course_Chunk
