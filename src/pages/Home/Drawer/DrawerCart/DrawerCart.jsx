import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartOutlined } from '@mui/icons-material';
import Button from '../../../../components/AEV/AEV.Button/Button';
import Drawer from '../../../../components/AEV/AEV.Drawer/Drawer';
import QuantitySelector from '../../../../components/AEV/AEV.QuantitySelector/QuantitySelector';
import HR from '../../../../components/AEV/AEV.HR/HR';
import CorbeilleButton from '../../../../components/Icon/CorbeilleButton';
import apiService from '../../../../services/apiService';
import DefaultImage from '../../../../assets/images/photo-test.webp';
import './DrawerCart.scss';

const DrawerCart = ({ isOpen, onClose, userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) return;

        const cart = await apiService.get(`/cart/${userId}`);
        const items = cart?.items?.$values || [];

        const enrichedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const game = await apiService.get(`/games/${item.gameId}`);
              return { ...item, game };
            } catch (err) {
              console.error('Erreur chargement jeu:', item.gameId, err);
              return { ...item, game: null };
            }
          }),
        );

        setCartItems(enrichedItems);
      } catch (e) {
        console.error('Erreur chargement panier:', e);
      } finally {
        // ...existing code...
      }
    };

    if (isOpen) fetchCart();
  }, [isOpen, userId]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const updatedItems = cartItems.map(item =>
        item.cartItemId === itemId ? { ...item, quantity: newQuantity } : item,
      );
      setCartItems(updatedItems);

      // MAJ API via query string (ex: /cart/items/{id}?quantity=4)
      await apiService.putQuery(`/cart/items/${itemId}?quantity=${newQuantity}`);
    } catch (e) {
      console.error('Erreur mise à jour quantité:', e);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await apiService.delete(`/cart/items/${itemId}`);
      setCartItems(prev => prev.filter(item => item.cartItemId !== itemId));
    } catch (e) {
      console.error('Erreur suppression:', e);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * (item.game?.discount || 0), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      title="Votre Panier"
      subtitle={`${cartItems.length} article${cartItems.length > 1 ? 's' : ''}`}
    >
      <div className="drawer-cart">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCartOutlined className="empty-cart-icon" />
            <h3>Votre panier est vide</h3>
            <p>Ajoutez des articles à votre panier pour les voir ici</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.game?.thumbnailUrl || DefaultImage}
                      alt={item.game?.title || 'Jeu'}
                    />
                    <div className="platform-badge">{item.game?.platform || 'PC'}</div>
                  </div>
                  <div className="item-content">
                    <div className="item-details">
                      <h4>{item.game?.title || 'Jeu inconnu'}</h4>
                      <div className="item-price-quantity">
                        <div className="item-price">
                          {(item.game?.discount || 0).toFixed(2)} €
                        </div>
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(value) => handleQuantityChange(item.cartItemId, value)}
                          min={1}
                          max={10}
                        />
                      </div>
                    </div>
                    <div className="item-total">
                      <span>Total</span>
                      <span className="total-price">
                        {(item.quantity * (item.game?.discount || 0)).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.cartItemId)}
                  >
                    <CorbeilleButton />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <HR variant="dashed" />
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="summary-row">
                <span>TVA (20%)</span>
                <span>{vat.toFixed(2)} €</span>
              </div>
              <HR />
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <div className="cart-actions">
              <Button variant="outline" text="Voir le panier" onClick={() => window.location.href = '/cart'} />
              <Button variant="primary" text="Payer maintenant" onClick={() => window.location.href = '/checkout'} />
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
  userId: PropTypes.string,
};

export default DrawerCart;
