import React from "react";
import "./Button.scss";

const Button = ({ text, variant = "solid", size = "medium", onClick }) => {
    return (
        <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
