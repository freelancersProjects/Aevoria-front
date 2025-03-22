import { useState, useEffect } from "react";
import apiService from "../services/apiService";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                if (token && userId) {
                    apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const response = await apiService.get(`/users/${userId}`);
                    if (response.data) {
                        setUser(response.data);
                    } else {
                        throw new Error("Données utilisateur introuvables.");
                    }
                }
            } catch (error) {
                console.error("Erreur d'authentification", error);
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async ({ email, password }) => {
        try {
            console.log("Tentative de connexion avec :", email, password);

            const response = await apiService.post("/auth/login", { email, password });

            console.log("Réponse brute de l'API :", response);

            if (!response) {
                throw new Error("La réponse de l'API est vide ou mal formatée.");
            }

            const { token, user } = response; // Récupère "user"
            const userId = user?.user_id
            if (!token) {
                throw new Error("Token non trouvé dans la réponse !");
            }

            localStorage.setItem("token", token);

            if (userId) {
                localStorage.setItem("userId", userId);
            } else {
                console.error("Erreur: user_id non trouvé dans la réponse API");
            }

            return { token, userId };

        } catch (error) {
            console.error("Erreur dans useAuth login:", error);
            throw error;
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