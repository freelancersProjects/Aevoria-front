import React from "react";
import PropTypes from "prop-types";
import "./StatusIndicator.scss";

const StatusIndicator = ({ status = "active", className = "" }) => {
    const normalizedStatus = status.toLowerCase();
    const statusText =
        normalizedStatus === "active"
            ? "Actif"
            : normalizedStatus === "inactive" ? "Inactif" :
            normalizedStatus === "offline" ? "Hors ligne" :
            "Inconnu";


    return (
        <span className={`status-indicator ${normalizedStatus} ${className}`}>
            {statusText}
        </span>
    );
};

StatusIndicator.propTypes = {
    status: PropTypes.string,
    className: PropTypes.string
};

export default StatusIndicator;
