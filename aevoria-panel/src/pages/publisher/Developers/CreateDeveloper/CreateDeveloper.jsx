import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../../../components/AEV/AEV.TextInput/TextInput';
import Checkbox from '../../../../components/AEV/AEV.Checkbox/CheckBox';
import TextArea from '../../../../components/AEV/AEV.TextArea/TextArea';
import UploadBox from '../../../../components/AEV/AEV.UploadBox/UploadBox';
import Button from '../../../../components/AEV/AEV.Button/Button';
import Toast from '../../../../components/AEV/AEV.Toast/Toast';
import './CreateDeveloper.scss';

const CreateDeveloper = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [addWebsite, setAddWebsite] = useState(false);
  const [website, setWebsite] = useState('');
  const [addLogo, setAddLogo] = useState(false);
  const [logo, setLogo] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const resetForm = () => {
    setName('');
    setEmail('');
    setDescription('');
    setWebsite('');
    setLogo(null);
    setAddDescription(false);
    setAddWebsite(false);
    setAddLogo(false);
  };

  const handleSubmit = async (redirect = false) => {
    const token = localStorage.getItem('token');
    const payload = {
      name,
      email,
      description: addDescription ? description : '',
      website: addWebsite ? website : '',
      logoUrl: addLogo ? logo : '',
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/developers`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de la création');
      }

      setToast({ show: true, message: '✅ Développeur créé avec succès !', type: 'success' });

      if (redirect) {
        setTimeout(() => navigate('/developers'), 1000);
      } else {
        resetForm();
      }
    } catch (err) {
      setToast({ show: true, message: `❌ ${err.message}`, type: 'error' });
    }
  };

  return (
    <div className="create-dev-form">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={4000}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2>Créer un Développeur</h2>

      <div className="row">
        <TextInput label="Nom du développeur" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} />
      </div>

      <Checkbox
        label="Ajouter une description ?"
        checked={addDescription}
        onChange={() => setAddDescription(!addDescription)}
      />
      {addDescription && (
        <TextArea label="Description" value={description} onChange={setDescription} />
      )}

      <Checkbox
        label="Ajouter un site web ?"
        checked={addWebsite}
        onChange={() => setAddWebsite(!addWebsite)}
      />
      {addWebsite && <TextInput label="Site web" value={website} onChange={setWebsite} />}

      <Checkbox
        label="Ajouter un logo ?"
        checked={addLogo}
        onChange={() => setAddLogo(!addLogo)}
      />
      {addLogo && (
        <div className="logo-upload">
          <UploadBox onUpload={(file) => setLogo(file)} accept="image/*" />
        </div>
      )}

      <div className="button-row">
        <Button text="Créer et continuer" onClick={() => handleSubmit(false)} size="lg" />
        <Button text="Créer et revenir" onClick={() => handleSubmit(true)} size="lg" variant="transparent" />
      </div>
    </div>
  );
};

export default CreateDeveloper;
