import React from "react";
import PropTypes from 'prop-types';
import "./SectionTitle.scss";
import Icon from "../AEV.Icon/Icon";

const SectionTitle = ({ text }) => {
    return (
        <h2 className="section-title">
            {text} <Icon name="chevron-right" size={20} className="chevron" />
        </h2>
    );
};

SectionTitle.propTypes = {
    text: PropTypes.string.isRequired,
};

export default SectionTitle;
