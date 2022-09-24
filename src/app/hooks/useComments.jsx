import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { CommentsService } from "../services/comment.service";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();
export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (error !== null) {
            setError(null);
            setIsLoading(false);
        }
    }, [error]);
    useEffect(() => {
        getComments();
    }, [userId]);

    async function removeComment(id) {
        try {
            const { content } = await CommentsService.removeComment(id);
            if (content === null) {
                setComments((prevState) => prevState.filter((c) => c._id !== id));
            }
        } catch (error) {
            ErrorCatcher(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await CommentsService.getComment(userId);
            setComments(content);
        } catch (error) {
            ErrorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUserId,
            created_at: Date.now()
        };
        try {
            const { content } = await CommentsService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            ErrorCatcher(error);
        }
    }
    const ErrorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };
    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
