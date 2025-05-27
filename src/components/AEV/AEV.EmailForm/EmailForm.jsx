import React from "react";
import PropTypes from "prop-types";
import "./EmailForm.scss";
import DestinataireInput from "../AEV.DestinataireInput/DestinataireInput";
import Button from "../AEV.Button/Button";
import Toast from "../AEV.Toast/Toast";
import { FaPaperPlane } from "react-icons/fa";
import apiService from "../../../services/apiService";

const EmailForm = ({
  recipients,
  setRecipients,
  subject,
  setSubject,
  message,
  setMessage,
  toast,
  setToast,
  friendOptions,
  senderId
}) => {
  const handleSend = async () => {
    if (!recipients?.length || !subject || !message) {
      setToast({ type: "error", message: "Veuillez remplir tous les champs." });
      return;
    }

    try {
      const matchingUsers = friendOptions.filter(friend =>
        recipients.includes(friend.email) || recipients.includes(friend.username)
      );

      const sendPromises = matchingUsers.map(friend =>
        apiService.post("/notifications", {
          userId: friend.userId,
          subject,
          message,
          notificationType: "Ami",
          senderId // optional if your backend expects it
        })
      );

      await Promise.all(sendPromises);

      setToast({ type: "success", message: "Notification envoyée !" });
      setRecipients([]);
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Erreur d’envoi :", error);
      setToast({ type: "error", message: "Erreur lors de l’envoi de la notification." });
    }
  };

  return (
    <div className="aev-emailform mb-3">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <h3 className="form-title">Envoyer une notification</h3>

      <DestinataireInput
        recipients={recipients}
        onChange={setRecipients}
        options={friendOptions}
      />

      <div className="input-block">
        <label htmlFor="subject">Objet *</label>
        <input
          id="subject"
          type="text"
          placeholder="Sujet de la notification"
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
        <Button
          text="Envoyer"
          icon={<FaPaperPlane />}
          onClick={handleSend}
          isDisabled={!recipients.length || !subject || !message}
        />
      </div>
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
  toast: PropTypes.object,
  setToast: PropTypes.func.isRequired,
  friendOptions: PropTypes.array.isRequired,
  senderId: PropTypes.string, // pour tracking ou sécurité
};

export default EmailForm;
