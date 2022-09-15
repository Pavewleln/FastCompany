import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
const Quality = ({ id }) => {
    const { getQualitiesList } = useQualities();
    const quality = getQualitiesList(id);
    return (
        <span key={quality.id} className={"badge m-1 bg-" + quality.color}>
            {quality.name}
        </span>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
