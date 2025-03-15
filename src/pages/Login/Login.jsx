import React, { useState } from "react";
import "./Login.scss";
import { FaFacebookF, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logoImage from "../../../public/assets/svg/logo.svg?react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
    } catch (error) {
    }
  };

  const handleAppleLogin = () => {
  };

  const handleDiscordLogin = () => {
  };
  
  const handleFacebookLogin = () => {
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" />
            <div className="password-container">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Mot de passe" 
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
            
            <button type="submit" className="login-btn">Se connecter</button>
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
      {/* Image à droite - avec le texte de l'image */}
      <div className="login-image">
        <div className="image-overlay">
          </div>
        </div>
      </div>
  );
};

export default LoginPage;

