import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';

const Toast = ({ message, type, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [message, type, duration]);

    const toastClass = `toast toast-${type} ${visible ? 'toast-visible' : 'toast-hidden'}`;

    return <div className={toastClass}>{message}</div>
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    duration: PropTypes.number,
};

export default Toast;
