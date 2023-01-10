import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

// create context
const UserContext = React.createContext();

// provide context
function UserContextProvider({ children }) {
  const [userObject, setUserObject] = useState();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const value = { userObject, setUserObject };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
// use context
function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}

export { UserContextProvider, useUserContext };
