import React, { useState } from 'react';
import './LiveStreamers.scss';

const streamers = [
  {
    id: 1,
    username: "Gaming_303",
    avatar: "https://picsum.photos/seed/streamer1/50/50",
    thumbnail: "https://picsum.photos/seed/stream1/400/225",
    viewers: "2.5K",
    platform: "twitch",
    isLive: true,
    title: "Epic Battle Royale - Road to Victory!",
    game: "Night City Warriors",
    duration: "2h 15m"
  },
  {
    id: 2,
    username: "ProGamer_XZ",
    avatar: "https://picsum.photos/seed/streamer2/50/50",
    thumbnail: "https://picsum.photos/seed/stream2/400/225",
    viewers: "1.8K",
    platform: "youtube",
    isLive: true,
    title: "Ranked Climbing Stream",
    game: "Night City Warriors",
    duration: "45m"
  },
  {
    id: 3,
    username: "NeonStreamer",
    avatar: "https://picsum.photos/seed/streamer3/50/50",
    thumbnail: "https://picsum.photos/seed/stream3/400/225",
    viewers: "892",
    platform: "twitch",
    isLive: true,
    title: "Chill Gaming Session",
    game: "Night City Warriors",
    duration: "1h 30m"
  },
  {
    id: 4,
    username: "CyberNinja_YT",
    avatar: "https://picsum.photos/seed/streamer4/50/50",
    thumbnail: "https://picsum.photos/seed/stream4/400/225",
    viewers: "654",
    platform: "youtube",
    isLive: true,
    title: "New Player Learning the Game",
    game: "Night City Warriors",
    duration: "3h 02m"
  }
];

const LiveStreamers = () => {
  const [selectedStream, setSelectedStream] = useState(streamers[0]);
  const [chatMessage, setChatMessage] = useState('');

  const handleStreamSelect = (streamer) => {
    setSelectedStream(streamer);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Chat message:', chatMessage);
      setChatMessage('');
    }
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'twitch':
        return '📺';
      case 'youtube':
        return '📹';
      default:
        return '🎮';
    }
  };

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
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Follow
              </button>
              <button className="action-btn share-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
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
            <div className="chat-message">
              <span className="chat-user">CyberFan123:</span>
              <span className="chat-text">Amazing gameplay! 🔥</span>
            </div>
            <div className="chat-message">
              <span className="chat-user">GameMaster:</span>
              <span className="chat-text">Nice shot!</span>
            </div>
            <div className="chat-message">
              <span className="chat-user">NeonGamer:</span>
              <span className="chat-text">What's your setup?</span>
            </div>
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
          {streamers.filter(s => s.id !== selectedStream.id).map((streamer) => (
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
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStreamers;