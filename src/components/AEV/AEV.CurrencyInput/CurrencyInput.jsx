import { useState } from 'react';
import PropTypes from 'prop-types';
import './CurrencyInput.scss';
import { FaCoins } from 'react-icons/fa';

const CurrencyInput = ({ value, onChange, label, placeholder = '0.00', symbol = '€', tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (/^-?\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div
      className="aev-currency-input-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {label && <label className="currency-label">{label}</label>}

      <div className="currency-input-container">
        <FaCoins className="currency-icon" />
        <span className="currency-symbol">{symbol}</span>
        <input
          type="text"
          className="currency-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>

      {tooltip && showTooltip && (
        <div className="currency-tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
};

CurrencyInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  symbol: PropTypes.string,
  tooltip: PropTypes.string,
};

export default CurrencyInput;
