import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Chapters_Chunk() {
  // This assumes _id is the course _id. If you're trying to get chapters for a subcourse, adjust accordingly.
  const params = useParams();
  // Sometimes you may need both `_id` and maybe a chapterId; for now, only destructure `_id`.
  const { _id } = params;
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setChapters([]);
    async function fetchChapters() {
      try {
        // 1. Fetch all courses
        const response = await fetch('https://server-01-v2cx.onrender.com/getcourse');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // 2. Find the course matching this _id
        let course = null;
        if (Array.isArray(data)) {
          course = data.find(item => item._id === _id);
        } else if (data && data._id === _id) {
          course = data;
        }

        // 3. Defensive: handle not found
        if (!course) {
          setError("Course not found");
          setChapters([]);
          return;
        }

        // 4. Find chapters -- check for subCourse OR chapters array
        let allChapters = [];
        // Some APIs might have "subCourse", others "chapters"
        if (Array.isArray(course.chapters)) {
          allChapters = course.chapters;
        } else if (Array.isArray(course.subCourse)) {
          allChapters = course.subCourse;
        } else if (course.subCourse) {
          // If there's only one subCourse and it's not an array
          allChapters = [course.subCourse];
        }

        setChapters(Array.isArray(allChapters) ? allChapters : []);
      } catch (e) {
        setError(e && e.message ? e.message : "Failed to fetch data");
        setChapters([]);
      } finally {
        setLoading(false);
      }
    }
    fetchChapters();
  }, [_id]);

  if (loading) return <div className="text-white">Loading chapters...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold mb-2">Chapters</h2>
      {chapters.length === 0 ? (
        <div>No chapters found.</div>
      ) : (
        <ul className="list-disc ml-8">
          {chapters.map((chapter, idx) => (
            <li key={chapter._id || idx}>
              {chapter.title || chapter.name || `Chapter ${idx + 1}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Chapters_Chunk;