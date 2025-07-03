import React from "react";
import Logo from "../../../assets/images/Logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img src={Logo} alt="Aevoria Logo" className="footer-logo" />
          <p>Get exclusive content and become a part of the Aevoria community</p>
        </div>

        <div className="footer-section">
          <h4>Mentions légales</h4>
          <ul>
            <li><a href="#">Conditions général de vente</a></li>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Condition de confidentialité</a></li>
            <li><a href="#">Condition de retour</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Toutes Les Pages</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Abonnement</a></li>
            <li><a href="#">Nous contacter</a></li>
            <li><a href="#">Autre page</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>L'entreprise</h4>
          <ul>
            <li><a href="#">Aevoria</a></li>
            <li><a href="#">Qui sommes-nous</a></li>
            <li><a href="#">Nos partenaires</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2024, Aevoria</p>
      </div>
    </footer>
  );
};

export default Footer;
