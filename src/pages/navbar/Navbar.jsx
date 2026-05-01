import { NavLink } from "react-router";

function Navbar(){
    return (
        <nav>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default Navbar;