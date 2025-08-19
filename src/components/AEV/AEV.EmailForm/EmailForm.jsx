
import Link from '../AEV.Link/Link';
import './EmailForm.scss';
import PropTypes from 'prop-types';
import DestinataireInput from '../AEV.DestinataireInput/DestinataireInput';
import Button from '../AEV.Button/Button';
import Toast from '../AEV.Toast/Toast';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import FolderIcon from '@mui/icons-material/Folder';

const EmailForm = ({
  recipients,
  setRecipients,
  subject,
  setSubject,
  message,
  setMessage,
  file,
  setFile,
  toast,
  setToast,
}) => {

  const handleSend = () => {
    if (!recipients?.length || !subject || !message) {
      setToast({ type: 'error', message: 'Veuillez remplir tous les champs.' });
      return;
    }

    setToast({ type: 'success', message: 'Message envoyé avec succès !' });
    setRecipients([]);
    setSubject('');
    setMessage('');
    setFile(null);
  };

  return (
    <div className="aev-emailform mb-3">
      {toast && <Toast message={toast.message} type={toast.type} duration={3000} onClose={() => setToast(null)} />}
      <h3 className="form-title">Envoyer un message</h3>

      <DestinataireInput recipients={recipients} onChange={setRecipients} />

      <div className="input-block">
        <label htmlFor="subject">Objet *</label>
        <input
          id="subject"
          type="text"
          placeholder="Sujet du message"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div className="underline" />
      </div>

      <div className="input-block">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          placeholder="Votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="underline" />
      </div>

      <div className="emailform-footer">
        <label className="upload-btn">
          <FaPaperclip />
          <span>Ajouter une pièce jointe</span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="*"
          />
        </label>

        <Button
          text="Envoyer"
          icon={<FaPaperPlane />}
          onClick={handleSend}
          isDisabled={!recipients.length || !subject || !message}
        />
      </div>

      {file && (
        <div className="attached-file">
          <FolderIcon className="attached-file-icon" />
          <span>
                        Pièce jointe :{' '}
            <Link
              href={URL.createObjectURL(file)}
              label={file.name}
              info="Télécharger le fichier"
              target="_blank"
              hoverInfo={true}
            />
          </span>
        </div>
      )}
    </div>
  );
};
EmailForm.propTypes = {
  recipients: PropTypes.array.isRequired,
  setRecipients: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
  setSubject: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  toast: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  setToast: PropTypes.func.isRequired,
};

export default EmailForm;
