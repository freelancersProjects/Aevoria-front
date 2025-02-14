import React from 'react';
import './Loader.scss'; // Assurez-vous de créer ce fichier pour le style

const Loader = () => {
    return (
        <div className="loader">
            {/* Vous pouvez utiliser un spinner ou un autre indicateur de chargement ici */}
            <span>Loading...</span>
        </div>
    );
};

export default Loader; 