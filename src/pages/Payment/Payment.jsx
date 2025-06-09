import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCardOutline, IoTimeOutline, IoLockClosedOutline, IoChevronForward } from 'react-icons/io5';
import BackButton from '../../components/AEV/AEV.BackButton/BackButton';
import './Payment.scss';

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Exemple de données de commande (à remplacer par les vraies données)
  const orderSummary = {
    items: [
      { id: 1, name: "Abonnement Premium", price: 29.99 },
      { id: 2, name: "Bonus Pack", price: 9.99 }
    ],
    subtotal: 39.98,
    tax: 7.99,
    total: 47.97
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Ici, intégrer la logique Stripe
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <BackButton />
        <div className="secure-badge">
          <IoLockClosedOutline />
          <span>Paiement sécurisé</span>
        </div>
      </div>

      <div className="payment-content">
        <div className="payment-form-container">
          <h1>Paiement</h1>
          <p className="subtitle">Entrez vos informations de paiement</p>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group card-number">
              <label>
                <IoCardOutline />
                Numéro de carte
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group expiry">
                <label>
                  <IoTimeOutline />
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group cvv">
                <label>
                  <IoLockClosedOutline />
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Nom sur la carte</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="JOHN DOE"
                required
              />
            </div>

            <button
              type="submit"
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Traitement en cours...
                </>
              ) : (
                <>
                  Payer {orderSummary.total.toFixed(2)}€
                  <IoChevronForward />
                </>
              )}
            </button>
          </form>

          <div className="payment-security">
            <div className="security-item">
              <IoLockClosedOutline />
              <span>Paiement crypté et sécurisé</span>
            </div>
            <img
              src="/assets/images/payment/stripe-badge.png"
              alt="Powered by Stripe"
              className="stripe-badge"
            />
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <h2>Résumé de la commande</h2>
          </div>

          <div className="summary-items">
            {orderSummary.items.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price.toFixed(2)}€</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="subtotal">
              <span>Sous-total</span>
              <span>{orderSummary.subtotal.toFixed(2)}€</span>
            </div>
            <div className="tax">
              <span>TVA</span>
              <span>{orderSummary.tax.toFixed(2)}€</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>{orderSummary.total.toFixed(2)}€</span>
            </div>
          </div>

          <div className="accepted-payments">
            <span>Nous acceptons</span>
            <div className="payment-methods">
              <img src="/assets/images/payment/visa.png" alt="Visa" />
              <img src="/assets/images/payment/mastercard.png" alt="Mastercard" />
              <img src="/assets/images/payment/amex.png" alt="American Express" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
