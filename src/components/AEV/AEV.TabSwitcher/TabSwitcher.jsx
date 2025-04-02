import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TabSwitcher.scss';

const TabSwitcher = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="tab-switcher">
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {tabs[activeIndex].content}
            </div>
        </div>
    );
};

TabSwitcher.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
};

export default TabSwitcher;
