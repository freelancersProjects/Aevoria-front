import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './CodeInput.scss';

const CodeInput = ({ length = 4, onComplete }) => {
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }

        if (index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        const code = inputs.current.map(input => input?.value).join('');
        if (code.length === length && !code.includes('')) {
            onComplete(code);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="aev-codeinput">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={el => (inputs.current[i] = el)}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                />
            ))}
        </div>
    );
};

CodeInput.propTypes = {
    length: PropTypes.number,
    onComplete: PropTypes.func.isRequired,
};

export default CodeInput;
