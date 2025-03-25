import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Accordion.scss";

const Accordion = ({ title, content, isOpen = false }) => {
    const [open, setOpen] = useState(isOpen);
    const toggle = () => setOpen(!open);

    return (
        <div className={`accordion ${open ? "open" : ""}`} onClick={toggle}>
            <div className="accordion-header">
                <span className="accordion-title font-montserrat">{title}</span>
                <span className={`accordion-icon ${open ? "rotate" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <path d="M6.5 9L12.5 15L18.5 9" stroke="#D7DFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
            <div className="accordion-content font-montserrat">
                <p>{content}</p>
            </div>
        </div>
    );
};

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
};

export default Accordion;
