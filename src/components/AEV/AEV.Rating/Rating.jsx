import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Rating.scss';

const Rating = ({ value, onChange, max = 5, interactive = true }) => {
    const [hover, setHover] = useState(null);

    const handleMove = (e, i) => {
        if (!interactive) return;
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const newHover = x < width / 2 ? i + 0.5 : i + 1;
        setHover(newHover);
    };

    const handleClick = (e, i) => {
        if (!interactive || !onChange) return;
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const val = x < width / 2 ? i + 0.5 : i + 1;
        onChange(val);
    };

    const display = hover ?? value;

    return (
        <div className="aev-rating">
            {Array.from({ length: max }).map((_, i) => {
                const isFull = display >= i + 1;
                const isHalf = !isFull && display >= i + 0.5;

                return (
                    <div
                        key={i}
                        className="star-wrapper"
                        onMouseMove={(e) => handleMove(e, i)}
                        onMouseLeave={() => setHover(null)}
                        onClick={(e) => handleClick(e, i)}
                    >
                        <svg viewBox="0 0 24 24" className="star">
                            {isFull ? (
                                <path fill="#ffc107" d="M12 2l2.9 6.7L22 9.3l-5 5 1.2 7.4L12 18.6 5.8 21.7 7 14.3 2 9.3l7.1-0.6L12 2z" />
                            ) : isHalf ? (
                                <>
                                    <defs>
                                        <linearGradient id={`half-${i}`}>
                                            <stop offset="50%" stopColor="#ffc107" />
                                            <stop offset="50%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        fill={`url(#half-${i})`}
                                        stroke="#ffc107"
                                        d="M12 2l2.9 6.7L22 9.3l-5 5 1.2 7.4L12 18.6 5.8 21.7 7 14.3 2 9.3l7.1-0.6L12 2z"
                                    />
                                </>
                            ) : (
                                <path
                                    fill="none"
                                    stroke="#555"
                                    strokeWidth="1.5"
                                    d="M12 2l2.9 6.7L22 9.3l-5 5 1.2 7.4L12 18.6 5.8 21.7 7 14.3 2 9.3l7.1-0.6L12 2z"
                                />
                            )}
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    max: PropTypes.number,
    interactive: PropTypes.bool,
};

export default Rating;
