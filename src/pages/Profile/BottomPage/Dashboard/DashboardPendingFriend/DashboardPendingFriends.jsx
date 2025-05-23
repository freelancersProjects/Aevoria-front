import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../components/AEV/AEV.Button/Button';
import apiService from '../../../../../services/apiService';
import './DashboardPendingFriends.scss';

const DashboardPendingFriends = ({ currentUserId, onActionDone, onAccepted = [] }) => {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {

                const response = await apiService.get(`/friends/${currentUserId}`);
                const all = response.$values || [];

                const pendingReceived = all.filter(
                    rel =>
                        rel.status === 'Pending' &&
                        rel.friendId === currentUserId
                );

                const enriched = await Promise.all(
                    pendingReceived.map(async (relation) => {
                        const sender = await apiService.get(`/users/${relation.userId}`);
                        return {
                            ...sender,
                            relationFriendId: relation.userId,
                        };
                    })
                );

                setFriendRequests(enriched);
            } catch (error) {
                console.error("Erreur de récupération des demandes d'amis :", error);
            }
        };

        fetchFriendRequests();
    }, [currentUserId]);


    const handleAccept = async (friendId) => {
        try {
            await apiService.patchQuery(`/friends/status?userId=${friendId}&friendId=${currentUserId}&status=Accepted`);
            setFriendRequests(prev => prev.filter(req => req.relationFriendId !== friendId));
            onAccepted(friendId);
            onActionDone();
        } catch (error) {
            console.error("Erreur lors de l'acceptation :", error);
        }
    };

    const handleRefuse = async (friendId) => {
        try {
            await apiService.delete(`/friends?userId=${friendId}&friendId=${currentUserId}`);
            setFriendRequests(prev => prev.filter(req => req.relationFriendId !== friendId));
            // Pas besoin d'appeler onActionDone() ici si tu ne veux pas refetch les Accepted
        } catch (error) {
            console.error("Erreur lors du refus :", error);
        }
    };

    if (friendRequests.length === 0) return null;

    return (
        <div className="pending-requests">
            <h3 className="pending-title">Demandes d’amis</h3>
            {friendRequests.map(friend => (
                <div key={friend.relationFriendId} className="pending-card">
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
                            onClick={() => handleAccept(friend.relationFriendId)}
                        />
                        <Button
                            text="Refuser"
                            className="refuse-btn"
                            onClick={() => handleRefuse(friend.relationFriendId)}
                            variant="outline"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

DashboardPendingFriends.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    onActionDone: PropTypes.func.isRequired,
    onAccepted: PropTypes.func.isRequired,
};

export default DashboardPendingFriends;
