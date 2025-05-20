import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/apiService";
import useAuth from "../hooks/useAuth";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnread = async () => {
        if (!user?.userId) return;

        try {
            const res = await apiService.get(`/notifications/${user.userId}`);
            const list = res?.$values || [];
            const unread = list.filter(n => !n.isRead);
            setUnreadCount(unread.length);
        } catch (err) {
            console.error("Erreur récupération des notifs :", err);
        }
    };

    useEffect(() => {
        if (!user?.userId) return;

        fetchUnread();

        const interval = setInterval(() => {
            fetchUnread();
        }, 15000); // 15 secondes

        return () => clearInterval(interval);
    }, [user]);

    return (
        <NotificationContext.Provider value={{ unreadCount, refreshUnread: fetchUnread }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
