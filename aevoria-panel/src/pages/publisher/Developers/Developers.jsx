import React from 'react';
import './Developers.scss';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fakeDevelopers = [
  {
    id: 1,
    name: 'ShadowByte Studios',
    email: 'contact@shadowbyte.com',
    joined: 'Jan 2024',
  },
  {
    id: 2,
    name: 'IronCore Games',
    email: 'support@ironcore.gg',
    joined: 'Feb 2024',
  },
  {
    id: 3,
    name: 'PixelForge Inc.',
    email: 'hello@pixelforge.dev',
    joined: 'Mar 2024',
  },
];

const Developers = () => {
  const navigate = useNavigate();

  return (
    <div className="developers-page">
      <div className="dev-header">
        <h2>Registered Developers</h2>
        <button onClick={() => navigate('/developers/create')}>
          <FaPlus /> Add Developer
        </button>
      </div>

      <div className="dev-list">
        {fakeDevelopers.map((dev) => (
          <div className="dev-card" key={dev.id}>
            <div className="dev-info">
              <h3>{dev.name}</h3>
              <p>{dev.email}</p>
              <span className="joined">Joined: {dev.joined}</span>
            </div>
            <div className="dev-actions">
              <button className="view">View</button>
              <button className="edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
