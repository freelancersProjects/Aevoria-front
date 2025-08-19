
import PropTypes from 'prop-types';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import './Popup.scss';

const Popup = ({
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Supprimer',
  cancelLabel = 'Annuler',
}) => {
  return (
    <div className="aev-popup-overlay">
      <div className="aev-popup-v2">
        <div className="popup-icon">
          <ReportGmailerrorredIcon fontSize="inherit" />
        </div>
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="confirm" onClick={onConfirm}>{confirmLabel}</button>
          <button className="cancel" onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default Popup;
