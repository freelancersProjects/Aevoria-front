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
    
    const fetchFriends = async () => {
      try {
        const data = await apiService.get(`/friends/${userId}`);
        const friendRelations = data?.$values || data?.values || data || [];
        
        // Correction : toujours prendre l'ID de l'ami (pas le sien)
        const friendsWithDetails = await Promise.all(
          friendRelations
            .filter(friend => friend.status === 'Accepted')
            .map(async (friendRelation) => {
              try {
                const amiId = friendRelation.userId === userId ? friendRelation.friendId : friendRelation.userId;
                const friendData = await apiService.get(`/users/${amiId}`);
                return {
                  id: amiId,
                  username: friendData.username || 'Utilisateur inconnu',
                  firstName: friendData.firstName || '',
                  lastName: friendData.lastName || '',
                  avatar: friendData.profilePicture || '',
                  status: friendData.status || 'Offline'
                };
              } catch (error) {
                console.error(`Erreur lors de la récupération des détails de l'ami`, error);
                return {
                  id: friendRelation.friendId,
                  username: 'Utilisateur inconnu',
                  firstName: '',
                  lastName: '',
                  avatar: '',
                  status: 'Offline'
                };
              }
            })
        );
        
        setFriends(friendsWithDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des amis:', error);
        setFriends([]);
      }
    };

    fetchFriends();
  }, [userId]);

  // Récupérer l'historique des messages avec l'ami sélectionné
  useEffect(() => {
    if (!selectedFriend || !userId) return;
    apiService.get(`/messages/${userId}/${selectedFriend.id}`)
      .then(data => setMessages(Array.isArray(data) ? data : []))
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

  // Envoi d'un message (API + socket) en query string
  const handleSend = async () => {
    if (!message.trim() || !selectedFriend) return;
    const params = new URLSearchParams({
      senderId: userId,
      receiverId: selectedFriend.id,
      content: message,
      messageType: 'Text',
    });
    try {
      // Envoi API (persistance) en query string
      await apiService.post(`/messages?${params.toString()}`);
      // Envoi temps réel
      sendSocketMessage(selectedFriend.id, message);
      setMessages(prev => [...prev, { senderId: userId, receiverId: selectedFriend.id, content: message, messageType: 'Text', type: 'sent', createdAt: new Date().toISOString() }]);
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

  const getDisplayName = (friend) => {
    if (friend.firstName && friend.lastName) {
      return `${friend.firstName} ${friend.lastName}`;
    }
    return friend.username;
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
              getDisplayName(friend).toLowerCase().includes(searchQuery.toLowerCase()) ||
              friend.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((friend, idx) => (
              <div
                key={friend.id}
                className={`contact ${selectedFriend && selectedFriend.id === friend.id ? 'active' : ''}`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="contact-avatar">
                  <img src={friend.avatar || `https://i.pravatar.cc/100?img=${idx + 2}`} alt={getDisplayName(friend)} />
                  <span className={`status-dot ${friend.status.toLowerCase()}`} />
                </div>
                <div className="contact-info">
                  <div className="contact-header">
                    <h4>{getDisplayName(friend)}</h4>
                  </div>
                  <div className="contact-subheader">
                    <p className="status">{friend.status === 'Active' ? 'En ligne' : friend.status === 'Inactive' ? 'Inactif' : 'Hors ligne'}</p>
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
              <img src={selectedFriend?.avatar || 'https://i.pravatar.cc/100?img=2'} alt={selectedFriend ? getDisplayName(selectedFriend) : ''} />
              <span className={`status-dot ${selectedFriend?.status?.toLowerCase() || 'offline'}`} />
            </div>
            <div className="user-details">
              <h3>{selectedFriend ? getDisplayName(selectedFriend) : ''}</h3>
              <span className="status">
                {selectedFriend?.status === 'Active' ? 'En ligne' : 
                 selectedFriend?.status === 'Inactive' ? 'Inactif' : 'Hors ligne'}
              </span>
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

          {/* Affichage debug du contenu brut des messages */}
          <pre style={{color: 'white', background: '#222', fontSize: 12, padding: 8, borderRadius: 8, marginBottom: 12}}>{JSON.stringify(messages, null, 2)}</pre>

          {messages.map((msg, i) => {
            // Mapping robuste pour le texte du message
            const text = msg.content || msg.text || msg.body || msg.message || msg.messageText || '';
            const sender = msg.senderId || msg.fromUserId || msg.sender || msg.userId;
            return (
              <div key={i} className={`message ${sender === userId ? 'sent' : 'received'}`}>
                <div className="message-content">
                  <p>{text}</p>
                  <span className="message-time">{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                </div>
              </div>
            );
          })}
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
