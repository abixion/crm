import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../useLocalStorage";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user",);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        console.log(data);
        setUser(data);
        navigate('/admin', {replace: true});
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", {replace: true});
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => useContext(AuthContext);

export const useAuth = () => {
    // return useContext(AuthContext);

    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth can only be used inside AuthProvider");
    } else {
        // console.log(context);
    }
    return context;
}