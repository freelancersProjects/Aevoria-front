import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';
import { FaEyeDropper } from 'react-icons/fa';

const presetColors = [
    '#007BFF', '#6610f2', '#20c997', '#e83e8c',
    '#fd7e14', '#6f42c1', '#00d1ff', '#ff006e',
    '#39ff14', '#ffcc00', '#ffffff', '#000000'
];

const ColorPicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [hex, setHex] = useState(value);
    const pickerRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleHexChange = (e) => {
        const val = e.target.value;
        setHex(val);
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            onChange(val);
        }
    };

    return (
        <div className="aev-colorpicker" ref={pickerRef}>
            <button className="color-preview" onClick={() => setOpen(!open)}>
                <span className="color-circle" style={{ backgroundColor: value }} />
                <FaEyeDropper />
            </button>

            {open && (
                <div className="color-dropdown">
                    <div className="color-grid">
                        {presetColors.map((c, idx) => (
                            <div
                                key={idx}
                                className={`color-swatch ${value === c ? 'selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => {
                                    onChange(c);
                                    setHex(c);
                                }}
                            />
                        ))}
                    </div>
                    <input
                        className="color-hex-input"
                        type="text"
                        value={hex}
                        onChange={handleHexChange}
                        maxLength={7}
                        placeholder="#HEX"
                    />
                </div>
            )}
        </div>
    );
};

ColorPicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
