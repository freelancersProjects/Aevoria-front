import { useState } from 'react';
import HeaderPage from './HeaderPage/HeaderPage';
import BottomPage from './BottomPage/BottomPage';
import Settings from './HeaderPage/WishlistHeader/Settings/Settings';
import './Profile.scss';

const Profile = () => {
  const [activeSidebarTab, setActiveSidebarTab] = useState('profile');

  return (
    <div className="profile-container">
      <HeaderPage activeSidebarTab={activeSidebarTab} setActiveSidebarTab={setActiveSidebarTab} />
      <div className="bottom-content-wrapper">
        {activeSidebarTab === 'settings' ? <Settings /> : <BottomPage />}
      </div>
    </div>
  );
};

export default Profile;
