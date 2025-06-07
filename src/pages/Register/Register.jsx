import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaApple, FaDiscord, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/svg/logo.svg";
import apiService from '../../services/apiService';
import useFetch from '../../hooks/useFetch';
import Checkbox from "../../components/AEV/AEV.Checkbox/CheckBox";
import './Register.scss';

const RANDOM_IMAGES = [
  // Images libres de droits sur le thème du jeu vidéo
  "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=1200&q=80", // cyberpunk setup
  "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&w=1200&q=80", // gaming room
  "https://images.pexels.com/photos/2885014/pexels-photo-2885014.jpeg?auto=compress&w=1200&q=80", // virtual reality
  "https://images.pexels.com/photos/159393/gamepad-video-games-joystick-game-console-159393.jpeg?auto=compress&w=1200&q=80", // retro controllers
  "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&w=1200&q=80" // gaming setup dark
];

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const { data: roles, error: roleError } = useFetch("/roles/public");

  useEffect(() => {
    // Changer l'image de fond aléatoirement
    const randomImage = RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
    setBackgroundImage(randomImage);

    if (roles && roles.$values && Array.isArray(roles.$values)) {
      const userRole = roles.$values.find(role => role.name === "User");
      if (userRole) {
        setRoleId(userRole.roleId);
      } else {
        setError("Unable to retrieve 'User' role");
      }
    } else {
      setError("Error retrieving roles.");
    }
  }, [roles]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsRegistering(true);

    if (!roleId) {
      setError("Unable to retrieve 'User' role. Please try again later.");
      setIsRegistering(false);
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      roleId: roleId,
      subscriptionType: 0,
      provider: 0,
      walletBalance: 0.00,
      languagePreference: "en"
    };

    try {
      const response = await apiService.post("/users", userData);
      if (response) {
        navigate("/login");
      } else {
        setError("Error during registration. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Implémentation future des connexions sociales
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="logo-container">
          <img onClick={() => navigate("/")} src={Logo} alt="Logo" className="register-logo" />
        </div>
        <div className="register-form-container">
          <h2>Créer un compte</h2>
          <p className="register-subtitle">
            Déjà un compte ? <a onClick={() => navigate("/login")}>Se connecter</a>
          </p>

          {error && <div className="error-message">{error}</div>}
          {roleError && <div className="error-message">Erreur de chargement des rôles.</div>}

          <form onSubmit={handleSubmit}>
            <div className="name-container">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="register-options">
              <Checkbox
                label={<>J'accepte les <a onClick={() => navigate("/legal/terms")}>termes et conditions</a></>}
                checked={formData.agreeToTerms}
                onChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked }))}
              />
            </div>

            <button type="submit" className="register-btn" disabled={isRegistering || !formData.agreeToTerms}>
              {isRegistering ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <div className="separator">
            <span>Ou s'inscrire avec</span>
          </div>

          <div className="social-login">
            <button className="google" onClick={() => handleSocialRegister('google')}><FaGoogle /></button>
            <button className="apple" onClick={() => handleSocialRegister('apple')}><FaApple /></button>
            <button className="discord" onClick={() => handleSocialRegister('discord')}><FaDiscord /></button>
            <button className="facebook" onClick={() => handleSocialRegister('facebook')}><FaFacebookF /></button>
          </div>
        </div>
      </div>
      <div className="register-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="image-overlay">
          <div className="overlay-content">
            <h3>Rejoignez la communauté Aevoria</h3>
            <p>Découvrez un monde de jeux passionnants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
