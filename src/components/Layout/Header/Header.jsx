import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import Badge from "../../AEV/AEV.Badge/Badge";
import { useNotification } from "../../../context/NotificationContext";
import { Search, NotificationsNone, ShoppingCartOutlined, Person, Close, Menu as MenuIcon } from "@mui/icons-material";
import DrawerNotif from "../../../pages/Home/Drawer/DrawerNotif/DrawerNotif";
import DrawerCart from "../../../pages/Home/Drawer/DrawerCart/DrawerCart";
import apiService from "../../../services/apiService";
import useAuth from "../../../hooks/useAuth";
import "./Header.scss";

const megaMenu = [
    {
        title: "PC",
        groups: [
            { title: "Plateformes", links: ["Steam", "Epic Games", "Ubisoft Connect", "Battle.net"] },
            { title: "Genres", links: ["FPS", "MMORPG", "Stratégie", "Indé"] }
        ]
    },
    {
        title: "PlayStation",
        groups: [{ title: "Sony", links: ["PS5", "PS4"] }]
    },
    {
        title: "Xbox",
        groups: [{ title: "Microsoft", links: ["Xbox Series X", "Xbox Series S", "Xbox One"] }]
    },
    {
        title: "Nintendo",
        groups: [{ title: "Nintendo", links: ["Switch", "Switch Lite"] }]
    }
];

const NavItem = ({ item, idx, activeMega, setActiveMega }) => (
    <div
        className="nav-item"
        onMouseEnter={() => setActiveMega(idx)}
        onMouseLeave={() => setActiveMega(null)}
    >
        <div className="nav-item-content">{item.title}</div>
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
    const [activeMega, setActiveMega] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { unreadCount } = useNotification();

    const searchInputRef = useRef(null);
    const searchWrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.pathname);

    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        const fetchCart = async () => {
            if (!user?.userId) return;
            try {
                const res = await apiService.get(`/cart/${user.userId}`);

                const items = res?.items?.$values || [];
                setCartItems(items);
            } catch (err) {
                console.error("Erreur panier:", err);
                setCartItems([]);
            }
        };

        if (cartDrawerOpen) fetchCart();
    }, [cartDrawerOpen, user]);


    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setSearchOpen(false);
                setSearchQuery("");
            }
        };

        const handleClickOutside = (e) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
                if (!location.pathname.startsWith('/search')) {
                    setSearchOpen(false);
                    setSearchQuery("");
                }
            }
        };

        window.addEventListener("keydown", handleEsc);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [location.pathname]);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    useEffect(() => {
        if (searchQuery.trim()) {
            if (!location.pathname.startsWith("/search")) {
                previousPath.current = location.pathname;
            }
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else if (location.pathname.startsWith("/search")) {
            // retour à la page précédente si on supprime tout
            navigate(previousPath.current || "/");
        }
    }, [searchQuery]);


    const handleSearchOpen = (e) => {
        e.stopPropagation();
        if (!searchOpen) {
            setSearchOpen(true);
        }
    };

    const handleSearchClose = (e) => {
        e.stopPropagation();
        setSearchOpen(false);
        setSearchQuery("");
    };

    const handleProfileClick = () => {
        window.location.href = '/profile';
    };

    return (
        <>
            <header className={`neo-header ${scrolled ? "scrolled" : ""}`}>
                <div className="header-container">
                    <div className="left" onClick={() => (window.location.href = "/")}>
                        <img src={Logo} alt="Aevoria Logo" className="logo" />
                        <span className="brand-name">Aevoria<sup>®</sup></span>
                    </div>
                    <div className="burger-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <MenuIcon className="icon" />
                    </div>
                    <div className="nav-center-wrapper">
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
                        </nav>
                        <div
                            ref={searchWrapperRef}
                            className={`search-wrapper ${searchOpen ? 'open' : ''}`}
                            onClick={handleSearchOpen}
                        >
                            <Search className="search-icon" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="search-input"
                                placeholder="Rechercher des jeux..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            {searchOpen && (
                                <div
                                    className="search-close"
                                    onClick={handleSearchClose}
                                >
                                    <Close />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="right">
                        <Badge count={unreadCount}>
                            <NotificationsNone className="icon" onClick={() => setNotifDrawerOpen(true)} />
                        </Badge>
                        <Badge count={Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0}>
                            <ShoppingCartOutlined className="icon" onClick={() => setCartDrawerOpen(true)} />
                        </Badge>
                        <div className="profile-avatar" onClick={handleProfileClick}>
                            <img
                                src={user?.profileImage || "/src/assets/images/avatar.png"}
                                alt="Profile"
                                className="profile-image"
                                onError={(e) => {
                                    e.target.src = "/src/assets/images/avatar.png";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <DrawerNotif
                isOpen={notifDrawerOpen}
                onClose={() => setNotifDrawerOpen(false)}
                subject=""
                setSubject={() => { }}
                message=""
                setMessage={() => { }}
            />
            <DrawerCart
                isOpen={cartDrawerOpen}
                onClose={() => setCartDrawerOpen(false)}
                userId={user?.userId}
            />

            {mobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>

                        {/* Search */}
                        <div className="mobile-search">
                            <Search className="icon" />
                            <input
                                type="text"
                                placeholder="Rechercher des jeux..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <Close className="close-icon" onClick={() => setSearchQuery("")} />
                            )}
                        </div>

                        {/* Mega menu items */}
                        <div className="mobile-nav">
                            {megaMenu.map((item, idx) => (
                                <div key={idx} className="mobile-nav-item">
                                    <div className="title">{item.title}</div>
                                    {item.groups.map((group, gidx) => (
                                        <div key={gidx} className="group">
                                            <h4>{group.title}</h4>
                                            <ul>
                                                {group.links.map((link, lidx) => (
                                                    <li key={lidx}>
                                                        <a href="#" onClick={() => setMobileMenuOpen(false)}>{link}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Right icons */}
                        <div className="mobile-right">
                            <Badge count={unreadCount}>
                                <NotificationsNone className="icon" onClick={() => {
                                    setNotifDrawerOpen(true);
                                    setMobileMenuOpen(false);
                                }} />
                            </Badge>
                            <Badge count={Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0}>
                                <ShoppingCartOutlined className="icon" onClick={() => {
                                    setCartDrawerOpen(true);
                                    setMobileMenuOpen(false);
                                }} />
                            </Badge>
                            <Person className="icon" style={{ fontSize: '32px' }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
