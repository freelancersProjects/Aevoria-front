import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Drawer.scss';

const Drawer = ({
    isOpen,
    onClose,
    position = 'right',
    title,
    subtitle,
    children
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else if (shouldRender) {
            setClosing(true);
            const timeout = setTimeout(() => {
                setClosing(false);
                setShouldRender(false);
            }, 350); // Same as animation duration
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div className="aev-drawer-overlay" onClick={onClose}>
            <div
                className={`aev-drawer drawer-${position} ${closing ? 'closing' : 'open'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="drawer-close" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {(title || subtitle) && (
                    <div className="drawer-header">
                        {title && <h2 className="drawer-title">{title}</h2>}
                        {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
                    </div>
                )}

                <div className="drawer-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node
};

export default Drawer;
