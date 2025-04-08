import React, { useState } from "react";
import PropTypes from "prop-types";

import ArrowDown from "../../../../public/assets/svg/arrow-down.svg";
import ArrowDown from "../../../assets/svg/arrow-down.svg";


import "./Accordion.scss";

const Accordion = ({ title, content, isOpen = false }) => {
    const [open, setOpen] = useState(isOpen);
    const toggle = () => setOpen(!open);

    return (
        <div className={`accordion ${open ? "open" : ""}`} onClick={toggle}>
            <div className="accordion-header">
                <span className="accordion-title font-montserrat">{title}</span>
                <span className={`accordion-icon ${open ? "rotate" : ""}`}>
                    <img src={ArrowDown} alt="Arrow Down" />
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
