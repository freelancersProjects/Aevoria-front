import { useState } from 'react';
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
import QuantitySelector from '../../components/AEV/AEV.QuantitySelector/QuantitySelector';
import Popup from '../../components/AEV/AEV.Popup/Popup';
import Button from '../../components/AEV/AEV.Button/Button';
import SliderSelector from '../../components/AEV/AEV.SliderSelector/SliderSelector';
import Image from '../../components/AEV/AEV.Image/Image';
import Drawer from '../../components/AEV/AEV.Drawer/Drawer';
import TextArea from '../../components/AEV/AEV.TextArea/TextArea';
import CodeInput from '../../components/AEV/AEV.CodeInput/CodeInput';
import ClipboardInput from '../../components/AEV/AEV.ClipboardInput/ClipboardInput';
import NumberInput from '../../components/AEV/AEV.NumberInput/NumberInput';
import SearchBar from '../../components/AEV/AEV.SearchBar/SearchBar';
import ColorPicker from '../../components/AEV/AEV.ColorPicker/ColorPicker';
import HoverReveal from '../../components/AEV/AEV.HoverReveal/HoverReveal';
import CurrencyInput from '../../components/AEV/AEV.CurrencyInput/CurrencyInput';
import Rating from '../../components/AEV/AEV.Rating/Rating';
import RadioGroup from '../../components/AEV/AEV.RadioGroup/RadioGroup';

import DestinataireInput from '../../components/AEV/AEV.DestinataireInput/DestinataireInput';
import Pagination from '../../components/AEV/AEV.Pagination/Pagination';

import './DemoForm.scss';

import { FaRocket, FaStar, FaTrophy, FaFighterJet, FaMagic, FaShieldAlt } from 'react-icons/fa';
import Link from '../../components/AEV/AEV.Link/Link';

const DemoForm = () => {
  const [isOpen, setIsOpen] = useState(true);

  // States partagés
  const [username, setUsername] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [answer, setAnswer] = useState('Non');
  const [selectedPill, setSelectedPill] = useState(['popular']);
  const [selectedClass, setSelectedClass] = useState([]);
  const [game, setGame] = useState('');
  const [intensity, setIntensity] = useState(4);
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bio, setBio] = useState('');
  const [amount, setAmount] = useState('0');
  const [searchQuery, setSearchQuery] = useState('');
  const [color, setColor] = useState('#00bfff');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(3.5);
  const [selectedPlatform, setSelectedPlatform] = useState('pc');
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Données diverses
  const steps = ['Account Info', 'Preferences', 'Verification', 'Finish', 'Payment', 'Review', 'Confirmation', 'Complete'];
  const events = [
    { date: 'Jan 2024', title: 'Account Created', description: 'You joined the Aevoria platform.', icon: <FaRocket />, status: 'done' },
    { date: 'Feb 2024', title: 'First Purchase', description: 'First order placed 🎉', icon: <FaStar />, status: 'done' },
    { date: 'Mar 2024', title: 'Level 5', description: 'Unlocked “Rising Star” badge.', icon: <FaTrophy />, status: 'active' },
    { date: 'April 2024', title: 'Invited Friends', description: 'Referral bonus coming soon!', status: 'upcoming' },
  ];
  const data = [
    { label: 'Jan', value: 1000 },
    { label: 'Feb', value: 2300 },
    { label: 'Mar', value: 1800 },
    { label: 'Apr', value: 3200 },
    { label: 'May', value: 2700 },
  ];
  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Popular', value: 'popular' },
    { label: 'New', value: 'new' },
    { label: 'XP+', value: 'xp' },
  ];
  const classOptions = [
    { label: 'Warrior', value: 'warrior', icon: <FaShieldAlt /> },
    { label: 'Mage', value: 'mage', icon: <FaMagic /> },
    { label: 'Rogue', value: 'rogue', icon: <FaFighterJet /> },
  ];
  const optionsDrop = [
    { label: 'Elden Ring', value: 'elden' },
    { label: 'Valorant', value: 'valorant' },
    { label: 'Cyberpunk 2077', value: 'cyberpunk' },
    { label: 'Baldur’s Gate 3', value: 'bg3' },
    { label: 'Skyrim', value: 'skyrim' },
  ];
  const slides = [
    { image: 'https://picsum.photos/seed/1/400/250', title: 'Game One' },
    { image: 'https://picsum.photos/seed/2/400/250', title: 'Game Two' },
    { image: 'https://picsum.photos/seed/3/400/250', title: 'Game Three' },
    { image: 'https://picsum.photos/seed/4/400/250', title: 'Game Four' },
  ];

  const tabSections = [
    {
      label: 'Inputs',
      content: (
        <div className="tab-section">
          <h3>Form Components</h3>
          <TextInput label="Username" value={username} onChange={setUsername} placeholder="Enter your username" />
          <Dropdown label="Game" value={selectedGame} options={optionsDrop.map(o => o.label)} onSelect={setSelectedGame} />
          <SearchableDropdown options={optionsDrop} value={game} onSelect={setGame} placeholder="Choose your game" />
          <DatePicker value={birthDate} onChange={setBirthDate} placeholder="Select birth date" />
          <QuantitySelector value={qty} onChange={setQty} min={1} max={10} />
          <Checkbox label="Accept terms" checked={agreed} onChange={setAgreed} />
          <Switch label="Enable notifications" checked={notificationsEnabled} onChange={setNotificationsEnabled} />
          <TextArea
            label="Your Bio"
            placeholder="Tell us about your gaming journey..."
            value={bio}
            onChange={(val) => setBio(val)}
            maxLength={300}
            isResizable={true}
          />
          <CurrencyInput
            label="Game Price"
            value={price}
            onChange={setPrice}
            symbol="€"
            tooltip={`This is approximately ${price ? (parseFloat(price) * 1.07).toFixed(2) + ' USD' : '0 USD'}`}
          />
          <RadioGroup
            name="platform"
            options={[
              { label: 'PC', value: 'pc' },
              { label: 'PlayStation', value: 'ps' },
              { label: 'Xbox', value: 'xbox' },
            ]}
            selected={selectedPlatform}
            onChange={setSelectedPlatform}
          />
          <DestinataireInput recipients={recipients} onChange={setRecipients} />

          <ColorPicker value={color} onChange={setColor} />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={(val) => console.log('Search:', val)}
            placeholder="Search for games, friends, or events..."
          />
          <CodeInput
            length={6}
            onComplete={(code) => console.log('Code entered:', code)}
          />
          <ClipboardInput
            label="Your referral code"
            value="AEV-3941-REWARD"
          />
          <NumberInput
            label="Amount"
            value={amount}
            onChange={setAmount}
            placeholder="Enter a number"
          />
        </div>
      ),
    },
    {
      label: 'Visuals',
      content: (
        <div className="tab-section">
          <h3>Graph & Steps</h3>
          <StatGraph data={data} />
          <StepProgress steps={steps} currentStep={4} />
          <Timeline events={events} />
          <CountdownTimer targetDate={new Date('2025-04-18T18:00:00')} label="Next Drop In" />
          <InteractiveGauge value={intensity} onChange={setIntensity} min={1} max={40} step={1} unit="" />
          <HoverReveal
            image="https://picsum.photos/id/1015/600/400"
            title="Secret Card"
            revealContent={<p>Legendary Artifact Unlocked</p>}
          />
          <Link
            href="https://store.steampowered.com/app/1245620/Elden_Ring/"
            label="Voir sur Steam"
            info="Redirection sécurisée vers Steam"
            hoverInfo={true}
          />
        </div>
      ),
    },
    {
      label: 'Interaction',
      content: (
        <div className="tab-section">
          <h3>Choices & Actions</h3>
          <ChoiceSwitch options={['Non', 'Oui']} selected={answer} onChange={setAnswer} size="md" />
          <GridSelector options={classOptions} selected={selectedClass} onSelect={setSelectedClass} multi={true} />
          <ContextMenu />
          <PillSelector options={categories} selected={selectedPill} onSelect={setSelectedPill} multi />
          <Rating value={rating} onChange={setRating} interactive={true} />
          <SliderSelector
            slides={slides}
            autoPlay={true}
            interval={4000}
            loop={true}
            showMultiple={3}
            cropOverflow={true}
            clickable={true}
            onSlideClick={(slide) => console.log('Clicked slide:', slide)}
          />
          <Image
            src="https://picsum.photos/seed/20/800/500"
            alt="Mysterious Mountain"
            description="Captured at sunrise — this misty ridge inspired the zone in Eldoria."
            clickable={true}
          />
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
      ),
    },
    {
      label: 'Files',
      content: (
        <div className="tab-section">
          <h3>Upload</h3>
          <UploadBox onUpload={setUploadedFile} accept="image/*" />
          {uploadedFile && (
            <div className="uploaded-file-preview">
              <h4>Fichier uploadé :</h4>
              <pre>{JSON.stringify(uploadedFile, null, 2)}</pre>
            </div>
          )}
        </div>
      ),
    },
    {
      label: 'Misc',
      content: (
        <div className="tab-section">
          <h3>Toast Example</h3>
          {/* <Toast message="This is an info toast." type="info" duration={8000} /> */}
          <Toast message="This is a success toast." type="success" duration={8000} />
          {/* <Toast message="This is a warning toast." type="warning" duration={8000} /> */}
          {/* <Toast message="This is an error toast." type="error" duration={8000} /> */}
          {showPopup && (
            <Popup
              message="Are you sure you want to delete this item?"
              onConfirm={() => {
                console.log('Confirmed');
                setShowPopup(false);
              }}
              onCancel={() => setShowPopup(false)}
              confirmLabel="Delete"
              cancelLabel="Keep"
            />
          )}
          <Button text="Show Popup" variant="transparent" size="medium" onClick={() => setShowPopup(true)} />
          <Button
            text="Afficher Drawer"
            variant="primary"
            size="medium"
            onClick={() => setOpenDrawer(true)}
          />
          <Drawer
            isOpen={openDrawer}
            onClose={() => setOpenDrawer(false)}
            position="left"
            title="Game Settings"
            subtitle="Customize your experience"
          >
            <TextInput label="Name your character" placeholder="Enter a name" />
            <Checkbox label="Enable Hardcore Mode" />
          </Drawer>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h4 className="title-center title-modal">Aevoria UI Components Demo</h4>
        <TabSwitcher tabs={tabSections} />
      </Modal>
    </>
  );
};

export default DemoForm;
