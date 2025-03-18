import React from "react";
import PropTypes from "prop-types";
import "./HeaderSectionImage.scss";

const HeaderSectionImage = ({ title }) => {
    return (
        <div className="header-section-image">
            <div className="overlay"></div>
            <h2 className="title instrument-sans">{title}</h2>
        </div>
    );
};

HeaderSectionImage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderSectionImage;
