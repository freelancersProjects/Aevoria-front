import React from 'react';
import './IconGallery.scss';

// Récupère tous les SVGs en tant que composants React
const files = import.meta.glob('/src/assets/svg/*.svg?react', {
    eager: true,
    import: 'default',
});

const icons = Object.entries(files).map(([path, Component]) => {
    const name = path.split('/').pop().replace('.svg?react', '');
    return { name, Component };
});

const IconGallery = () => {
    return (
        <div className="icon-gallery">
            {icons.map(({ name, Component }) => (
                <div key={name} className="icon-item">
                    <Component className="icon-preview" />
                    <div className="icon-name">{name}</div>
                </div>
            ))}
        </div>
    );
};

export default IconGallery;
