import React, { useEffect, useState } from 'react';
import HR from '../../components/AEV/AEV.HR/HR';
import HeaderSectionImage from '../../components/Layout/HeaderSectionImage/HeaderSectionImage';
import apiService from '../../services/apiService';
import useAuth from '../../hooks/useAuth';
import QuantitySelector from '../../components/AEV/AEV.QuantitySelector/QuantitySelector';
import CorbeilleButton from '../../components/Icon/CorbeilleButton';
import DefaultImage from '../../assets/images/photo-test.webp';
import './Cart.scss';

const Cart = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!user?.userId) return;

                const cart = await apiService.get(`/cart/${user.userId}`);
                const items = cart?.items?.$values || [];

                const enrichedItems = await Promise.all(
                    items.map(async (item) => {
                        try {
                            const game = await apiService.get(`/games/${item.gameId}`);
                            return {
                                ...item,
                                game: game,
                                title: game?.title || "Jeu inconnu",
                                price: game?.discount || game?.price || 0,
                                image: game?.thumbnailUrl || DefaultImage,
                                platform: game?.platform || "PC"
                            };
                        } catch (err) {
                            console.error("Erreur chargement jeu:", item.gameId, err);
                            return {
                                ...item,
                                game: null,
                                title: "Jeu inconnu",
                                price: 0,
                                image: DefaultImage,
                                platform: "PC"
                            };
                        }
                    })
                );

                setCartItems(enrichedItems);
            } catch (err) {
                console.error("Erreur récupération panier :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]);

    const handleQuantityChange = async (itemId, value) => {
        try {
            const updated = cartItems.map(item =>
                item.cartItemId === itemId ? { ...item, quantity: value } : item
            );
            setCartItems(updated);

            await apiService.putQuery(`/cart/items/${itemId}?quantity=${value}`);
        } catch (err) {
            console.error("Erreur mise à jour quantité :", err);
        }
    };

    const handleRemove = async (itemId) => {
        try {
            await apiService.delete(`/cart/items/${itemId}`);
            setCartItems(prev => prev.filter(item => item.cartItemId !== itemId));
        } catch (err) {
            console.error("Erreur suppression item :", err);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * 0.2;
    const total = subtotal + vat;

    return (
        <div className="cart-page">
            <HeaderSectionImage title="Mon Panier" />

            <div className="cart-content">
                <div className="cart-items">
                    {loading ? (
                        <p>Chargement...</p>
                    ) : cartItems.length === 0 ? (
                        <p className="empty-cart">Votre panier est vide.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartItemId} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.title} />
                                    <div className="platform-badge">{item.platform}</div>
                                </div>
                                <div className="item-details">
                                    <div className="item-info">
                                        <div className="item-header">
                                            <h3>{item.title}</h3>
                                            <span className="price">{item.price.toFixed(2)} €</span>
                                        </div>
                                        <div className="item-controls">
                                            <QuantitySelector
                                                value={item.quantity}
                                                onChange={(val) => handleQuantityChange(item.cartItemId, val)}
                                                min={1}
                                                max={10}
                                            />
                                            <CorbeilleButton onClick={() => handleRemove(item.cartItemId)} />
                                        </div>
                                        <div className="item-total">
                                            <span>Total</span>
                                            <span className="total-price">
                                                {(item.quantity * item.price).toFixed(2)} €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="order-summary">
                        <h2>Résumé de la commande</h2>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Sous-total</span>
                                <span>{subtotal.toFixed(2)} €</span>
                            </div>
                            <div className="summary-row">
                                <span>TVA (20%)</span>
                                <span>{vat.toFixed(2)} €</span>
                            </div>
                            <HR variant="dashed" />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                        </div>

                        <button className="checkout-btn">Paiement</button>
                        <button className="proceed-btn">Continuer</button>
                        <p className="payment-info">Ou payez avec PayPal</p>

                        <HR />

                        <div className="promo-code">
                            <input
                                type="text"
                                placeholder="Code promo"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button className="apply-btn">Appliquer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
