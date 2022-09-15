import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
export const Logout = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    }, []);
    return (
        <h3>
            loading...
        </h3>
    );
};
