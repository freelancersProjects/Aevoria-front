import React from 'react';
import './Toast.scss'; // Assurez-vous de créer ce fichier pour le style

const Toast = ({ message, status }) => {
    return (
        <div className={`toast ${status}`}>
            {message}
        </div>
    );
};

export default Toast; 