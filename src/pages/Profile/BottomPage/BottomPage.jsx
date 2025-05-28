import React, { useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import Order from './Order/Order';
import Affiliation from './Affiliation/Affiliation';
import TabSwitcher from '../../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import './BottomPage.scss';

const BottomPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { label: 'Dashboard', key: 'dashboard', content: <Dashboard /> },
    { label: 'My Orders', key: 'orders', content: <Order /> },
    { label: 'Affiliation', key: 'affiliations', content: <Affiliation /> },
  ];

  return (
    <div className="bottom-page-container">
      <TabSwitcher
        tabs={tabs}
        onTabChange={setActiveTab}
        alignLeft={true}
      />
    </div>
  );
};

export default BottomPage;
