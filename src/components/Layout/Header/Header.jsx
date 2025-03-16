// Header.jsx
import React from "react";
import "./Header.scss";
import Logo from "../../../../public/assets/images/Logo.png";
import { useState, useEffect } from "react";
import CartIcon from "../../../../public/assets/svg/cart.svg?react";
import UserIcon from "../../../../public/assets/svg/user.svg?react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleUserClick = () => {
        navigate('/login');
    };

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-left">
                <img src={Logo} alt="Aevoria Logo" className="logo" />
                <span className="brand-name">Aevoria<sup>®</sup></span>
            </div>

            <nav className="nav">
                <a href="#">Accueil</a>
                <a href="#">Contact</a>
                <a href="#">À Propos</a>
                <a href="#">À Propos</a>
                <a href="#">À Propos</a>
            </nav>

            <div className="header-icons">
                <CartIcon className="icon" />
                <UserIcon className="icon" onClick={handleUserClick} />
            </div>
        </header>
    );
};

export default Header;
