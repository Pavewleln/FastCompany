import httpService from "./http.service";

const ProfessionEndPoint = "profession/";

export const ProfessionService = {
    get: async () => {
        const { data } = await httpService.get(ProfessionEndPoint);
        return data;
    }
};
