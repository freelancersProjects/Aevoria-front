import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaApple, FaDiscord, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/AEV/AEV.Checkbox/CheckBox";
import Logo from "../../assets/svg/logo.svg";
import useAuth from "../../hooks/useAuth";
import "./Login.scss";

const RANDOM_IMAGES = [
  "https://images.pexels.com/photos/907240/pexels-photo-907240.jpeg?auto=compress&w=1200&q=80",
  "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&w=1200&q=80",
  "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=1200&q=80",
  "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&w=1200&q=80",
  "https://images.pexels.com/photos/400959/pexels-photo-400959.jpeg?auto=compress&w=1200&q=80"
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Changer l'image de fond aléatoirement
    const randomImage = RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
    setBackgroundImage(randomImage);
  }, []);

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

      navigate("/");

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
          <img onClick={() => navigate("/")} src={Logo} alt="Logo" className="login-logo" />
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
              <Checkbox
                label="Se souvenir de moi"
                checked={rememberMe}
                onChange={setRememberMe}
              />
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
      <div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="image-overlay">
          <div className="overlay-content">
            <h3>Bienvenue sur Aevoria</h3>
            <p>Votre destination gaming préférée</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
