import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { NavLink } from "react-router";

function Posts(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts(){
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts`)
            const result = await res.json();
            if(res.status == 200){
                setPosts(result.posts);
            }
            else {
                throw new Error("Internal Server Error")
            }
        }
        fetchPosts();
    }, [])
    return (
        <div className={styles.postContainer}>
            {posts.map((post) => (
                <NavLink to={`/posts/${post.id}`}><div className={styles.post}>{post.title}</div></NavLink>
            ))}
        </div>
    )
}

export default Posts;