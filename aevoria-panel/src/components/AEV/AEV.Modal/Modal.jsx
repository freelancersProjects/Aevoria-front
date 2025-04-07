import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="aev-modal-overlay" onClick={onClose}>
            <div className="aev-modal-v3" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
