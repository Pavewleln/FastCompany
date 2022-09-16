import httpService from "./http.service";

const CommentsEndPoint = "comment/";

export const CommentsService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            CommentsEndPoint + payload._id,
            payload
        );
        return data;
    },
    getComment: async (pageId) => {
        const { data } = await httpService.get(CommentsEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(CommentsEndPoint + commentId);
        return data;
    }
};
