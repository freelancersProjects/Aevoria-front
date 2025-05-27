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

const DestinataireInput = ({ recipients = [], onChange, options = [] }) => {
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAdd = (user) => {
        if (!user || recipients.find(r => r.userId === user.userId)) return;
        onChange([...recipients, user]);
        setInput('');
        setShowDropdown(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const removeRecipient = (userId) => {
        onChange(recipients.filter(r => r.userId !== userId));
    };

    const filteredOptions = options.filter(user =>
        (user.fullName?.toLowerCase().includes(input.toLowerCase()) ||
         user.username?.toLowerCase().includes(input.toLowerCase())) &&
        !recipients.find(r => r.userId === user.userId)
    );

    return (
        <div className="aev-destinataire-input">
            <label className="label">Destinataires *</label>
            <div className="input-bar">
                {recipients.map((r, i) => (
                    <span className="chip" key={i}>
                        {r.fullName || r.username}
                        <span className="remove" onClick={() => removeRecipient(r.userId)}>×</span>
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
                    placeholder="Saisir un nom ou pseudo..."
                />
                <MdExpandMore className="dropdown-icon" />
            </div>
            <div className="underline" />

            {showDropdown && input.length > 0 && (
                <div className="dropdown-panel">
                    {filteredOptions.map((user, i) => (
                        <div key={i} className="dropdown-item" onClick={() => handleAdd(user)}>
                            <img src={user.profile_picture || 'https://via.placeholder.com/30'} alt="" />
                            <span>{user.fullName || user.username}</span>
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
    options: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        profile_picture: PropTypes.string
    })).isRequired
};


export default DestinataireInput;
