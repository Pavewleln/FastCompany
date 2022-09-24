import { createAction, createSlice } from "@reduxjs/toolkit";
import { CommentsService } from "../services/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentSuccess: (state, action) => {
            state.entities.push(action.payload);
        },
        removeCommentSuccess: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducers, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, createCommentSuccess, removeCommentSuccess } = actions;

const createCommentsRequested = createAction("users/createCommentsRequested");
const removeCommentsRequested = createAction("users/removeCommentsRequested");
const createCommentsFailed = createAction("users/createCommentsFailed");
const removeCommentsFailed = createAction("users/removeCommentsFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await CommentsService.getComment(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export const createComment = (payload) => async (dispatch, getState) => {
    const comment = {
        ...payload,
        _id: nanoid(),
        userId: getCurrentUserId()(getState()),
        created_at: Date.now()
    };
    try {
        dispatch(createCommentsRequested());
        const { content } = await CommentsService.createComment(comment);
        dispatch(createCommentSuccess(content));
    } catch (error) {
        dispatch(createCommentsFailed(error.message));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentsRequested());
    try {
        const { content } = await CommentsService.removeComment(commentId);
        if (content === null) {
            dispatch(removeCommentSuccess(commentId));
        }
    } catch (error) {
        dispatch(removeCommentsFailed(error.message));
    }
};

export default commentsReducers;
