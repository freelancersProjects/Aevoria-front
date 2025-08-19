import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CountdownTimer.scss';

const CountdownTimer = ({ targetDate, label = 'Time Left', onComplete }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (Object.values(newTime).every(v => v === 0)) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="aev-timer">
      <div className="timer-label font-montserrat">{label}</div>
      <div className="timer-blocks">
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div key={unit} className="timer-box">
            <div className="timer-value">
              {String(timeLeft[unit]).padStart(2, '0')}
            </div>
            <div className="timer-unit">{unit.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
  label: PropTypes.string,
  onComplete: PropTypes.func,
};

export default CountdownTimer;
