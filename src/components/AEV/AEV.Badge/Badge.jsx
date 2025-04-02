import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({ count, max = 99, showDot = false, glow = true, children }) => {
    const display = count > max ? `${max}+` : count;

    return (
        <div className="aev-badge-wrapper">
            {children}
            {(count > 0 || showDot) && (
                <span className={`aev-badge ${glow ? 'glow' : ''} ${showDot ? 'dot' : ''}`}>
                    {!showDot && display}
                </span>
            )}
        </div>
    );
};

Badge.propTypes = {
    count: PropTypes.number,
    max: PropTypes.number,
    showDot: PropTypes.bool,
    glow: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default Badge;
