import React, { useState } from 'react';
import './MessagePage.scss';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiPicker from 'emoji-picker-react';

const MessagePage = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMsg => prevMsg + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const contacts = [
    { name: 'Amanda', status: 'En ligne', lastMessage: 'GG pour la dernière game !', time: '12:30', unread: 2 },
    { name: 'Christina', status: 'En jeu - Valorant', lastMessage: 'On se fait une partie ?', time: '11:45', unread: 0 },
    { name: 'Gloria', status: 'Hors ligne', lastMessage: 'Merci pour l\'aide !', time: '10:15', unread: 0 },
    { name: 'Ivan', status: 'En jeu - CS2', lastMessage: 'Check ce nouveau skin', time: 'Hier', unread: 1 },
    { name: 'Malcolm', status: 'En ligne', lastMessage: 'Bien joué !', time: 'Hier', unread: 0 },
    { name: 'Sophia', status: 'Inactif', lastMessage: 'À demain !', time: '7 Mars', unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'Christina', content: 'Hey! Tu as vu les nouveaux skins?', time: '11:30', type: 'received' },
    { id: 2, sender: 'me', content: 'Oui ils sont incroyables! 🔥', time: '11:32', type: 'sent' },
    { id: 3, sender: 'Christina', content: 'Je viens d\'acheter celui-ci:', time: '11:33', type: 'received' },
    { id: 4, sender: 'Christina', content: 'https://picsum.photos/300/200', time: '11:33', type: 'received', isImage: true },
    { id: 5, sender: 'me', content: 'Wow! Il est vraiment stylé!', time: '11:35', type: 'sent' },
    { id: 6, sender: 'Christina', content: 'On fait une partie pour le tester?', time: '11:36', type: 'received' },
  ];

  return (
    <div className="messenger">
      <aside className="sidebar">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="contacts">
          {contacts
            .filter(contact =>
              contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((contact, idx) => (
              <div key={idx} className={`contact ${idx === 1 ? 'active' : ''}`}>
                <div className="contact-avatar">
                  <img src={`https://i.pravatar.cc/100?img=${idx + 2}`} alt={contact.name} />
                  <span className={`status-dot ${contact.status.includes('En ligne') ? 'online' :
                    contact.status.includes('En jeu') ? 'in-game' :
                      contact.status === 'Inactif' ? 'idle' : 'offline'}`} />
                </div>
                <div className="contact-info">
                  <div className="contact-header">
                    <h4>{contact.name}</h4>
                    <span className="time">{contact.time}</span>
                  </div>
                  <div className="contact-subheader">
                    <p className="status">{contact.status}</p>
                    {contact.unread > 0 && <span className="unread">{contact.unread}</span>}
                  </div>
                  <p className="last-message">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
        </div>
      </aside>

      <section className="chat">
        <header className="chat-header">
          <div className="user-info">
            <div className="avatar-container">
              <img src="https://i.pravatar.cc/100?img=2" alt="Christina" />
              <span className="status-dot in-game" />
            </div>
            <div className="user-details">
              <h3>Christina</h3>
              <span className="status">En jeu - Valorant</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <MoreVertIcon />
            </button>
          </div>
        </header>

        <div className="chat-body">
          <div className="date-separator">
            <span>Aujourd'hui</span>
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              {msg.isImage ? (
                <div className="image-container">
                  <img src={msg.content} alt="shared content" />
                </div>
              ) : (
                <div className="message-content">
                  <p>{msg.content}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="chat-footer">
          <div className="message-input-container">
            <button className="action-btn emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <InsertEmoticonIcon />
            </button>
            <button className="action-btn">
              <AttachFileIcon />
            </button>
            <input
              type="text"
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-btn" disabled={!message.trim()}>
              <SendIcon />
            </button>
          </div>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </footer>
      </section>
    </div>
  );
};

export default MessagePage;
