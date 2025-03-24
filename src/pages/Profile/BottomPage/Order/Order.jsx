import React from 'react';
import './Order.scss';

const Order = ({ profile }) => {
  return (
    <div className="order-container">
      <h2 className="section-title">Bookings & Orders</h2>
      <div className="order-stats">
        <div className="order-card">
          <div className="order-icon">
            <i className="icon-booking"></i>
          </div>
          <div className="order-name">Bookings</div>
          <div className="order-info">Level {profile.bookings.level}</div>
          <div className="order-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${profile.bookings.completed}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="order-card">
          <div className="order-icon">
            <i className="icon-wallet"></i>
          </div>
          <div className="order-name">Total spent</div>
          <div className="order-value">{profile.totalSpent}</div>
        </div>
      </div>
    </div>
  );
};

export default Order;
