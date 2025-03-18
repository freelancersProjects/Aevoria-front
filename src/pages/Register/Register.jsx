import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <div className="logo-container">
          <img src="/assets/svg/logo.svg" alt="Logo" className="login-logo" />
          <a href="/" className="back-link">
            Back to website <span>&rarr;</span>
          </a>
        </div>

        <div className="form-wrapper">
          <h2>Create an account</h2>
          <p className="login-link" onClick={() => navigate("/login")}>
             Already have an account? 
          </p>

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
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
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <IoEyeOutline />
              </button>
            </div>

            <div className="terms-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <p onClick={() => navigate("/terms")}>Terms & Conditions</p>
              </label>
            </div>

            <button type="submit" className="create-account-btn">
              Create account
            </button>
          </form>

          <div className="auth-divider">
            <span>Or register with</span>
          </div>
      </div>
      </div>

      <div className="image-section">
        <div className="image-overlay">
          <h2>Capturing Moments,<br />Creating Memories</h2>
          <div className="slider-indicators">
            <span className="indicator"></span>
            <span className="indicator"></span>
            <span className="indicator active"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
