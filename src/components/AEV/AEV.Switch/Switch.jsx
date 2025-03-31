import React from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({ checked, onChange, label }) => {
    return (
        <label className="aev-switch-wrapper font-montserrat">
            {label && <span className="switch-label">{label}</span>}
            <div className={`aev-switch ${checked ? 'checked' : ''}`} onClick={() => onChange(!checked)}>
                <div className="switch-handle" />
            </div>
        </label>
    );
};

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default Switch;
