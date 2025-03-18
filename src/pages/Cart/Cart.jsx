import React from 'react';
import HeaderSectionImage from '../../components/Layout/HeaderSectionImage/HeaderSectionImage';
import CardCart from './CardCart/CardCart';
import './Cart.scss';
import PropTypes from 'prop-types';

const sampleCartItems = [
    {
        id: 1,
        image: "https://cdn.discordapp.com/attachments/1275483221458681906/1351600829349494875/image.png?ex=67daf7dd&is=67d9a65d&hm=e84a281537474d0982c29790bafd6ea7cd06c6e645dcdc629042bf3c0379f721&",
        title: "The Witcher 3: Wild Hunt",
        edition: "Standard Edition",
        price: 19.99,
        quantity: 1,
    },
    {
        id: 2,
        image: "https://cdn.discordapp.com/attachments/1275483221458681906/1351600829349494875/image.png?ex=67daf7dd&is=67d9a65d&hm=e84a281537474d0982c29790bafd6ea7cd06c6e645dcdc629042bf3c0379f721&",
        title: "Cyberpunk 2077",
        edition: "Standard Edition",
        price: 59.99,
        quantity: 1,
    },
    {
        id: 3,
        image: "https://cdn.discordapp.com/attachments/1275483221458681906/1351600829349494875/image.png?ex=67daf7dd&is=67d9a65d&hm=e84a281537474d0982c29790bafd6ea7cd06c6e645dcdc629042bf3c0379f721&",
        title: "The Witcher 3: Wild Hunt",
        edition: "Standard Edition",
        price: 19.99,
        quantity: 1,
    },
    {
        id: 4,
        image: "https://cdn.discordapp.com/attachments/1275483221458681906/1351600829349494875/image.png?ex=67daf7dd&is=67d9a65d&hm=e84a281537474d0982c29790bafd6ea7cd06c6e645dcdc629042bf3c0379f721&",
        title: "Cyberpunk 2077",
        edition: "Standard Edition",
        price: 59.99,
        quantity: 1,
    },
];

const Cart = ({ cartItems = sampleCartItems }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const estimatedTax = 0.0;
    const total = subtotal + estimatedTax;

    return (
        <>
            <HeaderSectionImage title="Checkout" />

            <div className="cart-container">
                <div className="cart-content">
                    {/* Liste des articles */}
                    <div className="cart-items">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => <CardCart key={item.id} item={item} />)
                        ) : (
                            <p className="empty-cart">Votre panier est vide.</p>
                        )}
                    </div>

                    {/* Order Summary à droite */}
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Estimated tax</span>
                                <span>${estimatedTax.toFixed(2)}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="checkout-btn">Check out</button>
                        <button className="paypal-btn">Proceed to Checkout</button>

                        <div className="promo-section">
                            <input type="text" placeholder="Enter promo code" />
                            <button className="apply-btn">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Cart.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Cart;
