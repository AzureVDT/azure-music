import { User, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebaseConfig";
import { setUser } from "../store/actions/userSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const handleLoginWithGoogle = async (
    navigate: (link: string) => void,
    dispatch: Dispatch<{
        type: "user/setUser";
        payload: User;
    }>
) => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const token = await result.user.getIdToken();
        localStorage.setItem("token", token);
        dispatch(setUser(result.user));
        navigate("/");
    } catch (error) {
        console.error(error);
    }
};
