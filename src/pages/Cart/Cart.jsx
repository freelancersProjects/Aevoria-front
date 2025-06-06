import React, { useState } from 'react';
import { FaMinus, FaPlus, FaCopy, FaTrash } from 'react-icons/fa';
import HR from '../../components/AEV/AEV.HR/HR';
import './Cart.scss';
import HeaderSectionImage from '../../components/Layout/HeaderSectionImage/HeaderSectionImage';

const Cart = () => {
    const [cartItems] = useState([
        {
            id: 1,
            title: "The Witcher 3: Wild Hunt",
            edition: "Standard Edition",
            price: 29.99,
            image: "/images/games/witcher3.jpg",
            quantity: 1
        },
        {
            id: 2,
            title: "Cyberpunk 2077",
            edition: "Deluxe Edition",
            price: 59.99,
            image: "/images/games/cyberpunk.jpg",
            quantity: 1
        },
        {
            id: 3,
            title: "Red Dead Redemption 2",
            edition: "Ultimate Edition",
            price: 59.99,
            image: "/images/games/rdr2.jpg",
            quantity: 1
        },
        {
            id: 4,
            title: "Assassin's Creed Valhalla",
            edition: "Gold Edition",
            price: 49.99,
            image: "/images/games/valhalla.jpg",
            quantity: 1
        },
        {
            id: 5,
            title: "FIFA 23",
            edition: "Champions Edition",
            price: 59.99,
            image: "/images/games/fifa23.jpg",
            quantity: 1
        }
    ]);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [promoCode, setPromoCode] = useState('');

    return (
        <div className="cart-page">
            <HeaderSectionImage title="Cart"/>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="item-details">
                                <div className="item-info">
                                    <div className="item-header">
                                        <h3>{item.title}</h3>
                                        <span className="price">${item.price}</span>
                                    </div>
                                    <span className="edition">{item.edition}</span>
                                    <div className="item-controls">
                                        <div className="quantity-controls">
                                            <button className="quantity-btn">
                                                <FaMinus />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button className="quantity-btn">
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button className="delete-btn">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Estimated tax</span>
                            <span>$0.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="checkout-btn">Check out</button>
                    <button className="proceed-btn">Proceed to Checkout</button>
                    <p className="payment-info">Or pay using PayPal</p>

                    <HR />

                    <div className="promo-code">
                        <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="apply-btn">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
