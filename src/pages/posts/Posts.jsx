import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { NavLink } from "react-router";

function Posts(){
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchPosts(){
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts`)
            const result = await res.json();
            if(res.status == 200){
                setPosts(result.posts);
            }
            else {
                setError("Oops! looks like there has been an error on our side :(")
            }
        }
        fetchPosts();
    }, [])
    if(!posts){
        return <div className={styles.center}><p>Loading...</p></div>
    }
    if(error){
        return <div className={styles.center}><p>{error}</p></div>
    }
    return (
        <div className={styles.postContainer}>
            {posts.map((post) => (
                <NavLink to={`/posts/${post.id}`}><div className={styles.post}>{post.title}</div></NavLink>
            ))}
        </div>
    )
}

export default Posts;