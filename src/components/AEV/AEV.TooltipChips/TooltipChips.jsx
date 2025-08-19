import { useState } from 'react';
import PropTypes from 'prop-types';
import './TooltipChips.scss';

const TooltipChips = ({ label, tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasTooltip = tooltipText && tooltipText.trim().length > 0;

  return (
    <div
      className="tooltip-chip"
      onMouseEnter={() => hasTooltip && setIsHovered(true)}
      onMouseLeave={() => hasTooltip && setIsHovered(false)}
    >
      <span className="chip-label">{label}</span>
      {hasTooltip && (
        <div className={`tooltip ${isHovered ? 'visible' : ''}`}>
          {tooltipText}
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

TooltipChips.propTypes = {
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

export default TooltipChips;
