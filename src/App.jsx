import { useState } from "react"
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx"
import userContext from "./userContext.jsx";

function App(){
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const logIn = (accessToken, user) => {
        setUser(user);
        setAccessToken(accessToken);
    }
    return (
        <userContext.Provider value={{user, accessToken, logIn}}>
            <Signup/>
        </userContext.Provider>
    )
}

export default App