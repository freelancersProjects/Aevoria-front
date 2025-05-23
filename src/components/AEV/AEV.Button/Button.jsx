import React from "react";
import PropTypes from 'prop-types';
import "./Button.scss";

const Button = ({
    text = "nothing",
    variant = "solid",
    size = "medium",
    onClick,
    className,
    isDisabled = false,
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["solid", "outline", "transparent"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
};

export default Button;

