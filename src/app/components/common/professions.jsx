import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionByIds, getProfessionsLoadingStatus } from "../../store/professions";

export const Professions = ({ id }) => {
    const prof = useSelector(getProfessionByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (!isLoading) {
        return <p> {prof.name} </p>;
    } else {
        return "loading";
    }
};

Professions.propTypes = {
    id: PropTypes.string
};
