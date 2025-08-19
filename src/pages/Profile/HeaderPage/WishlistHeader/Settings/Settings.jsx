import { useState } from 'react';
import UploadBox from '../../../../../components/AEV/AEV.UploadBox/UploadBox';
import TextInput from '../../../../../components/AEV/AEV.TextInput/TextInput';
import TextArea from '../../../../../components/AEV/AEV.TextArea/TextArea';
import Button from '../../../../../components/AEV/AEV.Button/Button';
import './Settings.scss';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    bio: '',
  });

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la logique de sauvegarde
    console.log('Form data:', formData);
  };

  return (
    <div className="settings-root-wide">
      <div className="settings-upload-row">
        <div className="settings-upload-col">
          <div className="settings-upload-label">Bannière de profil</div>
          <UploadBox type="banner" />
        </div>
        <div className="settings-upload-col">
          <div className="settings-upload-label">Photo de profil</div>
          <UploadBox type="profile" />
        </div>
      </div>
      <form className="settings-form-fields-wide" onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange('username')}
        />
        <TextInput
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
        />
        <div style={{ display: 'flex', gap: 18 }}>
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="First name"
            style={{ flex: 1 }}
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Last name"
            style={{ flex: 1 }}
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
          />
        </div>
        <TextInput
          label="Password"
          name="password"
          placeholder="New password"
          type="password"
          value={formData.password}
          onChange={handleInputChange('password')}
        />
        <TextArea
          label="Bio"
          name="bio"
          placeholder="Tell us about yourself..."
          rows={3}
          value={formData.bio}
          onChange={handleInputChange('bio')}
        />
        <Button className="settings-save-btn" type="submit" variant="primary">Save Changes</Button>
      </form>
    </div>
  );
};

export default Settings;

