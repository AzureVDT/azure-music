import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const RequiredAuthPage = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { userInfo } = useAuth() || {};

    useEffect(() => {
        if (!userInfo || !userInfo.email) {
            navigate("/login");
        }
    }, [navigate, userInfo]);

    return <>{children}</>;
};

export default RequiredAuthPage;
