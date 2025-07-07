import React, { useState, useEffect } from 'react';
import './LiveStreamers.scss';
import { FaTwitch, FaYoutube } from 'react-icons/fa';
import { BsEyeFill, BsHeartFill, BsShareFill } from 'react-icons/bs';

const LiveStreamers = ({ streamers = [], chatMessages = [] }) => {
  const [selectedStream, setSelectedStream] = useState(streamers[0] || null);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    setSelectedStream(streamers[0] || null);
  }, [streamers]);

  const handleStreamSelect = (streamer) => {
    setSelectedStream(streamer);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Ici tu peux brancher l'envoi du message
      setChatMessage('');
    }
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'twitch':
        return <FaTwitch />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return <FaTwitch />;
    }
  };

  if (!streamers.length) {
    return <div className="live-streamers"><div className="main-stream"><div className="stream-container"><div className="no-stream">Aucun live en cours pour ce jeu.</div></div></div></div>;
  }

  return (
    <div className="live-streamers">
      {/* Main stream viewer */}
      <div className="main-stream">
        <div className="stream-container">
          <div className="stream-video">
            <img src={selectedStream.thumbnail} alt={selectedStream.title} />
            
            {/* Live indicator */}
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span className="live-text">LIVE</span>
            </div>

            {/* Viewer count */}
            <div className="viewer-count">
              <BsEyeFill />
              {selectedStream.viewers}
            </div>

            {/* Platform badge */}
            <div className={`platform-badge ${selectedStream.platform}`}>
              {getPlatformIcon(selectedStream.platform)}
            </div>
          </div>

          {/* Stream info */}
          <div className="stream-info">
            <div className="streamer-details">
              <img src={selectedStream.avatar} alt={selectedStream.username} className="streamer-avatar" />
              <div className="streamer-meta">
                <h3 className="streamer-name">{selectedStream.username}</h3>
                <p className="stream-title">{selectedStream.title}</p>
                <div className="stream-stats">
                  <span className="duration">{selectedStream.duration}</span>
                  <span className="game-name">{selectedStream.game}</span>
                </div>
              </div>
            </div>
            
            <div className="stream-actions">
              <button className="action-btn follow-btn">
                <BsHeartFill />
                Follow
              </button>
              <button className="action-btn share-btn">
                <BsShareFill />
              </button>
            </div>
          </div>
        </div>

        {/* Chat section */}
        <div className="chat-section">
          <div className="chat-header">
            <h4>Stream Chat</h4>
            <div className="chat-viewers">
              <span className="online-dot"></span>
              {selectedStream.viewers} watching
            </div>
          </div>
          
          <div className="chat-messages">
            {chatMessages.length > 0 ? chatMessages.map((msg, i) => (
              <div className="chat-message" key={i}>
                <span className="chat-user">{msg.user}:</span>
                <span className="chat-text">{msg.text}</span>
              </div>
            )) : (
              <div className="chat-message"><span className="chat-text">Aucun message pour ce live.</span></div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleChatSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Other live streams */}
      <div className="other-streams">
        <h3 className="section-title">
          <span className="live-dot-section"></span>
          Other Live Streams
        </h3>
        
        <div className="streams-grid">
          {streamers.filter(s => s.id !== selectedStream.id).length > 0 ? streamers.filter(s => s.id !== selectedStream.id).map((streamer) => (
            <div
              key={streamer.id}
              className="stream-card"
              onClick={() => handleStreamSelect(streamer)}
            >
              <div className="stream-thumbnail">
                <img src={streamer.thumbnail} alt={streamer.title} />
                
                {/* Live overlay */}
                <div className="stream-overlay">
                  <div className="live-badge">
                    <span className="live-dot-small"></span>
                    LIVE
                  </div>
                  <div className="viewer-badge">
                    <BsEyeFill />
                    {streamer.viewers}
                  </div>
                </div>

                <div className={`platform-icon ${streamer.platform}`}>
                  {getPlatformIcon(streamer.platform)}
                </div>
              </div>

              <div className="stream-card-info">
                <div className="streamer-row">
                  <img src={streamer.avatar} alt={streamer.username} />
                  <div className="streamer-info">
                    <h4 className="streamer-username">{streamer.username}</h4>
                    <p className="stream-duration">{streamer.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          )) : <div className="no-stream">Aucun autre live</div>}
        </div>
      </div>
    </div>
  );
};

export default LiveStreamers;