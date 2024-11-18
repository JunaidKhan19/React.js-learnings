import React from "react";
import Usercontext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState()
    return(
        <Usercontext.Provider value={{user, setUser}}>
        {children}
        </Usercontext.Provider>
    )
}

export default UserContextProvider;