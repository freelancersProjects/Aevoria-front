import React, { useState, useEffect } from 'react';
import './ModalSearch.scss';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';

const ModalSearch = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');

    const data = {
        Suggestions: [
            {
                icon: <SportsEsportsIcon />, title: 'Cyberpunk 2077', subtitle: 'Game', type: 'game',
            },
            {
                icon: <PeopleIcon />, title: 'Mila Stone', subtitle: '@mila', type: 'friend',
            },
        ],
        Commands: [
            {
                icon: <SettingsIcon />, title: 'Open Settings', subtitle: 'Adjust preferences', type: 'command',
            },
        ],
    };

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => (document.body.style.overflow = '');
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('aev-modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="aev-modal-overlay" onClick={handleOverlayClick}>
            <div className="aev-modal-v3 fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="searchbar-wrapper">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        className="searchbar font-montserrat"
                        placeholder="Search anything..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {Object.entries(data).map(([section, items], idx) => (
                    <div className="section" key={idx}>
                        <div className="section-title">{section}</div>
                        {items
                            .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                            .map((item, i) => (
                                <div className="result-item game" key={i}>
                                    <div className="result-info">
                                        <SportsEsportsIcon className="icon" />
                                        <div className="text">
                                            <span className="title">{item.title}</span>
                                            <span className="subtitle">{item.subtitle}</span>
                                        </div>
                                    </div>
                                    <span className="badge">{item.type}</span>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModalSearch;
