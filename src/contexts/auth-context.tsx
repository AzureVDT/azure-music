import { User, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebaseConfig";
import AuthContextType, { IAuthValues } from "../types/authContextTypes";
import { JSX } from "react/jsx-runtime";

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider(
    props: JSX.IntrinsicAttributes & React.ProviderProps<AuthContextType | null>
) {
    const [values, setValues] = React.useState<IAuthValues>({
        name: "",
        email: "",
        password: "",
    });
    const [userInfo, setUserInfo] = React.useState<User | null>(null);
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfo(user);
        });
    }, []);
    const contextValues = {
        values,
        userInfo,
        setValues,
        setUserInfo,
    };
    return (
        <AuthContext.Provider
            {...props}
            value={contextValues}
        ></AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be used within AuthProvider");
    return context;
}
