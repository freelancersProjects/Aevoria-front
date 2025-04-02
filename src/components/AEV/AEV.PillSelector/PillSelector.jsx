import React from 'react';
import PropTypes from 'prop-types';
import './PillSelector.scss';

const PillSelector = ({ options = [], selected, onSelect, multi = false }) => {
    const handleClick = (val) => {
        if (multi) {
            if (selected.includes(val)) {
                onSelect(selected.filter((v) => v !== val));
            } else {
                onSelect([...selected, val]);
            }
        } else {
            onSelect(val);
        }
    };

    const isSelected = (val) =>
        multi ? selected.includes(val) : selected === val;

    return (
        <div className="aev-pill-selector">
            {options.map((opt, i) => (
                <div
                    key={i}
                    className={`pill ${isSelected(opt.value) ? 'active' : ''}`}
                    onClick={() => handleClick(opt.value)}
                >
                    {opt.label}
                </div>
            ))}
        </div>
    );
};

PillSelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    onSelect: PropTypes.func.isRequired,
    multi: PropTypes.bool,
};

export default PillSelector;
