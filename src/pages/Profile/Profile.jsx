import React from 'react'
import HeaderPage from './HeaderPage/HeaderPage'
import Dashboard from './BottomPage/Dashboard/Dashboard'
import './Profile.scss'
// import BottomPage from './BottomPage/BottomPage'

const Profile = () => {
  return (
    <div className="profile-container">
      <HeaderPage />
      <Dashboard />
    </div>
  )
}

export default Profile
