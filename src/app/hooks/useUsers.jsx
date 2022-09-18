import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserService } from "../services/user.service";
import { useAuth } from "./useAuth";
const UserContext = React.createContext();
export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexUser = newUsers.findIndex((u) => u._id === currentUser._id);
            newUsers[indexUser] = currentUser;
            setUsers(newUsers);
        }
    }, [currentUser]);
    const getUsers = async () => {
        try {
            const { content } = await UserService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            ErrorCatcher(error);
        }
    };
    const ErrorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "loading..."}
        </UserContext.Provider>
    );
};
export default UserProvider;

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
