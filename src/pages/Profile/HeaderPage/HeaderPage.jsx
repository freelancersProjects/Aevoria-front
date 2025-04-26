import React from 'react';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import AccountHeader from './AccountHeader/AccountHeader';
import './HeaderPage.scss';

const HeaderPage = () => {
    return (
        <>
        <div className="d-flex">
            <WishlistHeader/>
            <AccountHeader/>
            </div>
        </>
    );
}

export default HeaderPage;