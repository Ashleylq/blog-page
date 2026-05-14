import { useContext, useRef, useState } from "react"
import styles from "./auth.module.css"
import userContext from "../../userContext";
import { useNavigate } from "react-router";

function Login(){
    const navigate = useNavigate();
    const [ error, setError ] = useState(null);
    const { logIn } = useContext(userContext)
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const submit = async function (e){
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/login`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    "username" : usernameRef.current.value,
                    "password" : passwordRef.current.value
                })
            })
            const result = await res.json();
            if(res.status == 401){
                setError(result.message)
            }
            else if(res.status == 200){
                logIn(result.token, result.user);
                navigate("/")
            }
            else {
                setError("Oops! looks like there has been an error on our side :(")
            }
        }
        catch(err){
            alert(err)
            throw(err);
        }
    }
    return (
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
            {error && <div className={styles.error}> {error} </div> }
        </form>
    )
}

export default Login