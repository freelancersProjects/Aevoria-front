import { useState, useEffect } from "react";
import apiService from "../services/apiService";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On vérifie si l'utilisateur est déjà connecté
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const response = await apiService.get("/auth/me");
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Erreur d'authentification", error);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await apiService.post("/auth/login", credentials);
            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            console.error("Échec de la connexion", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return { user, login, logout, loading };
};

export default useAuth;
