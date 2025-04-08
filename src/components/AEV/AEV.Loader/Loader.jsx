import React from "react";
import PropTypes from "prop-types";
import "./Loader.scss";
import Logo from "../../../assets/images/Logo.png";

const Loader = ({ variant = "default", size = "medium" }) => {
    return (
        <div className={`loader-container ${size}`}>
            {variant === "logo" ? (
                <img src={Logo} alt="Aevoria Logo" className="loader-logo" />
            ) : (
                <div className="spinner"></div>
            )}
        </div>
    );
};

Loader.propTypes = {
    variant: PropTypes.oneOf(["default", "logo"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Loader;
