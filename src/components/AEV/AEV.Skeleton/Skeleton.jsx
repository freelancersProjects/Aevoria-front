import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.scss';

const Skeleton = ({ width, height, circle, rounded, count = 1, style = {} }) => {
    const classes = `aev-skeleton ${circle ? 'circle' : ''} ${rounded ? 'rounded' : ''}`;

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={classes}
                    style={{
                        width,
                        height,
                        ...style
                    }}
                />
            ))}
        </>
    );
};

Skeleton.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    count: PropTypes.number,
    style: PropTypes.object,
};

export default Skeleton;
