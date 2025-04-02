import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../../../public/assets/images/Logo.png";
import { Search, NotificationsNone, ShoppingCartOutlined, AccountCircle } from "@mui/icons-material";

const megaMenu = [
    {
        title: "PC Gaming",
        groups: [
            {
                title: "Plateformes",
                links: ["Steam", "Epic Games", "Ubisoft Connect", "Battle.net"]
            },
            {
                title: "Genres",
                links: ["FPS", "MMORPG", "Stratégie", "Indé"]
            }
        ]
    },
    {
        title: "Consoles",
        groups: [
            {
                title: "Sony",
                links: ["PS5", "PS4"]
            },
            {
                title: "Microsoft & Nintendo",
                links: ["Xbox Series X", "Switch"]
            }
        ]
    },
    {
        title: "Systèmes",
        groups: [
            {
                title: "OS Supportés",
                links: ["Windows", "macOS", "Linux"]
            }
        ]
    },
    {
        title: "Offres",
        groups: [
            {
                title: "Top Picks",
                links: ["Top ventes", "Nouveautés", "Promotions"]
            }
        ]
    }
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`neo-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-container">
                <div className="left" onClick={() => (window.location.href = "/")}>
                    <img src={Logo} alt="Aevoria Logo" className="logo" />
                    <span className="brand-name">Aevoria<sup>®</sup></span>
                </div>
                {!searchOpen && (
                    <nav className="center">
                        {megaMenu.map((item, idx) => (
                            <div
                                key={idx}
                                className="nav-item"
                                onMouseEnter={() => setActiveMega(idx)}
                                onMouseLeave={() => setActiveMega(null)}
                            >
                                {item.title}
                                {activeMega === idx && (
                                    <div className="mega-panel">
                                        {item.groups.map((group, gidx) => (
                                            <div key={gidx} className="mega-group">
                                                <h4>{group.title}</h4>
                                                <ul>
                                                    {group.links.map((link, lidx) => (
                                                        <li key={lidx}><a href="#">{link}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                )}

                <div className="right">
                    {searchOpen ? (
                        <div className="search-bar-expanded">
                            <input type="text" placeholder="Search games..." autoFocus />
                            <button onClick={() => setSearchOpen(false)}>X</button>
                        </div>
                    ) : (
                        <div className="icons">
                            <div className="search-icon-wrapper" onClick={() => setSearchOpen(true)}>
                                <Search className="icon search-icon" />
                            </div>
                            <NotificationsNone className="icon" />
                            <ShoppingCartOutlined className="icon" />
                            <AccountCircle className="icon" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
