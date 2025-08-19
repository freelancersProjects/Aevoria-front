
import './SubscribeCard.scss';

const SubscribeCard = () => {
  return (
    <div className="subscribe-wrapper">
      <div className="subscribe-cards font-montserrat">
        {/* Free Plan */}
        <div className="subscribe-card free">
          <h3 className="plan-title">Free Plan</h3>
          <p className="price">$0</p>
          <p className="plan-sub">Casual Gamers</p>

          <button className="subscribe-btn">Sign Up</button>
          <hr className="separator" />

          <ul className="features">
            <li>✔ Access to free games</li>
            <li>✔ Community forums</li>
            <li>✔ Game demos</li>
            <li>✔ Limited support</li>
            <li>✔ Weekly newsletters</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="subscribe-card premium">
          <h3 className="plan-title blue">Premium Plan</h3>
          <p className="price blue">
                        $9.99 <span className="monthly">Monthly</span>
          </p>
          <p className="plan-sub">Dedicated Gamers</p>

          <button className="subscribe-btn primary">Start with Plus</button>
          <hr className="separator" />

          <ul className="features">
            <li>✔ Access to all games</li>
            <li>✔ Exclusive content</li>
            <li>✔ Priority support</li>
            <li>✔ Early access to new releases</li>
            <li>✔ Monthly giveaways</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
