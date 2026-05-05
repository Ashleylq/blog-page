import { createContext } from "react";

const userContext = createContext({
    user : {},
    accessToken : null,
    logIn : () => {},
    getCredentials : () => {}
})

export default userContext