import React, { useState } from 'react';
import Table from '../../../../../src/components/AEV/AEV.Table/Table';
import { useNavigate } from 'react-router-dom';
import './Developers.scss';

const Developers = () => {
  const navigate = useNavigate();

  const [developers, setDevelopers] = useState([
    {
      name: 'Alex Mercer',
      role: 'Dev Lead',
      email: 'alex@aevoria.gg',
      status: 'Active'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    },
    {
      name: 'Sarah Blaze',
      role: 'Game Designer',
      email: 'sarah@aevoria.gg',
      status: 'Pending'
    }
  ]);

  const handleDelete = (selectedIndexes) => {
    const newList = developers.filter((_, idx) => !selectedIndexes.includes(idx));
    setDevelopers(newList);
  };

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Role', key: 'role' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' }
  ];

  return (
    <div className="developers-page">
      <h2 className="developers-title">Developer List</h2>
      <Table
        columns={columns}
        rows={developers}
        onAdd={() => navigate('/developers/create')}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Developers;
