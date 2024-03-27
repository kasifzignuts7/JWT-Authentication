import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // it will check for user on every render
  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
