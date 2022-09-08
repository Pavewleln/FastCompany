import React from "react";
import PropTypes from "prop-types";
import Quality from "../ui/qualities/quality";
import { useQualities } from "../../hooks/useQualities";

const Qualities = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return <p>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </p>;
    } else {
        return "loading";
    }
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;
