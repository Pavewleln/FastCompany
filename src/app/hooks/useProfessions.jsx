import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProfessionService } from "../services/profession.service";

const ProfessionContext = React.createContext();
export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfession();
    }, []);
    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
    }, [error]);
    const getProfession = async () => {
        try {
            const { content } = await ProfessionService.get();
            setProfessions(content);
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
    const getProfessionList = (id) => {
          return professions.find((p) => p._id === id);
    };

    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfessionList }}>
            { children }
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
