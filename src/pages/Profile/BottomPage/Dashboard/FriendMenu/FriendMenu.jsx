// components/FriendMenu.jsx (ou autre nom)
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import apiService from '../../../../../services/apiService';
import './FriendMenu.scss';

const FriendMenu = ({ userId, friendId, onUnfriend, onViewWishlist }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [newName, setNewName] = useState('');

    const handleAliasChange = async () => {
        try {
            await apiService.post(`/friend-aliases`, null, {
                params: { userId, friendId, customName: newName }
            });
            setRenaming(false);
            setMenuOpen(false);
        } catch (err) {
            console.error('Erreur alias :', err);
        }
    };

    return (
        <div className="friend-menu">
            <button className="menuBtn" onClick={() => setMenuOpen(prev => !prev)}>
                <MoreHorizIcon />
            </button>

            {menuOpen && (
                <div className="dropdown">
                    <button onClick={() => { setMenuOpen(false); onUnfriend(); }}>Supprimer</button>
                    {!renaming ? (
                        <button onClick={() => setRenaming(true)}>Renommer</button>
                    ) : (
                        <div className="rename-box">
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                            />
                            <button onClick={handleAliasChange}>✔️</button>
                        </div>
                    )}
                    <button onClick={() => { setMenuOpen(false); onViewWishlist(); }}>Voir wishlist</button>
                </div>
            )}
        </div>
    );
};

export default FriendMenu;
