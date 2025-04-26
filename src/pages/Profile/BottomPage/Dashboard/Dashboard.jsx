import React, { useEffect, useState } from 'react';
import useFetch from '../../../../hooks/useFetch';
import useAuth from '../../../../hooks/useAuth';
import apiService from '../../../../services/apiService';
import './Dashboard.scss';

function Dashboard() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [friendDetails, setFriendDetails] = useState([]);

  const { data, loading, error } = useFetch(userId ? `/friends/${userId}` : null);

  useEffect(() => {
    if (!userId) return; 

    const fetchFriendDetails = async () => {
      if (data && data.$values) {
        try {
          const friendRequests = data.$values.map(friend =>
            apiService.get(`/users/${friend.friendId}`)
          );
          const friendsData = await Promise.all(friendRequests);
          setFriendDetails(friendsData);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails des amis :', error);
        }
      }
    };

    fetchFriendDetails();
  }, [data, userId]);

  const handleUnfriend = async (friendId) => {
    try {
      await apiService.delete(`/friends/${userId}/${friendId}`);
      setFriendDetails(friendDetails.filter(friend => friend.user_id !== friendId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l’ami :', error);
    }
  };

  if (!userId) return <p>Utilisateur non connecté. (userId manquant)</p>;
  if (loading) return <p>Chargement des amis...</p>;
  if (error) return <p>Une erreur s'est produite lors de la récupération des amis.</p>;
  if (!data || !data.$values || data.$values.length === 0) return <p>Aucun ami trouvé.</p>;

  return (
    <div className="dashboard">
      <h2 className="title">Mes amis</h2>
      <div className="friendsContainer">
        {friendDetails.map(friend => (
          <div key={friend.user_id} className="friendCard">
            <div className="friendInfo">
              <img
                src={friend.profile_picture || 'https://via.placeholder.com/40'}
                alt={`${friend.first_name} ${friend.last_name}`}
                className="avatar"
              />
              <div className="details">
                <h3 className="name">{friend.first_name} {friend.last_name}</h3>
                <p className="username">@{friend.username}</p>
              </div>
            </div>
            <button
              className="unfriendBtn"
              onClick={() => handleUnfriend(friend.user_id)}
            >
              Supprimer l’ami
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
