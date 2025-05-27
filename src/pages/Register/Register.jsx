import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Logo from "../../assets/images/Logo.png";
import apiService from '../../services/apiService';
import useFetch from '../../hooks/useFetch';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [error, setError] = useState("");

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

    if (!roleId) {
      setError("Unable to retrieve 'User' role. Please try again later.");
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
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="register-logo" />
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
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <div className="register-options">
              <label className="agree-checkbox">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                J'accepte les <a onClick={() => navigate("/terms")}>termes et conditions</a>
              </label>
            </div>

            <button type="submit" className="register-btn">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
      <div className="register-image">
        <div className="image-overlay"></div>
      </div>
    </div>
  );
};

export default Register;
