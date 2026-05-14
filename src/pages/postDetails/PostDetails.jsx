import { useNavigate, useParams } from "react-router";
import styles from "./PostDetails.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import userContext from "../../userContext";

function PostDetails(){
    const navigate = useNavigate()
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null)
    const { id } = useParams();
    const { accessToken, logOut } = useContext(userContext);
    const commentRef = useRef(null);
    useEffect(() => {
        async function fetchPost(){
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${id}`, {
                headers : {
                    "Authorization" : "Bearer " + accessToken
                }
            })
            if(res.status == 200){
                const result = await res.json();
                result.post.posted_at = new Date(result.post.posted_at).toLocaleString("en-US", {
                    day : "numeric",
                    month : "long",
                    year : "numeric",
                    hour : "numeric",
                    minute : "numeric"
                })
                setPost(result.post);
            }
            else if(res.status == 401){
                logOut();
                navigate("/login")
            }
            else if(res.status == 404){
                setError("Looks like the resource you are searching for does not exist");
            }
            else {
                setError("Oops! Looks like there has been an error on our side :(");
            }
        }
        fetchPost();
    }, [])
    async function createComment(e){
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${id}/comments`, {
            method : "POST",
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                text : commentRef.current.value
            })
        })
        const result = await res.json();
        if(res.ok){
            const copy = {...post};
            post.comments.push(result.comment);
            setPost(copy);
            commentRef.current.value = "";
        }
        else {
            setError("Oops! looks like there has been an error on our side :(")
        }
    }
    if(!post){
        return <div className={styles.center}><p>Loading...</p></div>
    }
    if(error){
        return <div className={styles.center}><p>{error}</p></div>
    }
    return (
        <>
        <div className={styles.container}>
            <h1>{post.title}</h1>
            <p className={styles.user}>{post.user.username}</p>
            <p className={styles.date}>{post.posted_at}</p>
            <p className={styles.text}>{post.text}</p>
        </div>
        <div>
            <form className={styles.comment} onSubmit={createComment}>
                <input ref={commentRef} id="text" name="text" required/>
                <button className={styles.button} type="submit">Comment</button>
            </form>
            {post.comments.map((comment) => (
                <Comment comment={comment} setPost={setPost} post={post} setError={setError}/>
            ))}
        </div>
        </>
    )
}

function Comment({comment, setPost, post, setError}){
    // possible functions : view edit
    const {accessToken} = useContext(userContext);
    const [func, setFunc] = useState("view");
    async function deleteComment(){
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${post.id}/comments/${comment.id}`, {
            method : "DELETE",
            headers : {
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        const result = await res.json();
        if(result.success){
            const copy = {...post};
            const newComments = copy.comments.filter(val => val.id !== comment.id);
            copy.comments = newComments;
            setPost(copy);
        }
        else {
            setError("Oops! looks like there has been an error on our side")
        }
    }
    async function editComment(e, text){
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${post.id}/comments/${comment.id}`, {
            method : "PUT",
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                text : text
            })
        })
        if(res.ok){
            const copy = {...post};
            copy.comments.map((val) => {
                if(val.id == comment.id){
                    val.text = text;
                }
            })
            setPost(copy)
            setFunc("view")
        }
        else {
            setError("Oops! looks like there has been an error on our side :(")
        }
    }
    return (
        <>
        {func === "view" ? <ViewComment comment={comment} deleteComment={deleteComment} setFunc={setFunc}/> : <EditComment editComment={editComment} setFunc={setFunc} comment={comment}/>}
        </>
    )
}

function ViewComment({comment, setFunc, deleteComment}){
    const {user} = useContext(userContext);
    return (
        <div className={styles.comment}>
            <p className={styles.user}>{comment.user.username}</p>
            <p className={styles.text}>{comment.text}</p>
            <p className={styles.date}>{new Date(comment.commented_at).toLocaleString()}</p>
            {user.id === comment.user.id && <>
            <button className={styles.button} onClick={deleteComment}>Delete</button>
            <button className={styles.button} onClick={() => setFunc("edit")}>Edit</button>
            </>}
        </div>
    )
}

function EditComment({comment, setFunc, editComment}){
    const commentRef = useRef(null);
    return (
        <form className={styles.comment} onSubmit={async(e) => await editComment(e, commentRef.current.value)}>
            <input defaultValue={comment.text} name="text" id="text" ref={commentRef} required/>
            <button type="submit" className={styles.button}>Edit</button>
            <button type="button" onClick={() => setFunc("view")} className={styles.button}>Back</button>
        </form>
    )
}

export default PostDetails;