import React, { useState, useEffect, useCallback, useRef } from 'react';
import './MessagePage.scss';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiPicker from 'emoji-picker-react';
import useChatSocket from '../../hooks/useChatSocket';
import apiService from '../../services/apiService';
import useAuth from '../../hooks/useAuth';

const MessagePage = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    apiService.get(`/friends/${userId}`)
      .then(data => {
        const list = (data?.$values || data?.values || data || []).map(f => ({
          id: f.friendId || f.userId,
          username: f.username || f.alias || 'Utilisateur inconnu',
          avatar: f.avatar || '',
        }));
        setFriends(list);
      })
      .catch(console.error);
  }, [userId]);

  // Récupérer l'historique des messages avec l'ami sélectionné
  useEffect(() => {
    if (!selectedFriend || !userId) return;
    apiService.get(`/messages/${userId}/${selectedFriend.id}`)
      .then(data => setMessages(data || []))
      .catch(console.error);
  }, [selectedFriend, userId]);

  // Scroll auto en bas
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // SignalR temps réel
  const onMessageReceived = useCallback(
    ({ fromUserId, content }) => {
      if (selectedFriend && fromUserId === selectedFriend.id) {
        setMessages(prev => [...prev, { senderId: fromUserId, content, type: 'received', createdAt: new Date().toISOString() }]);
      }
    },
    [selectedFriend]
  );
  const { sendMessage: sendSocketMessage } = useChatSocket({ onMessageReceived, userId });

  // Envoi d'un message (API + socket)
  const handleSend = async () => {
    if (!message.trim() || !selectedFriend) return;
    const msgObj = {
      senderId: userId,
      receiverId: selectedFriend.id,
      content: message,
      messageType: 'Text',
    };
    try {
      // Envoi API (persistance)
      await apiService.post('/messages', msgObj);
      // Envoi temps réel
      sendSocketMessage(selectedFriend.id, message);
      setMessages(prev => [...prev, { ...msgObj, type: 'sent', createdAt: new Date().toISOString() }]);
      setMessage('');
    } catch (err) {
      // Optionnel : toast d'erreur
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMsg => prevMsg + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          {friends
            .filter(friend =>
              friend.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((friend, idx) => (
              <div
                key={friend.id}
                className={`contact ${selectedFriend && selectedFriend.id === friend.id ? 'active' : ''}`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="contact-avatar">
                  <img src={friend.avatar || `https://i.pravatar.cc/100?img=${idx + 2}`} alt={friend.username} />
                  <span className={`status-dot online`} />
                </div>
                <div className="contact-info">
                  <div className="contact-header">
                    <h4>{friend.username}</h4>
                  </div>
                  <div className="contact-subheader">
                    <p className="status">En ligne</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </aside>
      <section className="chat">
        <header className="chat-header">
          <div className="user-info">
            <div className="avatar-container">
              <img src={selectedFriend?.avatar || 'https://i.pravatar.cc/100?img=2'} alt={selectedFriend?.username || ''} />
              <span className="status-dot in-game" />
            </div>
            <div className="user-details">
              <h3>{selectedFriend?.username || ''}</h3>
              <span className="status">En ligne</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <MoreVertIcon />
            </button>
          </div>
        </header>
        <div className="chat-body" ref={chatBodyRef}>
          <div className="date-separator">
            <span>Aujourd'hui</span>
          </div>
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
              <div className="message-content">
                <p>{msg.content}</p>
                <span className="message-time">{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
              </div>
            </div>
          ))}
        </div>
        <footer className="chat-footer">
          <div className="message-input-container message-input-centered">
            <button className="action-btn emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <InsertEmoticonIcon />
            </button>
            <button className="action-btn">
              <AttachFileIcon />
            </button>
            <textarea
              type="text"
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleInputKeyDown}
              rows={1}
              className="message-textarea"
              style={{ resize: 'none' }}
            />
            <button className="send-btn send-btn-modern" disabled={!message.trim()} onClick={handleSend}>
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
