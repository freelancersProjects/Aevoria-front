import React from "react";
import PropTypes from 'prop-types';
import "./SectionTitle.scss";
import ChevronRight from "../../../../public/assets/svg/chevron-right.svg?react";

const SectionTitle = ({ text }) => {
    return (
        <h2 className="section-title">
            {text} <ChevronRight alt="chevron-category" className="chevron" />
        </h2>
    );
};

SectionTitle.propTypes = {
    text: PropTypes.string.isRequired,
};

export default SectionTitle;
