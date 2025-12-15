import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Chapters_Chunk() {
  const params = useParams();
  const { subPostId } = params; // Expecting route param "subPostId"
  const [subPost, setSubPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSubPost(null);

    async function fetchSubPost() {
      try {
        // Assuming a subPost endpoint exists for fetching individual subPost data
        const response = await fetch(`https://server-01-v2cx.onrender.com/getsubpost?id=${subPostId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (!data || (Array.isArray(data) && data.length === 0)) {
          setError("SubPost not found");
          setSubPost(null);
          return;
        }

        // If the backend returns an array
        if (Array.isArray(data)) {
          setSubPost(data[0]);
        } else {
          setSubPost(data);
        }
      } catch (e) {
        setError(e && e.message ? e.message : "Failed to fetch subPost data");
        setSubPost(null);
      } finally {
        setLoading(false);
      }
    }

    if (subPostId) {
      fetchSubPost();
    } else {
      setError("No subPost ID specified");
      setLoading(false);
    }
  }, [subPostId]);

  if (loading) return <div className="text-white">Loading subPost...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-2">Sub Post</h2>
      {!subPost ? (
        <div>No subPost data found.</div>
      ) : (
        <div>
          <div><strong>Title:</strong> {subPost.title || 'Untitled'}</div>
          <div><strong>ID:</strong> {subPost._id || 'Unknown ID'}</div>
          {/* Render other subPost details as needed */}
        </div>
      )}
    </div>
  );
}

export default Chapters_Chunk;
