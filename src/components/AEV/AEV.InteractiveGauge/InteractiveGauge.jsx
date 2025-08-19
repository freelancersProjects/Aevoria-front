
import PropTypes from 'prop-types';
import './InteractiveGauge.scss';

const InteractiveGauge = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
  showValueAbove = true,
  valuePosition = 'above', // or 'inline'
}) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="aev-gauge-wrapper">
      {valuePosition === 'above' && (
        <div className="gauge-value">
          {value}{unit}
        </div>
      )}
      <div className="gauge-track-container">
        <input
          type="range"
          className="aev-gauge-range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
        {showValueAbove && valuePosition === 'inline' && (
          <div className="gauge-inline-value">{value}{unit}</div>
        )}
      </div>
    </div>
  );
};

InteractiveGauge.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  unit: PropTypes.string,
  showValueAbove: PropTypes.bool,
  valuePosition: PropTypes.oneOf(['above', 'inline']),
};

export default InteractiveGauge;
