const JWT_TOKEN = "jwt-token";
const JWT_REFRESH_TOKEN = "jwt-refresh-token";
const JWT_EXPIRES = "jwt-expires";
const USERID_KEY = "user-local-id";

export const setTokens = ({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) => {
    const expiresData = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(JWT_TOKEN, idToken);
    localStorage.setItem(JWT_REFRESH_TOKEN, refreshToken);
    localStorage.setItem(JWT_EXPIRES, expiresData);
};
export const getAccessToken = () => {
    return localStorage.getItem(JWT_TOKEN);
};
export const getRefreshToken = () => {
    return localStorage.getItem(JWT_REFRESH_TOKEN);
};
export const getExpiresTokenDate = () => {
    return localStorage.getItem(JWT_EXPIRES);
};
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(JWT_REFRESH_TOKEN);
    localStorage.removeItem(JWT_EXPIRES);
}
export const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresTokenDate,
    getUserId,
    removeAuthData
};
