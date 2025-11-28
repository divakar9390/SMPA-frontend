
import { createContext, useContext, useEffect, useState } from "react";
 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); 
  };

  const getTokenFromLS = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getTokenFromLS());
  const [user,setUser]=useState("")

  let isLoggedIn = Boolean(token);

  const removeTokenFromLS = () => {
    
    localStorage.removeItem("token");
    setToken(""); 
  };

  const logoutUser = () => {
    removeTokenFromLS();
  };




  return (
    <AuthContext.Provider value={{ storeTokenInLS, getTokenFromLS, removeTokenFromLS, logoutUser, isLoggedIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};