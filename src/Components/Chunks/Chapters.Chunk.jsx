import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Fix: Use remark-gfm for markdown tables, avoid overriding table renderers
// This enables markdown table support "out of the box" and avoids breaking default behavior

function Chapters_Chunk() {
    const { courseId, chapterId } = useParams();
    const subPostId = chapterId;

    const [subPost, setSubPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                        // Try all possible subX keys, apply sorting if subPosts present
                        let subPostsArray = [];
                        if (Array.isArray(foundCourse.subPosts)) {
                            subPostsArray = foundCourse.subPosts;
                        } else if (Array.isArray(foundCourse.subposts)) {
                            subPostsArray = foundCourse.subposts;
                        } else if (Array.isArray(foundCourse.subCourse)) {
                            subPostsArray = foundCourse.subCourse;
                        }
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

        fetchSubPost();
    }, [courseId, subPostId]);

    return (
        <div className="text-white max-w-full h-full p-4 flex flex-col gap-4 overflow-y-auto poppins">
            {loading && (
                <div className="text-lg text-zinc-300">Loading chapter...</div>
            )}
            {error && (
                <div className="text-red-400 font-bold">Error: {error}</div>
            )}
            {!loading && !error && !subPost && (
                <div className="text-yellow-300">No chapter data found.</div>
            )}
            {!loading && !error && subPost && subPost.description && (
                <div className="markdown-style bg-zinc-800/80 rounded p-4 mb-4">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        // Use classNames with markdown-style in CSS to style tables globally
                        // Optionally, add more components here if you want finer control
                    >
                        {subPost.description}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default Chapters_Chunk;
