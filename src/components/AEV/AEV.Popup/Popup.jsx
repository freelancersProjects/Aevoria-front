import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

const Popup = ({
    message,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel"
}) => {
    return (
        <div className="aev-popup-overlay">
            <div className="aev-popup-v2">
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button className="confirm" onClick={onConfirm}>{confirmLabel}</button>
                    <button className="cancel" onClick={onCancel}>{cancelLabel}</button>
                </div>
            </div>
        </div>
    );
};

Popup.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
};

export default Popup;
