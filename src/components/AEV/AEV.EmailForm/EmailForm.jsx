import React, { useState } from 'react';
import Link from '../AEV.Link/Link';
import './EmailForm.scss';
import DestinataireInput from '../AEV.DestinataireInput/DestinataireInput';
import Button from '../AEV.Button/Button';
import Toast from '../AEV.Toast/Toast';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

const EmailForm = () => {
    const [recipients, setRecipients] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [toast, setToast] = useState(null);

    const handleSend = () => {
        if (!recipients.length || !subject || !message) {
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
            {toast && <Toast message={toast.message} type={toast.type} duration={3000} />}
            <h3 className="form-title">Envoyer un message</h3>

            <DestinataireInput recipients={recipients} onChange={setRecipients} />

            <div className="input-block">
                <label>Objet *</label>
                <input
                    type="text"
                    placeholder="Sujet du message"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <div className="underline" />
            </div>

            <div className="input-block textarea-zone">
                <label>Message *</label>
                <textarea
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
                    disabled={!recipients.length || !subject || !message}
                />
            </div>

            {file && (
                <div className="attached-file">
                    📎 Pièce jointe :{" "}
                    <Link
                        href={URL.createObjectURL(file)}
                        label={file.name}
                        info="Télécharger le fichier"
                        target="_blank"
                        hoverInfo={true}
                    />
                </div>
            )}
        </div>
    );
};

export default EmailForm;
