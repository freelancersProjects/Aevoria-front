
import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({ value, onChange, placeholder = '', type = 'text', label }) => {
  return (
    <div className="aev-text-input font-montserrat">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="underline" />
    </div>
  );
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default TextInput;
