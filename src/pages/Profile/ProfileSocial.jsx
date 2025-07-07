import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import apiService from '../../services/apiService';
import Skeleton from '../../components/AEV/AEV.Skeleton/Skeleton';
import './ProfileSocial.scss';

const ProfileSocial = () => {
  const { userId, type } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        // Récupérer les infos du user dont on regarde le profil
        const userData = await apiService.get(`/users/${userId}`);
        setCurrentUser(userData);

        // Simuler des données pour l'instant (à remplacer par l'API réelle)
        const mockUsers = [
          {
            userId: '1',
            username: 'alex_gamer',
            firstName: 'Alex',
            lastName: 'Martin',
            profilePicture: 'https://via.placeholder.com/60',
            isFollowing: true,
            followersCount: 1240,
            followingCount: 89
          },
          {
            userId: '2',
            username: 'sarah_dev',
            firstName: 'Sarah',
            lastName: 'Chen',
            profilePicture: 'https://via.placeholder.com/60',
            isFollowing: false,
            followersCount: 856,
            followingCount: 234
          },
          {
            userId: '3',
            username: 'mike_streamer',
            firstName: 'Mike',
            lastName: 'Johnson',
            profilePicture: 'https://via.placeholder.com/60',
            isFollowing: true,
            followersCount: 2100,
            followingCount: 156
          },
          {
            userId: '4',
            username: 'lisa_gamer',
            firstName: 'Lisa',
            lastName: 'Wang',
            profilePicture: 'https://via.placeholder.com/60',
            isFollowing: false,
            followersCount: 432,
            followingCount: 67
          },
          {
            userId: '5',
            username: 'tom_creator',
            firstName: 'Tom',
            lastName: 'Brown',
            profilePicture: 'https://via.placeholder.com/60',
            isFollowing: true,
            followersCount: 1890,
            followingCount: 123
          }
        ];

        setUsers(mockUsers);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, type]);

  const handleFollowToggle = (targetUserId) => {
    setUsers(prev => prev.map(user => 
      user.userId === targetUserId 
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  const handleUserClick = (targetUserId) => {
    navigate(`/profile/${targetUserId}`);
  };

  const getDisplayName = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.username;
  };

  if (loading) {
    return (
      <div className="profile-social">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Retour
          </button>
          <Skeleton width={200} height={32} />
        </div>
        <div className="users-list">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="user-card skeleton">
              <Skeleton width={60} height={60} circle />
              <div className="user-info">
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={16} />
              </div>
              <Skeleton width={80} height={32} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-social">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1>
          {type === 'followers' ? 'Abonnés' : 'Abonnements'}
          {currentUser && (
            <span className="user-name"> de {getDisplayName(currentUser)}</span>
          )}
        </h1>
      </div>

      <div className="users-list">
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>Aucun {type === 'followers' ? 'abonné' : 'abonnement'}</h3>
            <p>
              {type === 'followers' 
                ? "Cet utilisateur n'a pas encore d'abonnés."
                : "Cet utilisateur ne suit personne pour le moment."
              }
            </p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.userId} className="user-card">
              <div 
                className="user-info"
                onClick={() => handleUserClick(user.userId)}
              >
                <img 
                  src={user.profilePicture} 
                  alt={getDisplayName(user)}
                  className="avatar"
                />
                <div className="details">
                  <h3 className="name">{getDisplayName(user)}</h3>
                  <p className="username">@{user.username}</p>
                  <div className="stats">
                    <span>{user.followersCount} abonnés</span>
                    <span>•</span>
                    <span>{user.followingCount} abonnements</span>
                  </div>
                </div>
              </div>
              
              {user.userId !== userId && (
                <button
                  className={`follow-btn ${user.isFollowing ? 'unfollow' : 'follow'}`}
                  onClick={() => handleFollowToggle(user.userId)}
                >
                  {user.isFollowing ? 'Se désabonner' : 'S\'abonner'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileSocial; 