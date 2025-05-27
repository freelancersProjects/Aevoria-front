import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../components/AEV/AEV.Button/Button';
import apiService from '../../../../../services/apiService';
import Toast from '../../../../../components/AEV/AEV.Toast/Toast';
import './DashboardPendingFriends.scss';

const DashboardPendingFriends = ({ currentUserId, onActionDone, onAccepted = [] }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [toast, setToast] = useState(null);

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
            setToast({
                type: 'success',
                message: "Demande d'ami acceptée.",
            });
        } catch (error) {
            setToast({
                type: 'error',
                message: "Erreur lors de l'acceptation de la demande d'ami.",
            });
        }
    };

    const handleRefuse = async (friendId) => {
        try {
            await apiService.delete(`/friends?userId=${friendId}&friendId=${currentUserId}`);
            setFriendRequests(prev => prev.filter(req => req.relationFriendId !== friendId));
            setToast({
                type: 'success',
                message: "Demande d'ami refusée.",
            });
        } catch (error) {
            setToast({
                type: 'error',
                message: "Erreur lors du refus de la demande d'ami.",
            });
        }
    };

    if (friendRequests.length === 0) return null;

    return (
        <div className="pending-requests">
            <h3 className="pending-title">Demandes d’amis</h3>
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
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
