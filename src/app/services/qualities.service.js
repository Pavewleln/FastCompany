import httpService from "./http.service";

const QualitiesEndPoint = "quality/";

export const QualitiesService = {
    fetchAll: async () => {
        const { data } = await httpService.get(QualitiesEndPoint);
        return data;
    }
};
