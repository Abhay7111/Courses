import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Chapters_Chunk() {
  const params = useParams();
  const { _id } = params;
  const [subPosts, setSubPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSubPosts([]);
    async function fetchSubPosts() {
      try {
        const response = await fetch('https://server-01-v2cx.onrender.com/getcourse');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        let course = null;
        if (Array.isArray(data)) {
          course = data.find(item => item._id === _id);
        } else if (data && data._id === _id) {
          course = data;
        }

        if (!course) {
          setError("Course not found");
          setSubPosts([]);
          return;
        }

        // Fetch subPosts instead of chapters
        const allSubPosts = Array.isArray(course.subPosts) ? course.subPosts : [];
        setSubPosts(allSubPosts);
      } catch (e) {
        setError(e && e.message ? e.message : "Failed to fetch data");
        setSubPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSubPosts();
  }, [_id]);

  if (loading) return <div className="text-white">Loading subPosts...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-2">Sub Posts</h2>
      {subPosts.length === 0 ? (
        <div>No subPosts found.</div>
      ) : (
        <ul className="list-disc ml-8">
          {subPosts.map((post, idx) => (
            <li key={post._id || idx}>
              {post.title || `SubPost ${idx + 1}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Chapters_Chunk;
