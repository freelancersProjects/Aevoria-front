import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./TabSwitcher.scss";

const TabSwitcher = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="tab-switcher">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab-button ${activeIndex === index ? "active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                >
                    {tab}
                </button>
            ))}
            <div
                className="active-indicator"
                style={{ left: `${(100 / tabs.length) * activeIndex}%`, width: `${100 / tabs.length}%` }}
            ></div>
        </div>
    );
};

TabSwitcher.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TabSwitcher;
