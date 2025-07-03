import React from 'react';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import AccountHeader from './AccountHeader/AccountHeader';
import './HeaderPage.scss';

const HeaderPage = ({ activeSidebarTab, setActiveSidebarTab }) => {
    return (
        <div className="header-layout">
            <div className="wishlist-section">
                <WishlistHeader activeTab={activeSidebarTab} setActiveTab={setActiveSidebarTab} />
            </div>
            <div className="account-section">
                <div className="account-section-inner">
                  <AccountHeader />
                </div>
            </div>
        </div>
    );
}

export default HeaderPage;
