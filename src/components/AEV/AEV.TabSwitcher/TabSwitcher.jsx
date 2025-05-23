import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TabSwitcher.scss';

const TabSwitcher = ({ tabs, onTabChange, alignLeft = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [underlineStyle, setUnderlineStyle] = useState({});
    const buttonsRef = useRef([]);

    useEffect(() => {
        const currentBtn = buttonsRef.current[activeIndex];
        if (currentBtn) {
            const offsetLeft = currentBtn.offsetLeft;
            const width = currentBtn.offsetWidth;

            setUnderlineStyle({
                transform: `translateX(${offsetLeft}px)`,
                width: `${width}px`,
            });
        }
    }, [activeIndex]);


    return (
        <div className={`tab-switcher ${alignLeft ? 'left-align' : ''}`}>
<div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        ref={(el) => (buttonsRef.current[index] = el)}
                        className={`tab-button ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => {
                            setActiveIndex(index);
                            onTabChange?.(tab.key || index);
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
                <div className="tab-underline" style={underlineStyle} />
            </div>

            <div key={activeIndex} className="tab-content fade-transition">
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
    onTabChange: PropTypes.func,
    alignLeft: PropTypes.bool,
};

export default TabSwitcher;
