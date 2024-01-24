import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebaseConfig";

export const handleLoginWithGoogle = async (
    navigate: (link: string) => void
) => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const token = await result.user.getIdToken();
        localStorage.setItem("token", token);
        navigate("/");
    } catch (error) {
        console.error(error);
    }
};
