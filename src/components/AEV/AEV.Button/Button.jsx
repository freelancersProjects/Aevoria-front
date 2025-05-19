import React from "react";
import PropTypes from 'prop-types';
import "./Button.scss";

const Button = ({ text="nothing", variant = "solid", size = "medium", onClick, className }) => {
    return (
        <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["solid", "outline"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
