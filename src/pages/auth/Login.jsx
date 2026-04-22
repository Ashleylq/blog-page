import { useRef } from "react"
import styles from "./auth.module.css"

function Login(){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    async function submit(e){
        e.preventDefault()
        const res = await fetch("https://blog-page-api.onrender.com/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "username" : usernameRef.current.value,
                "password" : passwordRef.current.value
            }),
            credentials : "include"
        })
        alert(JSON.stringify(await res.json()))
    }
    return (
        <>
            <form className={styles.login} onSubmit={submit}>
                <div className={styles.table}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input name="username" id="username" ref={usernameRef} required></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input name="password" id="password" type="password" ref={passwordRef} required></input>
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login