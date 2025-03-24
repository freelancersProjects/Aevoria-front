import React from 'react'

const AccountHeader = ({ profile }) => {
  return (
        <div className="account-history">
      <div className="menu-items">
        <div className="menu-item">Profile</div>
        <div className="menu-item">Settings</div>
      </div>
    </div>
  );
};

export default AccountHeader;
