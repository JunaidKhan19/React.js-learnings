import React, {useContext} from "react";
import Usercontext from "../context/UserContext.js";

function Profile() {
  
    const {user} = useContext(Usercontext)

  if (!user) return <div>Please login</div> 
  return <div>Welcome {user.username}</div>
}

export default Profile