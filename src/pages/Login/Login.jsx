import React from "react";
import "./Login.scss";
import { FaFacebookF, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      console.log("Connexion Google");
    } catch (error) {
      console.error("Erreur de connexion avec Google:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Log in</h2>
        <div className="social-login">
          <button className="facebook"><FaFacebookF /></button>
          <button className="google" onClick={handleGoogleLogin}><FaGoogle /></button>
          <button className="apple"><FaApple /></button>
          <button className="discord"><FaDiscord /></button>
        </div>
        <div className="separator"><span>or</span></div>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="login-btn">Log in</button>
        </form>
          <a href="#">No account yet ?</a>
          <a href="#">Lost password ?</a>
      </div>

      {/* Image à droite */}
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
