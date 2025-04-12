import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Login failed");

            const decoded = jwtDecode(data.token);
            console.log("Decoded JWT:", decoded);

            const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (!["Admin", "Publisher"].includes(userRole)) {
                throw new Error("Accès refusé : rôle insuffisant");
            }

            localStorage.setItem("user", JSON.stringify(decoded));
            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Connexion Admin</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {errorMsg && <div className="error-msg">{errorMsg}</div>}

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
