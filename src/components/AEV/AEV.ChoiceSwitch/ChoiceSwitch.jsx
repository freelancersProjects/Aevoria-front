
import PropTypes from 'prop-types';
import './ChoiceSwitch.scss';

const ChoiceSwitch = ({ options, selected, onChange, size = 'md' }) => {
  return (
    <div className={`choice-switch ${size}`}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`choice-btn ${selected === opt ? 'active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

ChoiceSwitch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChoiceSwitch;
