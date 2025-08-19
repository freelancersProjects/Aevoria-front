import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../../components/AEV/AEV.StepProgress/StepProgress';
import './Payment.scss';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardFields, setCardFields] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: false,
  });

  // Exemple de données de commande (à remplacer par les vraies données)
  const orderSummary = {
    items: [
      { id: 1, name: 'Pro Cycling Manager 25(PC) - Europe, U', price: 27.49, platform: 'Steam', quantity: 2 },
    ],
    subtotal: 27.49,
    tax: 0,
    total: 27.49,
  };

  const paymentMethods = [
    {
      id: 'revolut',
      name: 'Revolut Pay',
      icon: '/assets/images/payment/revolut.png',
    },
    {
      id: 'card',
      name: 'Carte',
      icon: '/assets/images/payment/card.png',
      form: (
        <div className="card-form">
          <div className="form-group">
            <label>Numéro de la carte</label>
            <input
              type="text"
              value={cardFields.number}
              onChange={(e) => handleCardFieldChange('number', e.target.value)}
              placeholder="**** **** **** ****"
              maxLength="19"
            />
          </div>
          <div className="form-group">
            <label>Titulaire de la carte</label>
            <input
              type="text"
              value={cardFields.name}
              onChange={(e) => handleCardFieldChange('name', e.target.value)}
              placeholder="J. Smith"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date d'expiration</label>
              <input
                type="text"
                value={cardFields.expiry}
                onChange={(e) => handleCardFieldChange('expiry', e.target.value)}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>Cryptogramme</label>
              <input
                type="text"
                value={cardFields.cvv}
                onChange={(e) => handleCardFieldChange('cvv', e.target.value)}
                placeholder="CVC"
                maxLength="3"
              />
            </div>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={cardFields.saveCard}
                onChange={(e) => handleCardFieldChange('saveCard', e.target.checked)}
              />
              <span>Enregistrer la carte pour les prochains achats</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: 'paypal',
      name: 'Paypal',
      icon: '/assets/images/payment/paypal.png',
      fee: '+1.15 €',
    },
    {
      id: 'paysafecard',
      name: 'paysafecard',
      icon: '/assets/images/payment/paysafecard.png',
      fee: '+4.95 €',
    },
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedMethod(methodId === selectedMethod ? null : methodId);
  };

  const handleCardFieldChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19);
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setCardFields(prev => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ici, intégrer la logique de paiement
    navigate('/payment-success');
  };

  return (
    <div className="payment-container">
      <div className="step-container">
        <StepProgress
          steps={['Panier', 'Paiement', 'Activation du jeu']}
          currentStep={1}
        />
      </div>

      <div className="payment-content">
        <div className="payment-left">
          <div className="billing-address">
            <h2>Adresse de facturation</h2>
            <div className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input type="text" value="Mathis" disabled />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" value="Boulais" disabled />
                </div>
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input type="text" value="7 Voie Mehul" disabled />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Pays</label>
                  <select disabled>
                    <option>Suisse</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input type="text" placeholder="Code postal" disabled />
                </div>
              </div>
              <button className="edit-address">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Modifier
              </button>
            </div>
          </div>

          <div className="payment-methods">
            <h2>Méthodes de paiement</h2>
            <div className="methods-list">
              {paymentMethods.map((method) => (
                <div key={method.id} className="method-wrapper">
                  <button
                    className={`method-button ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <img src={method.icon} alt={method.name} />
                    <span className="method-name">{method.name}</span>
                    {method.fee && <span className="method-fee">{method.fee}</span>}
                  </button>
                  {selectedMethod === method.id && method.form}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <h2>Résumé</h2>
            <div className="summary-items">
              {orderSummary.items.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-platform">{item.platform}</div>
                  </div>
                  <div className="item-quantity">×{item.quantity}</div>
                  <div className="item-price">{item.price.toFixed(2)} €</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>TVA (0%) :</span>
                <span>{orderSummary.tax.toFixed(2)} €</span>
              </div>
              <div className="total-row final">
                <span>Total</span>
                <span>{orderSummary.total.toFixed(2)} €</span>
              </div>
            </div>

            <div className="gift-info">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
              <span>Créé un bon cadeau après validation de l'achat.</span>
            </div>

            <div className="terms-agreement">
              En cliquant sur "Payer", je reconnais avoir lu et accepté les
              <a href="/terms">termes et conditions</a>, et la
              <a href="/privacy">politique de confidentialité</a>.
            </div>

            <button
              className="pay-button"
              onClick={handleSubmit}
              disabled={!selectedMethod}
            >
              Payer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
