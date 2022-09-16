import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { UserService } from "../services/user.service";
import {
    localStorageService,
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create();
const AuthContext = React.createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    async function getUserData() {
        try {
            const { content } = await UserService.getCurrentUser();
            setUser(content);
        } catch (error) {
            ErrorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);
    async function logout() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            ErrorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователя с такими данными не существует!"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        email: "Неправильный email или пароль",
                        password: "Неправильный email или пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data); // 1) Сначало получаем токен и только потом создаем юзера
            await createUser({
                // 2)
                _id: data.localId,
                email,
                password,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            ErrorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    const createUser = async (data) => {
        try {
            const { content } = await UserService.create(data);
            setUser(content);
            await console.log(UserService.create(data));
        } catch (error) {
            ErrorCatcher(error);
        }
    };
    const ErrorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    return (
        <AuthContext.Provider value={{ signUp, signIn, logout, currentUser }}>
            {!isLoading ? children : "loading"}
        </AuthContext.Provider>
    );
};
export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
