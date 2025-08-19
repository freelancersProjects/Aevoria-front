import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';

const Toast = ({ message, type, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [message, type, duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const toastClass = `toast toast-${type} ${visible ? 'toast-visible' : 'toast-hidden'}`;

  return (
    <div className={toastClass}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={handleClose}>
                ×
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Toast;
