import React, { useState } from 'react';
import TextInput from '../../../../components/AEV/AEV.TextInput/TextInput';
import Checkbox from '../../../../components/AEV/AEV.Checkbox/CheckBox';
import TextArea from '../../../../components/AEV/AEV.TextArea/TextArea';
import UploadBox from '../../../../components/AEV/AEV.UploadBox/UploadBox';
import Button from '../../../../components/AEV/AEV.Button/Button';
import './CreateDeveloper.scss';

const CreateDeveloper = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addDescription, setAddDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [addWebsite, setAddWebsite] = useState(false);
  const [website, setWebsite] = useState('');
  const [addLogo, setAddLogo] = useState(false);
  const [logo, setLogo] = useState(null);

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      description: addDescription ? description : '',
      website: addWebsite ? website : '',
      logoUrl: addLogo ? logo : '',
    };
    console.log('Developer created:', payload);
  };

  return (
    <div className="create-dev-form">
      <h2>Créer un Développeur</h2>

      <div className="row">
        <TextInput label="Nom du développeur" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} />
      </div>


      {addDescription && <TextArea label="Description" value={description} onChange={setDescription} />}

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

      <Button text="Créer le développeur" onClick={handleSubmit} size="lg" />
    </div>
  );
};

export default CreateDeveloper;
