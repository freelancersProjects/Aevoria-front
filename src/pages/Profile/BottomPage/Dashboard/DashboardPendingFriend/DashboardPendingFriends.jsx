import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../components/AEV/AEV.Button/Button';
import apiService from '../../../../../services/apiService';
import './DashboardPendingFriends.scss';

const DashboardPendingFriends = ({ currentUserId, onActionDone }) => {
    const [friendRequests, setFriendRequests] = React.useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await apiService.get(`/friends/${currentUserId}`);
                const all = response.$values || [];

                const pending = all.filter(friend => friend.status === 'Pending');

                const enriched = await Promise.all(
                    pending.map(async (friend) => {
                        const friendData = await apiService.get(`/users/${friend.friendId}`);
                        return {
                            ...friendData,
                            relationFriendId: friend.friendId,
                        };
                    })
                );

                setFriendRequests(enriched);
            } catch (error) {
                console.error("Erreur lors de la récupération des demandes d'amis :", error);
            }
        };
        fetchFriendRequests();
    }, [currentUserId]);



    const handleAction = async (friendId, status) => {
        try {
            await apiService.patchQuery(`/friends/status?userId=${currentUserId}&friendId=${friendId}&status=${status}`);
            onActionDone();
        } catch (error) {
            console.error("Erreur de mise à jour du statut :", error);
        }
    };

    if(friendRequests.length === 0) return null;

    return (
        <div className="pending-requests">
            {friendRequests.map(friend => (
                <React.Fragment key={friend.relationFriendId}>
                    <h3 className="pending-title">Demandes d’amis</h3>
                    <div className="pending-card">
                        <div className="friendInfo">
                            <img
                                src={friend.profile_picture || 'https://via.placeholder.com/40'}
                                alt={`${friend.first_name} ${friend.last_name}`}
                                className="avatar"
                            />
                            <div className="details">
                                <h4 className="name">{friend.first_name} {friend.last_name}</h4>
                                <p className="username">@{friend.username}</p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button
                                text="Accepter"
                                className="accept-btn"
                                onClick={() => handleAction(friend.relationFriendId, 'Accepted')}
                            />
                            <Button
                                text="Refuser"
                                className="refuse-btn"
                                onClick={() => handleAction(friend.relationFriendId, 'Declined')}
                                variant="outline"
                            />
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

DashboardPendingFriends.propTypes = {
    friendRequests: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired,
    onActionDone: PropTypes.func.isRequired
};

export default DashboardPendingFriends;
