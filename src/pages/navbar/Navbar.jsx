import { NavLink } from "react-router";
import styles from "./Navbar.module.css"
import { useContext } from "react";
import userContext from "../../userContext.jsx"

function Navbar(){
    const {accessToken} = useContext(userContext);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>StairsAndAura</h1>
            <nav className={styles.nav}>
                <NavLink className={styles.link} to="/posts">Posts</NavLink>
                <NavLink className={styles.link} to="/about">About Me</NavLink>
                {!accessToken && <>
                    <NavLink className={[styles.link, styles.bLink].join(' ')} to="/signup">Signup</NavLink>
                    <NavLink className={[styles.link, styles.bLink].join(' ')} to="/login">Login</NavLink>
                </>}
            </nav>
        </div>
    )
}

export default Navbar;