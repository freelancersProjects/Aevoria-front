import React, { useState } from 'react';
import './MessagePage.scss';
import avatar from '../../assets/images/avatar.png';

const contacts = [
  { id: 1, name: 'Christina', status: 'En ligne', avatar },
  { id: 2, name: 'Ivan', status: 'Occupé', avatar },
  { id: 3, name: 'Gloria', status: 'Absent', avatar },
];

const messages = [
  { from: 'friend', text: 'Salut ! Tu vas bien ?' },
  { from: 'me', text: 'Tranquille et toi ? On joue ce soir ?' },
  { from: 'friend', type: 'image', src: 'https://via.placeholder.com/200x120', alt: 'media' },
  { from: 'me', text: 'Grave, j’ai réservé 21h 🔥' },
];

function MessagePage() {
  const [input, setInput] = useState('');

  return (
    <div className="messenger-container">
      <aside className="sidebar">
        <h2>Messages</h2>
        {contacts.map(c => (
          <div className="contact" key={c.id}>
            <img src={c.avatar} alt={c.name} className="avatar" />
            <div>
              <h4>{c.name}</h4>
              <span className="status">{c.status}</span>
            </div>
          </div>
        ))}
      </aside>

      <div className="chat-section">
        <header className="chat-header">
          <img src={avatar} alt="contact" className="avatar" />
          <div className="chat-info">
            <h3>Christina</h3>
            <span className="online">● En ligne</span>
          </div>
        </header>

        <div className="messages">
          {messages.map((msg, index) =>
            msg.type === 'image' ? (
              <div key={index} className={`bubble ${msg.from}`}>
                <img src={msg.src} alt={msg.alt} />
              </div>
            ) : (
              <div key={index} className={`bubble ${msg.from}`}>
                {msg.text}
              </div>
            )
          )}
        </div>

        <footer className="chat-input">
          <input
            type="text"
            placeholder="Écris ton message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button></button>
        </footer>
      </div>
    </div>
  );
}

export default MessagePage;
