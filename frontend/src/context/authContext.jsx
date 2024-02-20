import { jwtDecode } from "jwt-decode";
import { APP_TOKEN_KEY } from "../constants";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(APP_TOKEN_KEY) || "");
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem(APP_TOKEN_KEY, serverToken);
  };

  let isLoggedIn = !!token;

  const logoutUser = () => {
    setToken("");
    setUser(null);
    return localStorage.removeItem(APP_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        logoutUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  return authContextValue;
};
