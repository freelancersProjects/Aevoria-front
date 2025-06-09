import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartOutlined } from '@mui/icons-material';
import Button from '../../../../components/AEV/AEV.Button/Button';
import Drawer from '../../../../components/AEV/AEV.Drawer/Drawer';
import QuantitySelector from '../../../../components/AEV/AEV.QuantitySelector/QuantitySelector';
import HR from '../../../../components/AEV/AEV.HR/HR';
import Corbeille from '../../../../assets/svg/corbeille.svg';
import './DrawerCart.scss';

const DrawerCart = ({ isOpen, onClose, cartItems = [], totalPrice = 0 }) => {
    const mockItems = [
        {
            id: '1',
            name: 'Cyberpunk 2077',
            image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giJ7l4hkRwi.png',
            platform: 'PC - Steam',
            price: 59.99,
            quantity: 1
        },
        {
            id: '2',
            name: 'The Legend of Zelda: Tears of the Kingdom',
            image: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/276a412988e07c4d55a2996c6d38abb408b464413b2dfeb44d2aa460b9f622e1',
            platform: 'Nintendo Switch',
            price: 69.99,
            quantity: 2
        },
        {
            id: '3',
            name: 'God of War Ragnarök',
            image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
            platform: 'PlayStation 5',
            price: 79.99,
            quantity: 1
        }
    ];

    const handleQuantityChange = (itemId, newQuantity) => {
        console.log(`Quantity changed for item ${itemId} to ${newQuantity}`);
        // Implement quantity change logic here
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            position="right"
            title="Votre Panier"
            subtitle={`${mockItems.length} article${mockItems.length > 1 ? 's' : ''}`}
        >
            <div className="drawer-cart">
                {mockItems.length === 0 ? (
                    <div className="empty-cart">
                        <ShoppingCartOutlined className="empty-cart-icon" />
                        <h3>Votre panier est vide</h3>
                        <p>Ajoutez des articles à votre panier pour les voir ici</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {mockItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                        <div className="platform-badge">{item.platform}</div>
                                    </div>
                                    <div className="item-content">
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <div className="item-price-quantity">
                                                <div className="item-price">{item.price.toFixed(2)} €</div>
                                                <QuantitySelector
                                                    value={item.quantity}
                                                    onChange={(value) => handleQuantityChange(item.id, value)}
                                                    min={1}
                                                    max={10}
                                                />
                                            </div>
                                        </div>
                                        <div className="item-total">
                                            <span>Total</span>
                                            <span className="total-price">
                                                {(item.price * item.quantity).toFixed(2)} €
                                            </span>
                                        </div>
                                    </div>
                                    <button className="remove-item" onClick={() => console.log('Remove item', item.id)}>
                                        <img src={Corbeille} alt="Supprimer" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <HR variant="dashed" />
                            <div className="summary-row">
                                <span>Sous-total</span>
                                <span>{mockItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} €</span>
                            </div>
                            <div className="summary-row">
                                <span>TVA (20%)</span>
                                <span>{(mockItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.2).toFixed(2)} €</span>
                            </div>
                            <HR />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{(mockItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.2).toFixed(2)} €</span>
                            </div>
                        </div>

                        <div className="cart-actions">
                            <Button variant="outline" text="Voir le panier" onClick={() => window.location.href = '/cart'} />
                            <Button variant="primary" text="Payer maintenant" onClick={() => window.location.href = '/checkout'}/>
                        </div>
                    </>
                )}
            </div>
        </Drawer>
    );
};

DrawerCart.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            image: PropTypes.string,
            platform: PropTypes.string,
            price: PropTypes.number,
            quantity: PropTypes.number,
            onRemove: PropTypes.func
        })
    ),
    totalPrice: PropTypes.number
};

export default DrawerCart;
