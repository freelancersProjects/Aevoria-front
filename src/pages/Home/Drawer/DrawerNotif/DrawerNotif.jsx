import React, { useState, useEffect } from "react";
import Drawer from "../../../../components/AEV/AEV.Drawer/Drawer";
import EmailForm from "../../../../components/AEV/AEV.EmailForm/EmailForm";
import TabSwitcher from "../../../../components/AEV/AEV.TabSwitcher/TabSwitcher";
import ErrorOutline from "@mui/icons-material/Report";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import apiService from "../../../../services/apiService";
import Popup from "../../../../components/AEV/AEV.Popup/Popup";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Toast from "../../../../components/AEV/AEV.Toast/Toast";
import "./DrawerNotif.scss";
import Button from "../../../../components/AEV/AEV.Button/Button";

const DashboardPendingFriends = ({ currentUserId, onActionDone }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await apiService.get(`/friends/${currentUserId}`);
                const all = response.$values || [];
                const pending = all.filter(friend => friend.status === 'Pending');
                const enriched = await Promise.all(
                    pending.map(async (friendRelation) => {
                        const friendData = await apiService.get(`/users/${friendRelation.friendId}`);
                        return {
                            ...friendData,
                            relationFriendId: friendRelation.userId === currentUserId
                                ? friendRelation.friendId
                                : friendRelation.userId,
                            status: friendRelation.status,
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

    const handleAction = async (friendId) => {
  try {
            await apiService.patchQuery(`/friends/status?userId=${friendId}&friendId=${currentUserId}&status=Accepted`);
            setFriendRequests(prev => prev.filter(req => req.relationFriendId !== friendId));
            onAccepted(friendId);
            onActionDone();
            setToast({
                type: 'success',
                message: "Demande d'ami acceptée."
            });
        } catch (error) {
            setToast({
                type: 'error',
                message: "Erreur lors du traitement de la demande"
            });
        }
    };

    if (friendRequests.length === 0) return null;

    return (
        <div className="pending-requests">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={3000}
                    onClose={() => setToast(null)}
                />
            )}
            <h3 className="pending-title">Demandes d'amis</h3>
            {friendRequests.map(friend => (
                <div className="pending-card" key={friend.relationFriendId}>
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
                            onClick={() => handleAction(
                                friend.relationFriendId,
                                'Accepted',
                                `${friend.first_name} ${friend.last_name}`
                            )}
                        />
                        <Button
                            text="Refuser"
                            className="refuse-btn"
                            onClick={() => handleAction(
                                friend.relationFriendId,
                                'Declined',
                                `${friend.first_name} ${friend.last_name}`
                            )}
                            variant="outline"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const DrawerNotif = ({
    isOpen,
    onClose,
    subject,
    setSubject,
    message,
    setMessage
}) => {
    const { user } = useAuth();
    const userId = user?.userId;

    const { data, loading, error } = useFetch(userId ? `/notifications/${userId}` : null);
    const [opened, setOpened] = useState(null);
    const [recipients, setRecipients] = useState([]);
    const [file, setFile] = useState(null);
    const [toast, setToast] = useState(null);
    const [localNotifications, setLocalNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [sent] = useState([
        { id: 101, subject: "Réclamation Cyberpunk", to: "Support", date: "01/04/2025" },
        { id: 102, subject: "Merci pour le code !", to: "Ami", date: "31/03/2025" }
    ]);

    const notifications = data?.$values || [];
    const general = notifications.filter(n => !n.userId || n.userId === "00000000-0000-0000-0000-000000000000");
    const amis = notifications.filter(n => n.notificationType === "Ami");
    const support = notifications.filter(n => n.notificationType === "Support");

    const unreadCount = localNotifications.filter(n => !n.isRead).length;

    useEffect(() => {
        if (notifications.length > 0) {
            setLocalNotifications(notifications);
        }
    }, [notifications]);

    const handleDeleteMessage = async (id) => {
        try {
            await apiService.delete(`/notifications/${id}`);
            setLocalNotifications(prev => prev.filter(n => n.notificationId !== id));
        } catch (error) {
            console.error("Erreur suppression notification :", error);
        }
    };

    const markAllAsRead = async () => {
        const unread = localNotifications.filter(n => !n.isRead);
        await Promise.all(unread.map(n => apiService.put(`/notifications/${n.notificationId}/read`)));
        setLocalNotifications(prev => prev.map(n => !n.isRead ? { ...n, isRead: true } : n));
    };

    const handleOpenMessage = async (id) => {
        setOpened(prev => (prev === id ? null : id));
        setLocalNotifications(prev => prev.map(n => n.notificationId === id && !n.isRead ? { ...n, isRead: true } : n));
        const clicked = localNotifications.find(n => n.notificationId === id);
        if (clicked && !clicked.isRead) {
            await apiService.put(`/notifications/${id}/read`);
        }
    };

    const renderMessages = (messages) => (
        <div className="drawer-messages">
            <div className="notif-header-row">
                <span>{unreadCount} message(s) non lu(s)</span>
                {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={markAllAsRead}>
                        Tout marquer comme lu
                    </button>
                )}
            </div>
            {localNotifications.filter(n => messages.some(msg => msg.notificationId === n.notificationId)).map(msg => (
                <div
                    key={msg.notificationId}
                    className={`message-item ${msg.isImportant ? "important" : ""} ${msg.isRead ? "read" : "unread"} ${opened === msg.notificationId ? "open" : ""}`}
                    onClick={() => handleOpenMessage(msg.notificationId)}
                >
                    <div className="d-flex aic">
                        <div className="top-line">
                            <div className="subject">
                                {msg.isImportant && <ErrorOutline className="important-icon" />}
                                {msg.subject}
                            </div>
                            <div className="meta-row">
                                <span className="meta">{msg.createdAt?.split("T")[0]}</span>
                            </div>
                        </div>
                        <div className="meta">
                            <DeleteOutline
                                className="delete-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(msg.notificationId);
                                    setShowPopup(true);
                                }}
                            />
                        </div>
                    </div>
                    {opened === msg.notificationId && (
                        <div className="msg-content">{msg.message}</div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSendTab = () => (
        <div className="emailform-tab-wrapper">
            <EmailForm
                recipients={recipients}
                setRecipients={setRecipients}
                subject={subject}
                setSubject={setSubject}
                message={message}
                setMessage={setMessage}
                file={file}
                setFile={setFile}
                toast={toast}
                setToast={setToast}
            />
            <div className="sent-messages-title">Récent</div>
            <div className="drawer-messages sent">
                {sent.map((msg) => (
                    <div className="message-item read" key={msg.id}>
                        <div className="top-line">
                            <h4 className="subject">{msg.subject}</h4>
                            <span className="meta">à {msg.to} • {msg.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const tabs = [
        { label: "Envoyer", content: renderSendTab() },
        { label: "Général", content: renderMessages(general) },
        {
            label: "Amis",
            content: (
                <>
                    {renderMessages(amis)}
                    <DashboardPendingFriends currentUserId={userId} onActionDone={() => { }} />
                </>
            )
        },
        { label: "Support", content: renderMessages(support) }
    ];

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                position="right"
                title="Centre de notifications"
                className="wide"
            >
                <div className="drawer-notif">
                    {loading && <p>Chargement...</p>}
                    {error && <p>Erreur lors du chargement des notifications.</p>}
                    {!loading && !error && <TabSwitcher tabs={tabs} />}
                </div>
            </Drawer>
            {showPopup && (
                <Popup
                    message="Voulez-vous vraiment supprimer cette notification ?"
                    onConfirm={async () => {
                        await handleDeleteMessage(selectedId);
                        setShowPopup(false);
                        setSelectedId(null);
                    }}
                    onCancel={() => {
                        setShowPopup(false);
                        setSelectedId(null);
                    }}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                />
            )}
        </>
    );
};

export default DrawerNotif;