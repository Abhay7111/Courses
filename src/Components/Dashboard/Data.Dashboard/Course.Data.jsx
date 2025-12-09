import { useState, useEffect } from 'react'

export function useCourseData() {
     const [data, setData] = useState(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

     useEffect(() => {
          fetchCourseData()
     }, [])

     const fetchCourseData = async () => {
          try {
               const response = await fetch('https://server-01-v2cx.onrender.com/getcourse')
               if (!response.ok) throw new Error('Failed to fetch')
               const result = await response.json()
               setData(result)
          } catch (err) {
               setError(err.message)
          } finally {
               setLoading(false)
          }
     }

     return { data, loading, error }
}

function Course_Data() {
     const { data, loading, error } = useCourseData()

     if (loading) return <div>Loading...</div>
     if (error) return <div>Error: {error}</div>

     return (
          <div>
               {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </div>
     )
}

export default Course_Data