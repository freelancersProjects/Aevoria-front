import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!token || !userId) {
                setLoading(false);
                return;
            }

            try {
                const res = await apiService.get(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res) {
                    setUser(res);
                } else {
                    throw new Error("Utilisateur introuvable.");
                }
            } catch (err) {
                console.error("Erreur d'auth :", err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async ({ email, password }) => {
        try {
            const res = await apiService.post("/auth/login", { email, password });

            if (!res || !res.token) {
                throw new Error("Token non trouvé dans la réponse !");
            }

            const decoded = jwtDecode(res.token);
            const userId = decoded?.user_id;

            if (!userId) {
                throw new Error("user_id introuvable dans le token décodé.");
            }

            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", userId);

            return { token: res.token, userId };
        } catch (err) {
            console.error("Erreur dans useAuth login:", err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
    };

    return { login, logout, user, loading, error };
};

export default useAuth;
