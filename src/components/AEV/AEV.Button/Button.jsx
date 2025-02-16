import React from "react";
import PropTypes from 'prop-types';
import "./Button.scss";

const Button = ({ text, variant = "solid", size = "medium", onClick }) => {
    return (
        <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["solid", "outline"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    onClick: PropTypes.func,
};

export default Button;
