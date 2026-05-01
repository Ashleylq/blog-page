import { useState } from "react"
import { Outlet } from "react-router";
import userContext from "./userContext.jsx";
import Navbar from "./pages/navbar/Navbar.jsx";

function App(){
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const logIn = (accessToken, user) => {
        setUser(user);
        setAccessToken(accessToken);
    }
    return (
        <userContext.Provider value={{user, accessToken, logIn}}>
            <Navbar/>
            <Outlet/>
        </userContext.Provider>
    )
}

export default App