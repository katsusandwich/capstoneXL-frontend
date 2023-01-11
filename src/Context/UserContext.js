import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

// create context
const UserContext = React.createContext();

// provide context
function UserContextProvider({ children }) {
  const [userObject, setUserObject] = useState();
  const [userId, setUserId] = useState();

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  //EMAIL VERSION use a useEffect to check if user is authenticated, and if it is, grab the userId
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const accessToken = getAccessTokenSilently();
  //     axios
  //       .get(`${BACKEND_URL}/users/${user.email}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .then((res) => res.data)
  //       .then((res) => {
  //         console.log(res);
  //         setUserObject(res);
  //         return axios.get(`${BACKEND_URL}/users/${user.email}`, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });
  //       })
  //       .then((res) => res.data)
  //       .then((res) => {
  //         console.log(JSON.stringify(res));
  //         setUserId(res.id);
  //       });
  //   }
  // }, [isAuthenticated]);

  //USERID VERSION BELOW
  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = getAccessTokenSilently();
      axios
        .get(`${BACKEND_URL}/users/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setUserObject(res);
          return axios.get(`${BACKEND_URL}/users/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(JSON.stringify(res));
          setUserId(res.id);
        });
    }
  }, [isAuthenticated]);

  const value = {
    userObject,
    setUserObject,
    userId,
    setUserId,
  };
  // const value = { userObject, setUserObject };

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
