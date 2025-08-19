
import PropTypes from 'prop-types';
import './FilterPillGroup.scss';

const FilterPillGroup = ({ options, selected = [], onChange, multi = true }) => {
  const handleToggle = (value) => {
    if (multi) {
      const updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange(updated);
    } else {
      onChange(selected.includes(value) ? [] : [value]);
    }
  };

  return (
    <div className="aev-pill-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`pill ${selected.includes(opt.value) ? 'active' : ''}`}
          onClick={() => handleToggle(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

FilterPillGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  multi: PropTypes.bool,
};

export default FilterPillGroup;
