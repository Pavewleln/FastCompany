import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { QualitiesService } from "../services/qualities.service";

const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualities();
    }, []);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);
    const getQualities = async () => {
        try {
            const { content } = await QualitiesService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            ErrorCatcher(error);
        }
    };
    const ErrorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };
    const getQualitiesList = (id) => {
          return qualities.find((q) => q._id === id);
    };

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQualitiesList }}>
            { children }
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
