
import PropTypes from 'prop-types';
import './NumberInput.scss';

const NumberInput = ({ value, onChange, label, placeholder }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Autorise vide, chiffre, et "." ou "-"
    if (/^-?\d*\.?\d*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="aev-number-input">
      {label && <label className="number-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="number-field"
      />
    </div>
  );
};

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default NumberInput;
