import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { jwtDecode } from "jwt-decode";

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
                    setUser(response.data);
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

    const login = async ({email, password}) => {
        try {
            const response = await apiService.post("/auth/login",{email, password});
            console.log("hezhbzhzh", response);
            const { token, userId, user } = response.data??{};
            if (!token || !userId ) {
                throw new Error("Invalid response from server");
            }
        

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            setUser(user);
            console.log("Connecté en tant que", user);
        }
        catch (error) {
            console.error("Échec de la connexion", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
    };

    return { user, login, logout, loading };
};

export default useAuth;
