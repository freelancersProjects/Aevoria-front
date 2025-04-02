import React from 'react';
import PropTypes from 'prop-types';
import './RadioGroup.scss';

const RadioGroup = ({ name, options, selected, onChange }) => {
    return (
        <div className="aev-radio-group">
            {options.map((opt, idx) => (
                <label key={idx} className={`radio-option ${selected === opt.value ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={selected === opt.value}
                        onChange={() => onChange(opt.value)}
                    />
                    <span className="custom-radio" />
                    <span className="label-text">{opt.label}</span>
                </label>
            ))}
        </div>
    );
};

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
