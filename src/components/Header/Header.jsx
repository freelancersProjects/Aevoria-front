// Header.jsx
import React from "react";
import "./Header.scss";
import Logo from "/Logo.png";
import { useState, useEffect } from "react";
import CartIcon from "../../../public/assets/svg/cart.svg?react";
import UserIcon from "../../../public/assets/svg/user.svg?react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                <UserIcon className="icon" />
            </div>
        </header>
    );
};

export default Header;
