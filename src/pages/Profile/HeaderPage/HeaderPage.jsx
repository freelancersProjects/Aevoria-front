import React from 'react';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import AccountHeader from './AccountHeader/AccountHeader';
import './HeaderPage.scss';

const HeaderPage = () => {
    return (
        <div className="header-layout">
            <div className="wishlist-section">
                <WishlistHeader/>
            </div>
            <div className="account-section">
                  <div className="account-section-inner">
                <AccountHeader/>
                </div>
            </div>
        </div>
    );
}

export default HeaderPage;