import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo et description */}
        <div className="footer-section logo-section">
          <img src="/assets/images/Logo.png" alt="Aeovria Logo" className="footer-logo" />
          <p>Get exclusive content and become a part of the Aeovria community</p>
        </div>

        {/* Mentions légales */}
        <div className="footer-section">
          <h4>Mentions légales</h4>
          <ul>
            <li><a href="#">Conditions général de vente</a></li>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Condition de confidentialité</a></li>
            <li><a href="#">Condition de retour</a></li>
          </ul>
        </div>

        {/* Pages */}
        <div className="footer-section">
          <h4>Toutes Les Pages</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Abonnement</a></li>
            <li><a href="#">Nous contacter</a></li>
            <li><a href="#">Autre page</a></li>
          </ul>
        </div>

        {/* L’entreprise */}
        <div className="footer-section">
          <h4>L'entreprise</h4>
          <ul>
            <li><a href="#">Aeovria</a></li>
            <li><a href="#">Qui sommes-nous</a></li>
            <li><a href="#">Nos partenaires</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Copyright © 2024, Aeovria</p>
      </div>
    </footer>
  );
};

export default Footer;
