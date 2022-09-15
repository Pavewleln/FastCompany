import axios from "axios";
import configFile from "../config.json";
import { localStorageService } from "./localStorage.service";
import { httpAuth } from "../hooks/useAuth";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containerSlice = /\/$/gi.test(config.url);
            config.url =
                (containerSlice ? config.url.slice(0, -1) : config.url) +
                ".json";
            const expiresData = localStorageService.getExpiresTokenDate();
            const refreshToken = localStorageService.getRefreshToken();
            const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`;
            if (expiresData && refreshToken < Date.now) {
                const { data } = await httpAuth.post(url, {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function TransformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: TransformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
