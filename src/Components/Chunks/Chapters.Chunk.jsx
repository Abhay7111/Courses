import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Chapters_Chunk() {
    // Explicit params from the route: /Dashboard/course/:courseId/:chapterId
    const { courseId, chapterId } = useParams();
    const subPostId = chapterId;

    const [subPost, setSubPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (!subPostId) {
            setError('No chapter id specified.');
            setSubPost(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setSubPost(null);

        const fetchSubPost = async () => {
            try {
                // Try to fetch the specific subpost (chapter) by _id or id
                let res = await fetch(`https://server-01-v2cx.onrender.com/getsubpost?_id=${subPostId}`);
                if (!res.ok) {
                    res = await fetch(`https://server-01-v2cx.onrender.com/getsubpost?id=${subPostId}`);
                }
                if (res.ok) {
                    const data = await res.json();
                    if (data && (!Array.isArray(data) || data.length > 0)) {
                        setSubPost(Array.isArray(data) ? data[0] : data);
                        setLoading(false);
                        return;
                    }
                }

                // Fallback: fetch course(s) and find the chapter within subPosts/subposts/subCourse
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
                        setCourse(foundCourse);
                        // Try all possible subX keys
                        const subPostsArray = Array.isArray(foundCourse.subPosts)
                            ? foundCourse.subPosts
                            : Array.isArray(foundCourse.subposts)
                                ? foundCourse.subposts
                                : Array.isArray(foundCourse.subCourse)
                                    ? foundCourse.subCourse
                                    : [];
                        const found = subPostsArray.find(sp => sp._id === subPostId || sp.id === subPostId);
                        if (found) {
                            setSubPost(found);
                            setLoading(false);
                            return;
                        }
                    }
                }

                setError(`Not found with _id or id of "${subPostId}"`);
                setSubPost(null);
            } catch (err) {
                setError(
                    `${err && err.message ? err.message : 'Failed to fetch chapter data'} (subPostId: ${subPostId})`
                );
                setSubPost(null);
            } finally {
                setLoading(false);
            }
        };

        // Fetch the parent course for reference if needed (for .length, etc)
        const fetchCourse = async () => {
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
                    setCourse(foundCourse || null);
                }
            } catch {
                // Ignore course error here, we handle main error in fetchSubPost
            }
        };

        fetchCourse();
        fetchSubPost();
    }, [courseId, subPostId]);

    // Get the number of chapters in the course (if available)
    let chapterCount = null;
    if (course) {
        if (Array.isArray(course.subPosts)) {
            chapterCount = course.subPosts.length;
        } else if (Array.isArray(course.subposts)) {
            chapterCount = course.subposts.length;
        } else if (Array.isArray(course.subCourse)) {
            chapterCount = course.subCourse.length;
        }
    }

    return (
        <div className="text-white w-fit max-w-full h-full p-4 flex flex-col gap-4 overflow-y-auto poppins">
            {loading && (
                <div className="text-lg text-zinc-300">Loading chapter...</div>
            )}
            {error && (
                <div className="text-red-400 font-bold">Error: {error}</div>
            )}
            {!loading && !error && !subPost && (
                <div className="text-yellow-300">No chapter data found.</div>
            )}
            {!loading && !error && subPost && (
                <div>
                    <div>
                        {/* Show course name if available */}
                        <div className='w-full flex items-center gap-3 mb-4'>
                        {course && course.title && (
                            <h1 className="text-2xl font-bold text-zinc-200">{course.title} - </h1>
                        )}
                        <h2 className="text-md font-medium">{subPost.title || 'Untitled'}</h2>
                        </div>
                        {/* {chapterCount !== null && (
                            <h2 className="text-md text-zinc-400 mb-2">{chapterCount} chapter{chapterCount !== 1 ? "s" : ""} in this course</h2>
                        )} */}
                    </div>
                    {subPost.description && (
                        <div className="markdown-style bg-zinc-800/80 rounded p-4 mb-4 overflow-x-auto">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {subPost.description}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Chapters_Chunk;
