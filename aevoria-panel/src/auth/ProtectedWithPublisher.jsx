import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedWithPublisher = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        const checkAccess = async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            // Si ce n’est pas un Publisher → autorisé
            if (user.role !== "Publisher") {
                setAuthorized(true);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/publishers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const publishers = await res.json();

                console.log("✅ Vérification publisher pour user ID:", user.id);
                console.log("📦 Publishers reçus:", publishers);

                const hasPublisher = Array.isArray(publishers) && publishers.some(pub => pub.user_id === user.id);
                setAuthorized(hasPublisher);
            } catch (err) {
                console.error("Erreur lors de la vérification du publisher :", err);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, []); // ← garde bien ce tableau vide (mais vérifie que user/token sont bien dans localStorage AU MONTAGE)

    if (loading) return <div>Chargement...</div>;

    return authorized ? children : <Navigate to="/no-publisher" />;
};

export default ProtectedWithPublisher;
