import React from "react";
import PropTypes from 'prop-types';
import "./SectionTitle.scss";
import Icon from "../AEV.Icon/Icon";
import { Link } from "react-router-dom";

const SectionTitle = ({ text, url }) => {
    return (
        <h2 className="section-title">
            {url ? (
                <Link to={url}>
                    {text} <Icon name="chevron-right" size={20} className="chevron" />
                </Link>
            ) : (
                <>
                    {text} <Icon name="chevron-right" size={20} className="chevron" />
                </>
            )}
        </h2>
    );
};

SectionTitle.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
};

export default SectionTitle;
