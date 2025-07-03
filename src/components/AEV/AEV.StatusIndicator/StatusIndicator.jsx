import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./StatusIndicator.scss";

const StatusIndicator = ({
    status = "Active",
    className = "",
    onStatusChange = null,
    isEditable = false
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const normalizedStatus = status;
    const statusText =
        normalizedStatus === "Active"
            ? "Actif"
            : normalizedStatus === "Inactive" ? "Inactif" :
            normalizedStatus === "Offline" ? "Hors ligne" :
            "Inconnu";

    const statusOptions = [
        { value: "Active", label: "Actif" },
        { value: "Inactive", label: "Inactif" }
    ];

    const handleStatusClick = () => {
        if (isEditable) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleStatusSelect = (newStatus) => {
        if (onStatusChange) {
            onStatusChange(newStatus);
        }
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isEditable) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isEditable]);

    return (
        <div className={`status-indicator-container ${className}`} ref={dropdownRef}>
            <span
                className={`status-indicator ${normalizedStatus.toLowerCase()} ${isEditable ? 'editable' : ''}`}
                onClick={handleStatusClick}
            >
                {statusText}
            </span>

            {isEditable && isDropdownOpen && (
                <div className="status-dropdown">
                    {statusOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`status-option ${option.value === normalizedStatus ? 'selected' : ''}`}
                            onClick={() => handleStatusSelect(option.value)}
                        >
                            <span className={`status-dot ${option.value.toLowerCase()}`}></span>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

StatusIndicator.propTypes = {
    status: PropTypes.string,
    className: PropTypes.string,
    onStatusChange: PropTypes.func,
    isEditable: PropTypes.bool
};

export default StatusIndicator;
