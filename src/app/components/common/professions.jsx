import React from "react";
import { useProfession } from "../../hooks/useProfessions";
import PropTypes from "prop-types";

export const Professions = ({ id }) => {
    const { isLoading, getProfessionList } = useProfession();
    const prof = getProfessionList(id);
    if (!isLoading) {
        return (<p> { prof.name } </p>);
    } else {
        return "loading";
    }
};

Professions.propTypes = {
    id: PropTypes.string
};
