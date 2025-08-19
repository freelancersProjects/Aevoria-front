
import PropTypes from 'prop-types';
import './QuantitySelector.scss';

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="aev-quantity-selector">
      <button onClick={decrement} disabled={value <= min}>–</button>
      <div className="value">{value}</div>
      <button onClick={increment} disabled={value >= max}>+</button>
    </div>
  );
};

QuantitySelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default QuantitySelector;
