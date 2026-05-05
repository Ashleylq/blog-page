import { useEffect, useState } from "react"
import { Outlet } from "react-router";
import userContext from "./userContext.jsx";
import Navbar from "./pages/navbar/Navbar.jsx";

function App(){
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const logIn = (accessToken, user) => {
        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const getCredentials = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            return;
        }
        const accessToken = localStorage.getItem("accessToken")
        setUser(user);
        setAccessToken(accessToken);
    }
    useEffect(() => {
        async function runAsync(){
            await getCredentials();
        }
        runAsync()
    }, [])
    return (
        <userContext.Provider value={{user, accessToken, logIn, getCredentials}}>
            <Navbar/>
            <Outlet/>
        </userContext.Provider>
    )
}

export default App