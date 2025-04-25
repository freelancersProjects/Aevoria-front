import React from 'react';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import AccountHeader from './AccountHeader/AccountHeader';
import './HeaderPage.scss';

const HeaderPage = () => {
    return (
        <>
            <WishlistHeader/>
            <AccountHeader/>
        </>
    );
}

export default HeaderPage;