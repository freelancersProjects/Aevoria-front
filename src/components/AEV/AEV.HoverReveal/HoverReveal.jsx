import React from 'react';
import PropTypes from 'prop-types';
import './HoverReveal.scss';

const HoverReveal = ({ image, title, revealContent }) => {
    return (
        <div className="aev-hover-reveal">
            <img src={image} alt={title} className="hover-img" />
            <div className="hover-overlay">
                <div className="hover-content">
                    {revealContent}
                </div>
            </div>
        </div>
    );
};

HoverReveal.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    revealContent: PropTypes.node.isRequired,
};

export default HoverReveal;
