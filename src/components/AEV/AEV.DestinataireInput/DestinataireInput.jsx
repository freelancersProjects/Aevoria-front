import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DestinataireInput.scss';
import { MdExpandMore } from 'react-icons/md';
import apiService from '../../../services/apiService'; // adapte le chemin si nécessaire
import useAuth from '../../../hooks/useAuth'; // adapte le chemin aussi

const DestinataireInput = ({ recipients = [], onChange }) => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user?.userId) return;
      try {
        const response = await apiService.get(`/friends/${user.userId}`);
        const valid = response?.$values?.filter(f => f.status === 'Accepted') || [];

        const enriched = await Promise.all(valid.map(async (f) => {
          const friendId = f.userId === user.userId ? f.friendId : f.userId;
          const friendData = await apiService.get(`/users/${friendId}`);
          return {
            id: friendData.userId,
            email: friendData.email,
            username: friendData.username,
            display: `${friendData.first_name || ''} ${friendData.last_name || ''}`.trim(),
          };
        }));

        setFriends(enriched);
      } catch {
      // Error handling
      }
    };

    fetchFriends();
  }, [user]);

  const handleAdd = (value) => {
    if (!value || recipients.includes(value)) return;
    onChange([...recipients, value]);
    setInput('');
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      handleAdd(input.trim());
    }
  };

  const removeRecipient = (value) => {
    onChange(recipients.filter(r => r !== value));
  };

  const filteredSuggestions = friends.filter(f =>
    (f.email && f.email.includes(input)) ||
        (f.username && f.username.includes(input)),
  );

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
          placeholder="Rechercher par email ou pseudo..."
        />
        <MdExpandMore className="dropdown-icon" />
      </div>

      <div className="underline" />

      {showDropdown && input.length > 0 && (
        <div className="dropdown-panel">
          {filteredSuggestions.map((friend, i) => (
            <div
              key={i}
              className="dropdown-item"
              onClick={() => handleAdd(friend.email || friend.username)}
            >
              <strong>{friend.display || friend.username}</strong>
              <div className="small">@{friend.username} – {friend.email}</div>
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
