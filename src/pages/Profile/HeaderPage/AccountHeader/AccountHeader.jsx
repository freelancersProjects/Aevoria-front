import "./AccountHeader.scss";
import defaultBanner from "../../../../assets/images/17776072l.jpg";
import ArrowProfileDashboard from "../../../../assets/svg/arrow-profile-dashboard.svg";
import StatusIndicator from "../../../../components/AEV/AEV.StatusIndicator/StatusIndicator";
import defaultProfile from "../../../../assets/images/avatar.png";

const AccountHeader = () => {

  const user = {
    name: "Zara Lavigne",
    username: "zara_gamerX",
    profilePicture: "",
    profileBanner: "",
    followers: 1200,
    following: 300,
    level: 3,
  };

  const friends = [
    { name: "Eliot Hawke", avatarUrl: defaultProfile },
    { name: "Mila Stone", avatarUrl: defaultProfile },
    { name: "Jaron Cruz", avatarUrl: defaultProfile },
    { name: "Ayla Moon", avatarUrl: defaultProfile },
    { name: "Kai Rivers", avatarUrl: defaultProfile },
    { name: "Luna Ray", avatarUrl: defaultProfile },
    { name: "Theo Knight", avatarUrl: defaultProfile },
  ];

  const profileImage = user.profilePicture || defaultProfile;
  const bannerImage = user.profileBanner || defaultBanner;

  return (
    <div className="account-header">
      <div className="banner">
        <img className="banner-image" src={bannerImage} alt="Profile banner" />
      </div>

      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileImage} alt={user.username} />
        </div>

        <div className="profile-details">
          <div className="user-header">
            <div className="user-container-flex d-flex ml-5">
              <div className="user-info ml-2">
                <h1 className="full-name">{user.name}</h1>
                <span className="username">@{user.username}</span>
              </div>
              <div className="level-tag ml-2">
                <span>Level {user.level}</span>
                <div className="level-bar">
                  <div className="progress" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="user-stats">
            <div className="followers">
              <span className="count">{user.followers}</span> followers
            </div>
            <div className="following">
              <span className="count">{user.following}</span> following
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
            <StatusIndicator status='inactive' />
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
              x
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
    </div>
  );
};

export default AccountHeader;
