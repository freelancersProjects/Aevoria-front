
import PropTypes from 'prop-types';
import './CardCart.scss';

const CardCart = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details-container">
        <div className="cart-item-details">
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-edition">{item.edition}</p>
          <span className="cart-item-price">${item.price.toFixed(2)}</span>
        </div>

        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button className="quantity-btn">-</button>
            <span className="quantity-value">{item.quantity}</span>
            <button className="quantity-btn">+</button>
          </div>
          <button className="delete-btn">🗑</button>
        </div>
      </div>
    </div>
  );
};

CardCart.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    edition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardCart;
