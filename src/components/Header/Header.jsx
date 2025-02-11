import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '/Logo.png';

const HeaderComponent = () => {
    return (
        <div className='header-main'>
            <div className='header-left'>
                <img src={Logo} alt="Aevoria Logo" className="logo-image" />
                <nav className='header-menu'>
                    <Link to="/">Accueil</Link>
                    <Link to="/jeux">Jeux</Link>
                    <Link to="/nouveautes">Nouveautés</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/apropos">À propos</Link>
                </nav>
            </div>
            <div className='header-right'>
                <Link to="/cart" className="cart-icon">🛒</Link>
                <Link to="/login" className="profile-icon">👤</Link>
            </div>
        </div>
    )
}

export default HeaderComponent