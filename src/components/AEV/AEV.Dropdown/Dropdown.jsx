import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

const Dropdown = ({ label, options, value, onSelect, size = 'md' }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setOpen(false);
    };

    return (
        <div className={`aev-dropdown aev-dropdown-${size}`}>
            <div className="dropdown-header" onClick={() => setOpen(!open)}>
                <span className="selected-value font-montserrat">
                    {value || label}
                </span>
                <span className={`chevron ${open ? 'rotate' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                        <path d="M6 8L10 12L14 8" stroke="#D7DFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>

            {open && (
                <div className="dropdown-list">
                    {options.map((opt, idx) => (
                        <div
                            key={idx}
                            className="dropdown-item font-montserrat"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Dropdown;
