import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  //it will check for user on every render, if it is not found it will try to get from server
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data.id);
        })
        .catch((err) => {
          console.log("Context error:", err);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
