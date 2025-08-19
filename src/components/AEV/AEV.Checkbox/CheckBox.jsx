
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label className={`aev-checkbox font-montserrat ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="custom-box" />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
