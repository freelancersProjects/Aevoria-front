import React, { useState } from "react";
import "./Login.scss";
import { FaFacebookF, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => { };

  const handleAppleLogin = () => { };

  const handleDiscordLogin = () => { };

  const handleFacebookLogin = () => { };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      await login({ email, password });

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

    } catch (error) {
      console.error("Erreur de connexion:", error);
      setLoginError("Email ou mot de passe incorrect");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-container">
          <img src="/assets/svg/logo.svg" alt="Logo" className="login-logo" />
        </div>
        <div className="login-form-container">
          <h2>Se connecter</h2>
          <p className="login-subtitle">Pas encore de compte? <a onClick={() => navigate("/register")}>Créer un compte</a></p>

          {loginError && <div className="error-message">{loginError}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="checkmark"></span>
                Se souvenir de moi
              </label>
              <a href="/forgot-password" className="forgot-password">Mot de passe oublié?</a>
            </div>

            <button type="submit" className="login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="separator">
            <span>Où </span>
          </div>

          <div className="social-login">
            <button className="google" onClick={handleGoogleLogin}><FaGoogle /></button>
            <button className="apple" onClick={handleAppleLogin}><FaApple /></button>
            <button className="discord" onClick={handleDiscordLogin}><FaDiscord /></button>
            <button className="facebook" onClick={handleFacebookLogin}><FaFacebookF /></button>
          </div>
        </div>
      </div>
      <div className="login-image">
        <div className="image-overlay"></div>
      </div>
    </div>
  );
};

export default Login;
