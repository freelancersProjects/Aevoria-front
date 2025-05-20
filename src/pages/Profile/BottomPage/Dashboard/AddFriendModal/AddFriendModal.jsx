import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/AEV/AEV.Modal/Modal';
import TabSwitcher from '../../../../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import SearchBar from '../../../../../components/AEV/AEV.SearchBar/SearchBar';
import Button from '../../../../../components/AEV/AEV.Button/Button';
import Toast from '../../../../../components/AEV/AEV.Toast/Toast';
import Loader from "../../../../../components/AEV/AEV.Loader/Loader";
import { debounce } from '../../../../../utils/debounce';
import apiService from '../../../../../services/apiService';
import useAuth from '../../../../../hooks/useAuth';
import './AddFriendModal.scss';

const AddFriendModal = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const { user } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddFriend = async (targetUser) => {
        try {
            await apiService.postQuery(`/friends?userId=${user.userId}&friendId=${targetUser.userId}`);

            console.log("Demande d'ami envoyée !");
        } catch (err) {
            console.error("Erreur lors de l'envoi de la demande :", err);
        }
    }

    useEffect(() => {
        if (!user || !user.userId || search.length < 2) {
            setFilteredUsers([]);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await apiService.get(`/users/search-to-add?currentUserId=${user.userId}&query=${search}`);
                const all = res.$values || [];

                const filtered = selectedTab === 'online'
                    ? all.filter(u => u.status === 'En ligne')
                    : all;

                setFilteredUsers(filtered);
            } catch (err) {
                console.error('Erreur de recherche :', err);
                setFilteredUsers([]);
            } finally {
                setLoading(false);
            }
        };

        const debouncedFetch = debounce(fetchUsers, 300);
        debouncedFetch();

        return () => {
            debouncedFetch.cancel && debouncedFetch.cancel();
        };
    }, [search, selectedTab, user]);

    const renderTabContent = () => (
        <div className="addfriend-content">
            <SearchBar
                placeholder="Rechercher un ami..."
                value={search}
                onChange={setSearch}
            />

            <div className="user-list">
                {loading ? (
                    <Loader variant="default" size="medium" />
                ) : filteredUsers.length > 0 ? (

                    filteredUsers.map(user => (
                        <div key={user.userId} className="user-card-glow">
                            <div className="info">
                                <span className="name">{user.firstName} {user.lastName}</span>
                                <span className="username">@{user.username}</span>
                            </div>
                            {user.status === "Pending" ? (
                            <Button
                                text="Déjà envoyé"
                                className="add-friend-button"
                                onClick={() => handleAddFriend(user)}
                                variant="solid"
                                disabled
                            />
                            ) : (
                                <Button
                                    text="Ajouter"
                                    className="request-sent-button"
                                    variant="outline"
                                    onClick={() => handleAddFriend(user)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-user">Aucun utilisateur trouvé</div>
                )}
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un ami" className="addfriend-modal enhanced">
            <h1 className="title">Gestion des amis</h1>
            <TabSwitcher
                tabs={[
                    { label: 'Tous', key: 'all', content: renderTabContent() },
                    { label: 'Demande envoyée', key: 'sent', content: <div className="no-user">Aucune demande envoyée</div> },
                ]}
                onTabChange={key => setSelectedTab(key)}
            />
        </Modal>
    );
};

export default AddFriendModal;
