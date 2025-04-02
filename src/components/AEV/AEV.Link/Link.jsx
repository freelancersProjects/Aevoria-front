import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Link.scss';

const Link = ({ href, label, info, target = '_blank', rel = 'noopener noreferrer', hoverInfo = true }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const url = new URL(href, window.location.origin);

    return (
        <div
            className="aev-link-wrapper"
            onMouseEnter={() => hoverInfo && setShowTooltip(true)}
            onMouseLeave={() => hoverInfo && setShowTooltip(false)}
        >
            <a href={href} target={target} rel={rel} className="aev-link">
                {label}
            </a>

            {hoverInfo && showTooltip && (
                <div className="aev-link-tooltip">
                    <div className="url">{url.hostname}</div>
                    <div className="full">{href}</div>
                    {info && <div className="custom">{info}</div>}
                </div>
            )}
        </div>
    );
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    info: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    hoverInfo: PropTypes.bool, // new prop
};

export default Link;
