import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const storeTokenInLS = (access_token) =>{
        localStorage.setItem("token", access_token);
    };

    return (
        <AuthContext.Provider value={{storeTokenInLS}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error('useAuth used outside of the Provider');

        
    }
    return authContextValue
};