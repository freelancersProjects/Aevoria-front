
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import './BackButton.scss';

const BackButton = ({ label = 'Retour', customAction, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (customAction) {
      customAction();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      className={`aev-back-button ${className}`}
      onClick={handleClick}
      aria-label={label}
    >
      <div className="button-content">
        <div className="icon-container">
          <IoChevronBack className="icon" />
          <div className="icon-glow"></div>
        </div>
        <span className="label">{label}</span>
      </div>
      <div className="button-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </button>
  );
};

export default BackButton;
