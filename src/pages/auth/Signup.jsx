import { useContext, useRef, useState } from "react";
import styles from "./auth.module.css";
import userContext from "../../userContext";
import { useNavigate } from "react-router";

function Signup(){
    const navigate = useNavigate()
    const { logIn } = useContext(userContext);
    const [error, setError] = useState(null);
    const [passwords, setPasswords] = useState({
        password : "",
        confirmPassword : ""
    });
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    function changePassword(){
        if(passwords.password !== passwords.confirmPassword){
            setError("Passwords should match")
        }
        else {
            setError(null)
        }
    }
    const submit = async (e) => {
        e.preventDefault();
        if(passwords.password !== passwords.confirmPassword) return;
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/signup`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    "username" : usernameRef.current.value,
                    "password" : passwords.password,
                    "confirmPassword" : passwords.confirmPassword,
                    "email" : emailRef.current.value
                })
            })
            const result = await res.json();
            if(res.status == 400){
                setError(result.errors[0].msg)
            }
            else if(res.status == 200){
                logIn(result.token, result.user)
                navigate("/")
            }
            else {
                throw new Error("Internal Server Error")
            }
        }
        catch(err){
            throw(err)
        }
    }
    return (
        <form className={styles.signup} onSubmit={submit}>
            <div className={styles.table}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" ref={emailRef} required/>
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" ref={usernameRef} required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => {
                         setPasswords(p => ({...p, password : e.target.value}));
                         changePassword();
                    }} required/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="comfirmPassword" onChange={e => {
                        setPasswords(p => ({...p, confirmPassword : e.target.value}));
                        changePassword();
                    }} required/>
                </div>
            </div>
            <button type="submit">Sign Up</button>
            {error && <div className={styles.error}> {error} </div>}
        </form>
    )
}

export default Signup