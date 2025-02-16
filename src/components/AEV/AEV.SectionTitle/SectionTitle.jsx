import React from "react";
import "./SectionTitle.scss";
import ChevronRight from "../../../../public/assets/svg/chevron-right.svg?react";

const SectionTitle = ({ text }) => {
    return (
        <h2 className="section-title">
            {text} <ChevronRight alt="chevron-category" className="chevron" />
        </h2>
    );
};

export default SectionTitle;
