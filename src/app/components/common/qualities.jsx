import React from "react";
import PropTypes from "prop-types";
import Quality from "../ui/qualities/quality";
import { useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../store/qualities";

const Qualities = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    if (isLoading) { return "loading"; }
    return (
        <div>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </div>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
