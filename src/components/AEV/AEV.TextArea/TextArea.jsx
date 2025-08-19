
import PropTypes from 'prop-types';
import './TextArea.scss';

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 300,
  rows = 4,
  isResizable = true,
}) => {
  return (
    <div className="aev-textarea-wrapper">
      {label && <label className="aev-label">{label}</label>}
      <textarea
        className={`aev-textarea ${isResizable ? '' : 'no-resize'}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={rows}
        style={{ resize: isResizable ? 'both' : 'none' }}
      />
      <div className="char-counter">
        {value.length} / {maxLength}
      </div>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  isResizable: PropTypes.bool,
};

export default TextArea;
