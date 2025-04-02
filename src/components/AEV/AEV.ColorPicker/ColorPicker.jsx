import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';

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
        <div className="aev-colorpicker-full" ref={pickerRef}>
            <button
                className="color-preview"
                style={{ backgroundColor: value }}
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="picker-panel">
                    <input
                        className="hex-input"
                        value={hex}
                        onChange={handleHexChange}
                        maxLength={7}
                    />
                    <input
                        type="color"
                        className="native-color"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setHex(e.target.value);
                        }}
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
