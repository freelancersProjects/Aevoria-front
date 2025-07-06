import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../hooks/useAuth";
import FriendMenu from "./FriendMenu/FriendMenu";
import apiService from "../../../../services/apiService";
import AddFriendModal from "./AddFriendModal/AddFriendModal";
import addFriend from "../../../../assets/svg/add-friend.svg";
import HR from "../../../../components/AEV/AEV.HR/HR";
import DashboardPendingFriends from "./DashboardPendingFriend/DashboardPendingFriends";
import StatCard from "./StatCard/StatCard";
import "./Dashboard.scss";

function Dashboard() {
  const { user } = useAuth();
  const userId = user?.userId;
  const shouldFetch = !!userId;

  const [friendDetails, setFriendDetails] = useState([]);
  const { data, loading, error, refetch } = useFetch(
    shouldFetch ? `/friends/${userId}` : null
  );
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    if (!shouldFetch || !data || !data.$values) return;

    const fetchFriendDetails = async () => {
      try {
        const friendRequests = data.$values.map(async (friendRelation) => {
          const amiId = friendRelation.userId === userId ? friendRelation.friendId : friendRelation.userId;
          const friendData = await apiService.get(`/users/${amiId}`);
          
          // Normaliser les données pour gérer les différents formats possibles
          const normalizedFriend = {
            ...friendData,
            relationFriendId: amiId,
            status: friendRelation.status,
            // Gérer les différents formats de noms
            firstName: friendData.firstName || friendData.first_name || '',
            lastName: friendData.lastName || friendData.last_name || '',
            username: friendData.username || friendData.userName || 'Utilisateur inconnu',
            profilePicture: friendData.profilePicture || friendData.profile_picture || '',
          };
          
          return normalizedFriend;
        });
        const friendsData = await Promise.all(friendRequests);
        setFriendDetails(friendsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails des amis :",
          error
        );
      }
    };

    fetchFriendDetails();
  }, [data, shouldFetch, userId]);

  const handleUnfriend = async (friendId) => {
    if (!friendId) {
      console.error("friendId manquant !");
      return;
    }

    const relation = data?.$values?.find(
      (rel) =>
        (rel.userId.toLowerCase() === userId.toLowerCase() &&
          rel.friendId.toLowerCase() === friendId.toLowerCase()) ||
        (rel.userId.toLowerCase() === friendId.toLowerCase() &&
          rel.friendId.toLowerCase() === userId.toLowerCase())
    );

    if (!relation) {
      console.error("Relation d'amitié non trouvée");
      return;
    }

    try {
      await apiService.delete(
        `/friends?userId=${relation.userId}&friendId=${relation.friendId}`
      );

      setFriendDetails((prevFriends) =>
        prevFriends.filter((friend) => friend.relationFriendId !== friendId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ami :", error);
    }
  };

  const addAcceptedFriend = async (friendId) => {
    try {
      const res = await apiService.get(`/users/${friendId}`);
      const enriched = {
        ...res,
        relationFriendId: friendId,
        status: "Accepted",
        // Normaliser les données
        firstName: res.firstName || res.first_name || '',
        lastName: res.lastName || res.last_name || '',
        username: res.username || res.userName || 'Utilisateur inconnu',
        profilePicture: res.profilePicture || res.profile_picture || '',
      };

      setFriendDetails((prev) => [...prev, enriched]);
    } catch (err) {
      console.error("Erreur lors de l'ajout dynamique d'un ami accepté :", err);
    }
  };

  const getDisplayName = (friend) => {
    if (friend.firstName && friend.lastName) {
      return `${friend.firstName} ${friend.lastName}`;
    }
    return friend.username;
  };

  if (loading) return <p>Chargement des amis...</p>;
  if (error)
    return <p>Une erreur s'est produite lors de la récupération des amis.</p>;
  // if (!data || !data.$values || data.$values.length === 0) return <p>Aucun ami trouvé.</p>;

  return (
    <div className="dashboard">
      <div className="stats-cards">
        <StatCard type="saved" />
        <StatCard type="wallet" />
        <StatCard type="ranking" />
        <StatCard type="affiliate" />
      </div>

      <div className="d-flex aic title-friend-container">
        <h2 className="title">Mes amis</h2>
        <img
          src={addFriend}
          alt="Ajouter un ami"
          className="addFriendIcon"
          onClick={() => setShowSearchModal(true)}
        />
      </div>
      <div className="friendsContainer">
        <DashboardPendingFriends
          currentUserId={user?.userId}
          onActionDone={refetch}
          onAccepted={addAcceptedFriend}
        />
        <HR />
        {friendDetails
          .filter((friend) => friend.status === "Accepted")
          .map((friend) => (
            <div key={friend.relationFriendId} className="friendCard">
              <div className="friendInfo">
                <img
                  src={
                    friend.profilePicture || "https://via.placeholder.com/40"
                  }
                  alt={getDisplayName(friend)}
                  className="avatar"
                />
                <div className="details">
                  <h3 className="name">
                    {getDisplayName(friend)}
                  </h3>
                  <p className="username">@{friend.username}</p>
                </div>
              </div>
              <div className="friendActions">
                <button
                  className="messageBtn"
                  onClick={() =>
                    (window.location.href = `/message/${userId}/${friend.relationFriendId}`)
                  }
                >
                  Message
                </button>
                <FriendMenu
                  userId={userId}
                  friendId={friend.relationFriendId}
                  onUnfriend={() => handleUnfriend(friend.relationFriendId)}
                  onViewWishlist={() =>
                    (window.location.href = `/wishlist/${friend.relationFriendId}`)
                  }
                />
              </div>
            </div>
          ))}
      </div>
      <AddFriendModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        currentUserId={userId}
      />
    </div>
  );
}

export default Dashboard;
