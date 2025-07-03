import "./AccountHeader.scss";
import defaultBanner from "../../../../assets/images/17776072l.jpg";
import ArrowProfileDashboard from "../../../../assets/svg/arrow-profile-dashboard.svg";
import StatusIndicator from "../../../../components/AEV/AEV.StatusIndicator/StatusIndicator";
import defaultProfile from "../../../../assets/images/avatar.png";
import useAuth from "../../../../hooks/useAuth";
import apiService from "../../../../services/apiService";
import { useState, useEffect } from "react";
import Toast from "../../../../components/AEV/AEV.Toast/Toast";

const AccountHeader = () => {
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState("Offline");
  const [toast, setToast] = useState(null);

  const friends = [
    { name: "Eliot Hawke", avatarUrl: defaultProfile },
    { name: "Mila Stone", avatarUrl: defaultProfile },
    { name: "Jaron Cruz", avatarUrl: defaultProfile },
    { name: "Ayla Moon", avatarUrl: defaultProfile },
    { name: "Kai Rivers", avatarUrl: defaultProfile },
    { name: "Luna Ray", avatarUrl: defaultProfile },
    { name: "Theo Knight", avatarUrl: defaultProfile },
  ];

  useEffect(() => {
    if (user?.userId) {
      const fetchUserStatus = async () => {
        try {
          const userData = await apiService.get(`/users/${user.userId}`);
          if (userData?.status) {
            setUserStatus(userData.status);
          } else {
            setUserStatus("Active");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du statut:", error);
          setUserStatus("Active");
        }
      };
      fetchUserStatus();
    } else {
      setUserStatus("Offline");
    }
  }, [user]);

  const handleStatusChange = async (newStatus) => {
    if (!user?.userId) {
      setToast({
        type: 'error',
        message: "Vous devez être connecté pour changer votre statut"
      });
      return;
    }

    try {
      const response = await apiService.patchQuery(`/users/${user.userId}/status?newStatus=${newStatus}`);

      if (response !== null) {
        setUserStatus(newStatus);
        setToast({
          type: 'success',
          message: `Statut mis à jour vers ${newStatus === 'Active' ? 'Actif' : 'Inactif'}`
        });
      } else {
        throw new Error("Aucune réponse de l'API");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      setToast({
        type: 'error',
        message: "Erreur lors de la mise à jour du statut. Veuillez réessayer."
      });
    }
  };

  const displayUser = {
    name: user ? `${user.firstName} ${user.lastName}` : "Utilisateur",
    username: user?.username || "username",
    profilePicture: user?.profilePicture || "",
    profileBanner: user?.profileBanner || "",
    followers: user?.followersCount || 0,
    following: user?.followingCount || 0,
    level: user?.level || 1,
  };

  const profileImage = displayUser.profilePicture || defaultProfile;
  const bannerImage = displayUser.profileBanner || defaultBanner;

  return (
    <div className="account-header">
      <div className="banner">
        <img className="banner-image" src={bannerImage} alt="Profile banner" />
      </div>

      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileImage} alt={displayUser.username} />
        </div>

        <div className="profile-details">
          <div className="user-header">
            <div className="user-container-flex d-flex ml-5">
              <div className="user-info ml-2">
                <h1 className="full-name">{displayUser.name}</h1>
                <span className="username">@{displayUser.username}</span>
              </div>
              <div className="level-tag ml-2">
                <span>Level {displayUser.level}</span>
                <div className="level-bar">
                  <div className="progress" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="user-stats">
            <div className="followers">
              <span className="count">{displayUser.followers}</span> followers
            </div>
            <div className="following">
              <span className="count">{displayUser.following}</span> following
            </div>
          </div>
        </div>
      </div>

      <div className="profile-dashboard">
        <div className="profile-header-row">
          <div className="title-block">
            <h2>
              Profile Dashboard <img src={ArrowProfileDashboard} alt="Arrow" />
            </h2>
            <StatusIndicator
              status={userStatus}
              isEditable={!!user?.userId}
              onStatusChange={handleStatusChange}
            />
          </div>

          <div className="profile-actions">
            <button className="share-btn">Share</button>
            <button className="more-btn">···</button>
          </div>
        </div>

        <div className="friends-list">
          {friends.slice(0, 5).map((friend, index) => (
            <img
              key={index}
              className="friend-avatar"
              src={friend.avatarUrl}
              alt={friend.name}
              title={friend.name}
            />
          ))}
          {friends.length > 5 && (
            <span className="more-friends">+{friends.length - 5} others</span>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AccountHeader;
