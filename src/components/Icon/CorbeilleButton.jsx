import React from 'react';

const CorbeilleButton = ({ onClick, className = '' }) => (
    <button
        className={`delete-btn${className ? ' ' + className : ''}`}
        onClick={onClick}
        aria-label="Supprimer"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="trash-icon"
            width="24"
            height="24"
            viewBox="0 0 21 23"
            fill="none"
        >
            <path
                d="M1.44141 5.51868H3.44141M3.44141 5.51868H19.4414M3.44141 5.51868V19.5187C3.44141 20.0491 3.65212 20.5578 4.02719 20.9329C4.40227 21.308 4.91097 21.5187 5.44141 21.5187H15.4414C15.9718 21.5187 16.4805 21.308 16.8556 20.9329C17.2307 20.5578 17.4414 20.0491 17.4414 19.5187V5.51868M6.44141 5.51868V3.51868C6.44141 2.98824 6.65212 2.47954 7.02719 2.10446C7.40227 1.72939 7.91097 1.51868 8.44141 1.51868H12.4414C12.9718 1.51868 13.4805 1.72939 13.8556 2.10446C14.2307 2.47954 14.4414 2.98824 14.4414 3.51868V5.51868M8.44141 10.5187V16.5187M12.44141 10.5187V16.5187"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </button>
);

export default CorbeilleButton;
