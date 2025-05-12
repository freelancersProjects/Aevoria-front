
import React, { useState, useEffect } from 'react';
import Drawer from '../../../../components/AEV/AEV.Drawer/Drawer';
import EmailForm from '../../../../components/AEV/AEV.EmailForm/EmailForm';
import TabSwitcher from '../../../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import Toast from '../../../../components/AEV/AEV.Toast/Toast';
import './DrawerNotif.scss';
import apiService from '../../../../services/apiService';
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
import "./DrawerNotif.scss";

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
    const [opened, setOpened] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [messages, setMessages] = useState([
        { id: 1, subject: "Votre ticket est en cours", from: "Support", date: "01/04/2025", read: false, content: "Nous traitons actuellement votre demande." },
        { id: 2, subject: "Salut mec, t'as vu l'offre ?", from: "Ami", date: "02/04/2025", read: true, content: "Regarde cette promo sur Cyberpunk. Elle est incroyable !" },
        { id: 3, subject: "Nouvelle promo sur Cyberpunk !", from: "System", date: "03/04/2025", read: false, content: "Profitez de 50% sur Cyberpunk pendant 48h." }
    ]);
    const [sent, setSent] = useState([
    const [localNotifications, setLocalNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [sent] = useState([
        { id: 101, subject: "Réclamation Cyberpunk", to: "Support", date: "01/04/2025" },
        { id: 102, subject: "Merci pour le code !", to: "Ami", date: "31/03/2025" }
    ]);


    // Simuler la récupération des demandes d'amis
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const data = await apiService.get('/friends'); // je ne sais pas si c'est le bon endpoint
                if (data) {
                    setFriendRequests(data);
                }
            } catch (error) {
                setToast({
                    show: true,
                    message: "Erreur lors de la récupération des demandes d'amis",
                    type: "error"
                });
            }
        };

        fetchFriendRequests();
    }, []);

    const unreadCount = messages.filter(m => !m.read).length;
    const notifications = data?.$values || [];

    const general = notifications.filter(n =>
        !n.userId || n.userId === "00000000-0000-0000-0000-000000000000"
    );
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


    const handleFriendRequest = async (requestId, action) => {
        try {
            // Appel API pour accepter ou refuser la demande
            await apiService.post(`/friends/${requestId}/${action}`);
            
            // Mise à jour de l'UI après succès de l'API
            setFriendRequests(prev => prev.filter(req => req.id !== requestId));
            
            setToast({
                show: true,
                message: action === 'accept' 
                    ? "Demande d'ami acceptée !" 
                    : "Demande d'ami refusée",
                type: action === 'accept' ? "success" : "info"
            });
        } catch (error) {
            setToast({
                show: true,
                message: `Erreur lors de ${action === 'accept' ? "l'acceptation" : "le refus"} de la demande d'ami`,
                type: "error"
            });
        }
    };

    const renderFriendRequests = () => (
        <div className="friend-requests">
            {friendRequests.map(request => (
                <div key={request.id} className="friend-request-item">
                    <div className="request-info">
                        <h4>{request.username}</h4>
                        <span className="date">{request.date}</span>
                    </div>
                    <div className="request-actions">
                        <button 
                            className="accept-btn"
                            onClick={() => handleFriendRequest(request.id, 'accept')}
                        >
                            Accepter
                        </button>
                        <button 
                            className="decline-btn"
                            onClick={() => handleFriendRequest(request.id, 'decline')}
                        >
                            Refuser
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMessages = (filter) => (

    const markAllAsRead = async () => {
        const unread = localNotifications.filter(n => !n.isRead);

        await Promise.all(
            unread.map(n =>
                apiService.put(`/notifications/${n.notificationId}/read`)
            )
        );

        setLocalNotifications(prev =>
            prev.map(n =>
                !n.isRead ? { ...n, isRead: true } : n
            )
        );
    };


    const handleOpenMessage = async (id) => {
        setOpened(prev => (prev === id ? null : id));

        setLocalNotifications(prev =>
            prev.map(n =>
                n.notificationId === id && !n.isRead
                    ? { ...n, isRead: true }
                    : n
            )
        );

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

            {localNotifications
                .filter(n => messages.some(msg => msg.notificationId === n.notificationId))
                .map((msg) => (
                    <div
                        key={msg.notificationId}
                        className={`message-item
                            ${msg.isImportant ? "important" : ""}
                            ${msg.isRead ? "read" : "unread"}
                            ${opened === msg.notificationId ? "open" : ""}`}
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

        { label: "Général", content: renderMessages('system') },
        { label: "Amis", content: (
            <div className="friends-tab">
                <div className="friend-requests-section">
                    <h3>Demandes d'amis</h3>
                    {renderFriendRequests()}
                </div>
                {renderMessages('ami')}
            </div>
        )},
        { label: "Support", content: renderMessages('support') }
    ];

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            position="right"
            title="Centre de notifications"
            className="wide"
        >
            <div className="drawer-notif">
                <TabSwitcher tabs={tabs} />
                {toast && toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={3000}
                        onClose={() => setToast({ ...toast, show: false })}
                    />
                )}
            </div>
        </Drawer>
        { label: "Général", content: renderMessages(general) },
        { label: "Amis", content: renderMessages(amis) },
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
