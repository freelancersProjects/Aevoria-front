import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../../assets/images/Logo.png";
import Badge from "../../AEV/AEV.Badge/Badge";
import SearchBar from "../../AEV/AEV.SearchBar/SearchBar";
import { Search, NotificationsNone, ShoppingCartOutlined, Person, Close } from "@mui/icons-material";
import DrawerNotif from "../../../pages/Home/Drawer/DrawerNotif/DrawerNotif";
import { NotificationsNone, ShoppingCartOutlined, AccountCircle } from "@mui/icons-material";

const megaMenu = [
    {
        title: "PC",
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
        title: "PlayStation",
        groups: [
            {
                title: "Sony",
                links: ["PS5", "PS4"]
            }
        ]
    },
    {
        title: "Xbox",
        groups: [
            {
                title: "Microsoft",
                links: ["Xbox Series X", "Xbox Series S", "Xbox One"]
            }
        ]
    },
    {
        title: "Nintendo",
        groups: [
            {
                title: "Nintendo",
                links: ["Switch", "Switch Lite"]
            }
        ]
    }
];

// Données mockées pour les résultats de recherche
const searchResults = [
  { id: 1, title: "Cyberpunk 2077", category: "RPG", platform: "PC, PS5, XSX", price: "59.99€" },
  { id: 2, title: "Baldur's Gate 3", category: "RPG", platform: "PC", price: "49.99€" },
  { id: 3, title: "Elden Ring", category: "Action RPG", platform: "PC, PS5, XSX", price: "69.99€" },
  { id: 4, title: "Diablo IV", category: "Action RPG", platform: "PC, PS5, XSX", price: "59.99€" },
  { id: 5, title: "Starfield", category: "RPG", platform: "PC, XSX", price: "69.99€" },
  { id: 6, title: "Final Fantasy XVI", category: "RPG", platform: "PS5", price: "79.99€" }
];

const NavItem = ({ item, idx, activeMega, setActiveMega }) => (
    <div
        className="nav-item"
        onMouseEnter={() => setActiveMega(idx)}
        onMouseLeave={() => setActiveMega(null)}
    >
        <div className="nav-item-content">
            {item.title}
            {item.icon}
        </div>
        {activeMega === idx && (
            <div className="mega-panel">
                <div className="mega-content">
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
            </div>
        )}
    </div>
);

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeMega, setActiveMega] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [unreadNotifCount, setUnreadNotifCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Simuler la récupération des notifications non lues
    useEffect(() => {
        // Ici, vous devrez remplacer par un appel API réel
        const mockUnreadCount = 3; // Nombre de notifications non lues
        setUnreadNotifCount(mockUnreadCount);
    }, []);

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    return (
        <>
            <header className={`neo-header ${scrolled ? "scrolled" : ""}`}>
                <div className="header-container">
                    <div className="left" onClick={() => (window.location.href = "/")}>
                        <img src={Logo} alt="Aevoria Logo" className="logo" />
                        <span className="brand-name">Aevoria<sup>®</sup></span>
                    </div>

                    {!searchOpen && (
                        <nav className="center">
                            {megaMenu.map((item, idx) => (
                                <NavItem
                                    key={idx}
                                    item={item}
                                    idx={idx}
                                    activeMega={activeMega}
                                    setActiveMega={setActiveMega}
                                />
                            ))}
                            <div 
                                className="search-button-wrapper"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="search-icon" />
                            </div>
                        </nav>
                    )}

                    {searchOpen ? (
                        <div className="search-input-wrapper">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onSearch={handleSearch}
                                placeholder="Rechercher des jeux, des plateformes..."
                            />
                            <div className="search-close" onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                            }}>
                                <Close />
                            </div>
                        </div>
                    ) : (
                        <div className="right">
                            <div className="icons">

                                <Badge count={3}>
                                    <NotificationsNone className="icon" />
                                </Badge>

                                <div
                                    className={`search-icon-wrapper ${searchOpen ? 'active' : ''}`}
                                    onClick={() => setSearchOpen(true)}
                                >
                                    <AccountCircle className="search-icon" />
                                </div>

                                <Badge count={unreadNotifCount}>
                                    <NotificationsNone
                                        className="icon"
                                        onClick={() => setNotifDrawerOpen(true)}
                                    />
                                </Badge>

                                    <Badge count={3}>
                                        <NotificationsNone
                                            className="icon"
                                            onClick={() => setNotifDrawerOpen(true)}
                                        />
                                    </Badge>


                                <Badge count={5}>
                                    <ShoppingCartOutlined className="icon" />
                                </Badge>
                                <Person className="icon" style={{ fontSize: '32px' }} />
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <DrawerNotif
                isOpen={notifDrawerOpen}
                onClose={() => setNotifDrawerOpen(false)}
                subject={subject}
                setSubject={setSubject}
                message={message}
                setMessage={setMessage}
            />
        </>
    );
};

export default Header;
