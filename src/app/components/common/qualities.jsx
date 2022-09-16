import React from "react";
import PropTypes from "prop-types";
import Quality from "../ui/qualities/quality";
import { useQualities } from "../../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <div>
                {qualities.map((qual) => (
                    <Quality key={qual} id={qual} />
                ))}
            </div>
        );
    } else {
        return "loading";
    }
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
