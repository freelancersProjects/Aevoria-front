
import './BlueCircle.scss';
import PropTypes from 'prop-types';

const BlueCircle = ({ className = '', top, left , right , bottom, color = 'rgba(13, 110, 253, 0.6)', blur = 160, size = 500 }) => {
  return <div className={`blue-circle ${className}`} style={{ top, left, right, bottom, background: color, filter: `blur(${blur}px)`, width: size, height: size }} />;
};

BlueCircle.propTypes = {
  className: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  color: PropTypes.string,
  blur: PropTypes.number,
  size: PropTypes.number,
};

export default BlueCircle;
