
import PropTypes from 'prop-types';
import './HR.scss';

const HR = ({ className = '', variant = 'default', ...props }) => {
  return <hr className={`aev-hr ${variant} ${className}`} {...props} />;
};

HR.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dashed']),
};

export default HR;
