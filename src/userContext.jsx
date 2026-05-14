import { createContext } from "react";

const userContext = createContext({
    user : {},
    accessToken : null,
    logIn : () => {},
    getCredentials : () => {},
    logOut : () => {}
})

export default userContext