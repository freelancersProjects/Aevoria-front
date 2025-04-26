import React, { useEffect, useState } from 'react';
import useFetch from '../../../../hooks/useFetch';
import useAuth from '../../../../hooks/useAuth';
import apiService from '../../../../services/apiService';
import './Dashboard.scss';

function Dashboard() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [friendDetails, setFriendDetails] = useState([]);

  const shouldFetch = !!userId;
  const { data, loading, error } = useFetch(shouldFetch ? `/friends/${userId}` : null);

  useEffect(() => {
    if (!shouldFetch || !data || !data.$values) return;

    const fetchFriendDetails = async () => {
      try {
        const friendRequests = data.$values.map(async (friendRelation) => {
          const friendData = await apiService.get(`/users/${friendRelation.friendId}`);
          return {
            ...friendData,
            relationFriendId: friendRelation.friendId,
          };
        });
        const friendsData = await Promise.all(friendRequests);
        setFriendDetails(friendsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails des amis :', error);
      }
    };


    fetchFriendDetails();
  }, [data, shouldFetch]);

  const handleUnfriend = async (friendId) => {
    if (!friendId) {
      console.error("friendId manquant !");
      return;
    }

    try {
      await apiService.delete(`/friends?userId=${userId}&friendId=${friendId}`);

      setFriendDetails((prevFriends) =>
        prevFriends.filter((friend) => friend.relationFriendId !== friendId)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de l’ami :', error);
    }
  };


  if (!shouldFetch) return <p>Utilisateur non connecté.</p>;
  if (loading) return <p>Chargement des amis...</p>;
  if (error) return <p>Une erreur s'est produite lors de la récupération des amis.</p>;
  if (!data || !data.$values || data.$values.length === 0) return <p>Aucun ami trouvé.</p>;

  return (
    <div className="dashboard">
      <h2 className="title">Mes amis</h2>
      <div className="friendsContainer">
        {friendDetails.map((friend) => (
          <div key={friend.relationFriendId} className="friendCard">
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
              onClick={() => handleUnfriend(friend.relationFriendId)}
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
