import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getUsersByIds } from "../../../store/users";
const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const user = useSelector(getUsersByIds(userId));
    // const currentUserId = useSelector(getCurrentUserId());
    const currentUser = useSelector(getCurrentUserData());
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Link to={`/users/${currentUser._id}`}>
                            <img
                                src={currentUser.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                        </Link>
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    {userId.name}
                                    <p className="mb-1 ">
                                        {user && user.name}{" "}
                                        <span className="small">
                                            - {displayDate(created)}
                                        </span>
                                    </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.object,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
