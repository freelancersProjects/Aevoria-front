import Dashboard from './Dashboard/Dashboard';
import Order from './Order/Order';
import Affiliation from './Affiliation/Affiliation';
import TabSwitcher from '../../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import './BottomPage.scss';

const BottomPage = () => {

  const tabs = [
    { label: 'Dashboard', key: 'dashboard', content: <Dashboard /> },
    { label: 'My Orders', key: 'orders', content: <Order /> },
    { label: 'Affiliation', key: 'affiliations', content: <Affiliation /> },
  ];

  return (
    <div className="bottom-page-container">
      <TabSwitcher
        tabs={tabs}
        onTabChange={() => {}}
        alignLeft={true}
      />
    </div>
  );
};

export default BottomPage;
