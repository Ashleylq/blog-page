import { useEffect, useState } from "react";
import styles from "./Posts.module.css";

function Posts(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts(){
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts`)
            const result = await res.json();
            if(res.status == 200){
                setPosts(result);
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
                <div className={styles.post}>{post.title}</div>
            ))}
        </div>
    )
}

export default Posts;