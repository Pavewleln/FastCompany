import httpService from "./http.service";

const userEndPoint = "user/";

export const UserService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    }
};
