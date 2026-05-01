import { createContext } from "react";

const userContext = createContext({
    user : {},
    accessToken : null,
    logIn : () => {}
})

export default userContext