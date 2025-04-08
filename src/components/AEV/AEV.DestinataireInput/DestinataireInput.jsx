import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DestinataireInput.scss';
import { MdExpandMore } from 'react-icons/md';

const suggestions = [
    'support@aevoria.com',
    'admin@aevoria.com',
    'contact@aevoria.com',
    'ami@aevoria.com',
];

const DestinataireInput = ({ recipients = [], onChange }) => {
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAdd = (email) => {
        if (!email || recipients.includes(email)) return;
        onChange([...recipients, email]);
        setInput('');
        setShowDropdown(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            handleAdd(input.trim());
        }
    };

    const removeRecipient = (email) => {
        onChange(recipients.filter(r => r !== email));
    };

    return (
        <div className="aev-destinataire-input">
            <label className="label">Destinataires *</label>

            <div className="input-bar">
                {recipients.map((r, i) => (
                    <span className="chip" key={i}>
                        {r}
                        <span className="remove" onClick={() => removeRecipient(r)}>×</span>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setShowDropdown(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Saisir une adresse..."
                />
                <MdExpandMore className="dropdown-icon" />
            </div>

            <div className="underline" />

            {showDropdown && input.length > 0 && (
                <div className="dropdown-panel">
                    {suggestions
                        .filter(email => email.includes(input) && !recipients.includes(email))
                        .map((email, i) => (
                            <div key={i} className="dropdown-item" onClick={() => handleAdd(email)}>
                                {email}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

DestinataireInput.propTypes = {
    recipients: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DestinataireInput;
