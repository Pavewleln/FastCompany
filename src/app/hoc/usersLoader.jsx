import { useDispatch, useSelector } from "react-redux";
import { getDataLoadingStatus, loadUsersList } from "../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);
    if (!dataStatus) return "loading";
    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
