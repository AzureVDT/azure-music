import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useNavigate } from "react-router-dom";

const RequiredAuthPage = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    return <>{children}</>;
};

export default RequiredAuthPage;
