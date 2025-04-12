import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dashboard,
    VideogameAsset,
    Group,
    Inventory2,
    InsertChart,
    CalendarMonth,
    Description,
    VpnKey,
    Settings,
    NotificationsNone,
    Logout,
    Code,
    Storage,
    BugReport,
    NoteAlt,
} from '@mui/icons-material';

import './Sidebar.scss';
import logo from '../../../public/assets/images/Logo.png';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="Aevoria Logo" />
                <h1>Aevoria</h1>
            </div>

            <div className="profile">
                <div className="profile-pic">
                    <img src="https://i.pravatar.cc/100" alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>Admin Panel</h2>
                    <div className="container-badgeupgrade">
                        <div className="badge">Super Admin</div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <h4 className="menu-title">Main</h4>
            <ul className="menu">
                <li onClick={() => navigate('/')}><p className="list-side"><Dashboard /> Dashboard</p></li>
                <li onClick={() => navigate('/developers')}><p className="list-side"><Group /> Developers</p></li>
                <li onClick={() => navigate('/games')}><p className="list-side"><VideogameAsset /> Games</p></li>
                <li onClick={() => navigate('/sales')}><p className="list-side"><Inventory2 /> Sales</p></li>
                <li onClick={() => navigate('/analytics')}><p className="list-side"><InsertChart /> Analytics</p></li>
            </ul>

            {/* CONTENT */}
            <h4 className="menu-title">Content</h4>
            <ul className="menu">
                <li onClick={() => navigate('/calendar')}><p className="list-side"><CalendarMonth /> Calendar</p></li>
                <li onClick={() => navigate('/pages')}><p className="list-side"><Description /> Pages</p></li>
                <li onClick={() => navigate('/notes')}><p className="list-side"><NoteAlt /> Notes</p></li>
            </ul>

            {/* API / SYSTEM */}
            <h4 className="menu-title">System</h4>
            <ul className="menu">
                <li><p className="list-side"><VpnKey /> API Keys</p></li>
                <li><p className="list-side"><Code /> Dev Tools</p></li>
                <li><p className="list-side"><Storage /> Database</p></li>
                <li><p className="list-side"><BugReport /> Logs & Reports</p></li>
            </ul>

            {/* SETTINGS */}
            <h4 className="menu-title">Settings</h4>
            <ul className="menu">
                <li><p className="list-side"><Settings /> Preferences</p></li>
                <li><p className="list-side"><NotificationsNone /> Alerts</p></li>
                <hr />
                <li onClick={handleLogout}><p className="list-side"><Logout /> Logout</p></li>
            </ul>
        </div>
    );
};

export default Sidebar;
