import React, { useState } from 'react';
import Drawer from '../../../../components/AEV/AEV.Drawer/Drawer';
import EmailForm from '../../../../components/AEV/AEV.EmailForm/EmailForm';
import TabSwitcher from '../../../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import './DrawerNotif.scss';

const DrawerNotif = ({ isOpen, onClose }) => {
    const [opened, setOpened] = useState(null);
    const [messages, setMessages] = useState([
        { id: 1, subject: "Votre ticket est en cours", from: "Support", date: "01/04/2025", read: false, content: "Nous traitons actuellement votre demande." },
        { id: 2, subject: "Salut mec, t'as vu l'offre ?", from: "Ami", date: "02/04/2025", read: true, content: "Regarde cette promo sur Cyberpunk. Elle est incroyable !" },
        { id: 3, subject: "Nouvelle promo sur Cyberpunk !", from: "System", date: "03/04/2025", read: false, content: "Profitez de 50% sur Cyberpunk pendant 48h." }
    ]);
    const [sent, setSent] = useState([
        { id: 101, subject: "Réclamation Cyberpunk", to: "Support", date: "01/04/2025" },
        { id: 102, subject: "Merci pour le code !", to: "Ami", date: "31/03/2025" }
    ]);

    const unreadCount = messages.filter(m => !m.read).length;

    const markAllAsRead = () => {
        setMessages(messages.map(m => ({ ...m, read: true })));
    };

    const renderMessages = (filter) => (
        <div className="drawer-messages">
            <div className="notif-header-row">
                <span>{unreadCount} message(s) non lu(s)</span>
                {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={markAllAsRead}>
                        Tout marquer comme lu
                    </button>
                )}
            </div>

            {messages
                .filter(msg => filter === 'all' || msg.from.toLowerCase() === filter.toLowerCase())
                .map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-item ${msg.read ? 'read' : 'unread'} ${opened === msg.id ? 'open' : ''}`}
                        onClick={() => setOpened(opened === msg.id ? null : msg.id)}
                    >
                        <div className="top-line">
                            <h4 className="subject">{msg.subject}</h4>
                            <span className="meta">{msg.from} • {msg.date}</span>
                        </div>
                        {opened === msg.id && (
                            <div className="msg-content">
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );

    const renderSendTab = () => (
        <div className="emailform-tab-wrapper">
            <EmailForm />
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
        {
            label: "Envoyer",
            content: renderSendTab(),
        },
        {
            label: "Général",
            content: renderMessages('system'),
        },
        {
            label: "Amis",
            content: renderMessages('ami'),
        },
        {
            label: "Support",
            content: renderMessages('support'),
        }
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
            </div>
        </Drawer>
    );
};

export default DrawerNotif;
