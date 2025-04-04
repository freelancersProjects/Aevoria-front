import React from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';

const icons = import.meta.glob('/src/assets/svg/*.svg', { eager: true, import: 'default' });

const Icon = ({ name, size = 22, className = '' }) => {
    const key = `/src/assets/svg/${name}.svg`;
    const ImportedIcon = icons[key];

    if (!ImportedIcon) {
        console.warn(`Icon "${name}" not found.`);
        return null;
    }

    if (typeof ImportedIcon === 'string') {
        return (
            <img
                src={ImportedIcon}
                alt={name}
                width={size}
                height={size}
                className={`aev-icon ${className}`}
            />
        );
    }

    // Sinon, c’est un composant React
return <ImportedIcon className={`aev-icon ${className}`} width={size} height={size} />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default Icon;
