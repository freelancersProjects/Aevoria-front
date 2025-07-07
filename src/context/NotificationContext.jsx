import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/apiService";
import useAuth from "../hooks/useAuth";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const fetchUnread = async () => {
        if (!user?.userId) return;

        try {
            const res = await apiService.get(`/notifications/${user.userId}`);
            const list = res?.$values || [];
            setNotifications(list);
            const unread = list.filter(n => !n.isRead);
            setUnreadCount(unread.length);
        } catch (err) {
            console.error("Erreur récupération des notifs :", err);
        }
    };

    useEffect(() => {
        if (!user?.userId) return;

        fetchUnread();
    }, [user]);

    const markAsRead = async (notificationId) => {
        try {
            await apiService.put(`/notifications/${notificationId}/read`);
            setNotifications(prev =>
                prev.map(n => n.notificationId === notificationId ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error("Erreur lors du marquage comme lu :", err);
        }
    };

    const markAllAsRead = async () => {
        try {
            const unreadNotifs = notifications.filter(n => !n.isRead);
            await Promise.all(
                unreadNotifs.map(n => apiService.put(`/notifications/${n.notificationId}/read`))
            );
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error("Erreur lors du marquage comme lu :", err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await apiService.delete(`/notifications/${notificationId}`);
            setNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
            setUnreadCount(prev =>
                notifications.find(n => n.notificationId === notificationId && !n.isRead)
                    ? prev - 1
                    : prev
            );
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    return (
        <NotificationContext.Provider value={{
            unreadCount,
            notifications,
            refreshUnread: fetchUnread,
            markAsRead,
            markAllAsRead,
            deleteNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
