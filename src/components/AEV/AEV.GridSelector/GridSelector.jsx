import React from 'react';
import PropTypes from 'prop-types';
import './GridSelector.scss';

const GridSelector = ({ options = [], onSelect, selected, columns = 3, multi = false }) => {
    const handleClick = (value) => {
        if (multi) {
            if (selected.includes(value)) {
                onSelect(selected.filter((v) => v !== value));
            } else {
                onSelect([...selected, value]);
            }
        } else {
            onSelect(value);
        }
    };

    const isSelected = (value) => {
        return multi ? selected.includes(value) : selected === value;
    };

    return (
        <div className={`aev-grid-selector grid-cols-${columns}`}>
            {options.map((item, index) => (
                <div
                    key={index}
                    className={`grid-item ${isSelected(item.value) ? 'selected' : ''}`}
                    onClick={() => handleClick(item.value)}
                >
                    {item.icon && <div className="icon">{item.icon}</div>}
                    <div className="label">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

GridSelector.propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    columns: PropTypes.number,
    multi: PropTypes.bool,
};

export default GridSelector;
