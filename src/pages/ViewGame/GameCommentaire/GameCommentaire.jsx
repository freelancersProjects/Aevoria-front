import React, { useState } from 'react';
import './GameCommentaire.scss';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const GameCommentaire = () => {
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Données des commentaires (dans un cas réel, cela viendrait d'une API)
  const reviews = [
    {
      id: 1,
      avatar: '/avatars/user1.jpg',
      username: 'feetsey',
      rating: 5,
      title: 'Horror done right',
      date: 'July 23, 2023',
      isVerified: true,
      gamesCount: 109,
      reviewsCount: 1,
      content: "Unlike most other horror games, Amnesia knows that an endless succession of jump scares is not how you really get under someone's skin. After playing this game for a while, I really felt what can only be called a sense of dread - it is more of an atmosphere that makes you fearful there is just something nasty around every corner. The lack of any weapons also imposes a sense of vulnerability you don't often get in any game.",
      additionalContent: "The story puzzles are not so, and I once or twice had glitches with the monster behavior which rather broke my immersion. For sheer atmosphere however I would certainly recommend this. Just make sure you play with the lights off - if you can handle it.",
      helpfulCount: 216,
      totalVotes: 248
    },
    {
      id: 2,
      avatar: '/avatars/user2.jpg',
      username: 'feetsey',
      rating: 5,
      title: 'Horror done right',
      date: 'July 23, 2023',
      isVerified: true,
      gamesCount: 109,
      reviewsCount: 1,
      content: "Unlike most other horror games, Amnesia knows that an endless succession of jump scares is not how you really get under someone's skin. After playing this game for a while, I really felt what can only be called a sense of dread - it is more of an atmosphere that makes you fearful there is just something nasty around every corner. The lack of any weapons also imposes a sense of vulnerability you don't often get in any game.",
      helpfulCount: 216,
      totalVotes: 248
    },
    {
      id: 3,
      avatar: '/avatars/user3.jpg',
      username: 'feetsey',
      rating: 5,
      title: 'Horror done right',
      date: 'July 23, 2023',
      isVerified: true,
      gamesCount: 109,
      reviewsCount: 1,
      content: "Unlike most other horror games, Amnesia knows that an endless succession of jump scares is not how you really get under someone's skin. After playing this game for a while, I really felt what can only be called a sense of dread - it is more of an atmosphere that makes you fearful there is just something nasty around every corner. The lack of any weapons also imposes a sense of vulnerability you don't often get in any game.",
      helpfulCount: 216,
      totalVotes: 248
    }
  ];

  const handleVote = (reviewId, isHelpful) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: isHelpful
    }));
  };

  return (
    <div className="game-commentaire">
      <h2 className="section-title">Overall most helpful review</h2>
      
      <div className="reviews-container">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="user-info">
              <div className="avatar">
                <img src={review.avatar} alt={`${review.username}'s avatar`} />
              </div>
              <div className="user-stats">
                <div className="username">{review.username}</div>
                <div className="stats">
                  <span>Games: {review.gamesCount}</span>
                  <span>Reviews: {review.reviewsCount}</span>
                </div>
              </div>
            </div>
            
            <div className="review-content">
              <div className="review-header">
                <div className="rating-title">
                  <StarRating rating={review.rating} />
                  <h3>{review.title}</h3>
                </div>
                <div className="date-verified">
                  <span className="date">{review.date}</span>
                  {review.isVerified && <span className="verified">• Verified owner</span>}
                </div>
              </div>
              
              <div className="review-text">
                <p>{review.content}</p>
                {review.additionalContent && <p>{review.additionalContent}</p>}
              </div>
              
              <div className="review-actions">
                <div className="helpful-question">
                  <span>Is this helpful to you?</span>
                  <div className="vote-buttons">
                    <button 
                      className={`yes ${helpfulVotes[review.id] === true ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, true)}
                    >
                      yes
                    </button>
                    <button 
                      className={`no ${helpfulVotes[review.id] === false ? 'active' : ''}`}
                      onClick={() => handleVote(review.id, false)}
                    >
                      no
                    </button>
                  </div>
                </div>
                <div className="helpful-count">
                  {review.helpfulCount} of {review.totalVotes} users found this helpful
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="newsletter">
        <h3>Stay in the loop</h3>
        <p>Subscribe to receive the latest news and updates about DTA.</p>
        <p>We promise not to spam you!</p>
        <div className="subscribe-container">
          <input type="email" placeholder="Your email address" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default GameCommentaire;
