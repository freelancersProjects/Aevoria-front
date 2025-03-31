import React, { useState } from 'react';
import Modal from '../../components/AEV/AEV.Modal/Modal';
import Dropdown from '../../components/AEV/AEV.Dropdown/Dropdown';
import TextInput from '../../components/AEV/AEV.TextInput/TextInput';
import DatePicker from '../../components/AEV/AEV.DatePicker/DatePicker';
import Checkbox from '../../components/AEV/AEV.Checkbox/CheckBox';
import Switch from '../../components/AEV/AEV.Switch/Switch';
import StatGraph from '../../components/AEV/AEV.StatGraph/StatGraph';
import StepProgress from '../../components/AEV/AEV.StepProgress/StepProgress';
import ChoiceSwitch from '../../components/AEV/AEV.ChoiceSwitch/ChoiceSwitch';
import TabSwitcher from '../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import Timeline from '../../components/AEV/AEV.Timeline/Timeline';
import CountdownTimer from '../../components/AEV/AEV.CountdownTimer/CountdownTimer';
import InteractiveGauge from '../../components/AEV/AEV.InteractiveGauge/InteractiveGauge';
import ContextMenu from '../../components/AEV/AEV.ContextMenu/ContextMenu';
import GridSelector from '../../components/AEV/AEV.GridSelector/GridSelector';
import UploadBox from '../../components/AEV/AEV.UploadBox/UploadBox';
import SearchableDropdown from '../../components/AEV/AEV.SearchableDropdown/SearchableDropdown';
import Toast from '../../components/AEV/AEV.Toast/Toast';
import PillSelector from '../../components/AEV/AEV.PillSelector/PillSelector';

import { FaRocket, FaStar, FaTrophy, FaFighterJet, FaMagic, FaShieldAlt } from 'react-icons/fa';


const DemoForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedPill, setSelectedPill] = useState(['popular']);

  const data = [
    { label: 'Jan', value: 1000 },
    { label: 'Feb', value: 2300 },
    { label: 'Mar', value: 1800 },
    { label: 'Apr', value: 3200 },
    { label: 'May', value: 2700 },
  ];
  const [intensity, setIntensity] = useState(47);
  const steps = [
    'Account Info',
    'Preferences',
    'Verification',
    'Finish',
    'Payment',
    'Review',
    'Confirmation',
    'Complete'
  ];

  const [answer, setAnswer] = useState('Non');
  const tabs = [
    {
      label: 'Dashboard',
      content: <div>Dashboard content goes here</div>,
    },
    {
      label: 'My Orders',
      content: <div>Order history & tracking</div>,
    },
    {
      label: 'Affiliation',
      content: <div>Referral links & stats</div>,
    },
  ];
  const events = [
    {
      date: 'Jan 2024',
      title: 'Account Created',
      description: 'You joined the Aevoria platform. Welcome!',
      icon: <FaRocket />,
      status: 'done',
    },
    {
      date: 'Feb 2024',
      title: 'First Purchase',
      description: 'You placed your first order 🎉',
      icon: <FaStar />,
      status: 'done',
    },
    {
      date: 'Mar 2024',
      title: 'Reached Level 5',
      description: 'You unlocked the “Rising Star” badge.',
      icon: <FaTrophy />,
      status: 'active',
    },
    {
      date: 'April 2024',
      title: 'Invited 3 Friends',
      description: 'Referral bonus incoming!',
      status: 'upcoming',
    },
  ];

  const [selected, setSelected] = useState([]);
  const [game, setGame] = useState('');

  const optionsDrop = [
    { label: 'Elden Ring', value: 'elden' },
    { label: 'Valorant', value: 'valorant' },
    { label: 'Cyberpunk 2077', value: 'cyberpunk' },
    { label: 'Baldur’s Gate 3', value: 'bg3' },
    { label: 'Skyrim', value: 'skyrim' }
  ];

  const options = [
    { label: 'Warrior', value: 'warrior', icon: <FaShieldAlt /> },
    { label: 'Mage', value: 'mage', icon: <FaMagic /> },
    { label: 'Rogue', value: 'rogue', icon: <FaFighterJet /> }
  ];
  const [uploadedFile, setUploadedFile] = useState(null);
  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Popular', value: 'popular' },
    { label: 'New', value: 'new' },
    { label: 'XP+', value: 'xp' }
  ];
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Toast message="Your settings have been saved" type="info" duration="50000" />
        <h2 className="title-center">Join Aevoria</h2>

        <div className="form-grid">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={setUsername}
          />

          <Dropdown
            label="Select game"
            value={selectedGame}
            options={['Cyberpunk', 'Valorant', 'Elden Ring']}
            onSelect={setSelectedGame}
            size="sm"
          />
          <SearchableDropdown
            options={optionsDrop}
            value={game}
            onSelect={setGame}
            placeholder="Choose your game"
          />
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="Birth date"
          />
        </div>

        <Checkbox
          label="I accept the terms"
          checked={agreed}
          onChange={setAgreed}
        />
        <ChoiceSwitch
          options={['Non', 'Oui']}
          selected={answer}
          onChange={setAnswer}
          size="md"
        />
        <Switch
          label="Enable notifications"
          checked={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
        <StatGraph data={data} />
        <StepProgress steps={steps} currentStep={4} />
        <TabSwitcher tabs={tabs} />
        <Timeline events={events} />
        <CountdownTimer targetDate={new Date('2025-04-18T18:00:00')} label="Next Drop In" />

        <InteractiveGauge
          value={intensity}
          onChange={setIntensity}
          unit="%"
          valuePosition="above"
        />

        <ContextMenu />
        <GridSelector
          options={options}
          selected={selected}
          onSelect={setSelected}
        />
        <UploadBox onUpload={(file) => setUploadedFile(file)} accept="image/*" />
        <PillSelector
          options={categories}
          selected={selectedPill}
          onSelect={setSelectedPill}
          multi={true}
        />
      </Modal>

    </>
  );
};

export default DemoForm;
