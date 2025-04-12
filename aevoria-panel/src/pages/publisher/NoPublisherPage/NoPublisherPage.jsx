import React, { useState } from 'react';
import TextInput from '../../../components/AEV/AEV.TextInput/TextInput';
import Button from '../../../components/AEV/AEV.Button/Button';
import Loader from '../../../components/AEV/AEV.Loader/Loader';
import ClipboardInput from '../../../components/AEV/AEV.ClipboardInput/ClipboardInput';
import { useNavigate } from 'react-router-dom';
import './NoPublisherPage.scss';

const generateApiKey = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const NoPublisherPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleGenerateAndSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const generatedKey = generateApiKey();

    setTimeout(async () => {
      setApiKey(generatedKey);

      const payload = {
        name,
        email,
        website,
        api_key: generatedKey,
        user_id: user?.id,
        created_at: new Date().toISOString(),
      };

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/publishers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Erreur lors de la création du publisher');
        setSubmitted(true);
      } catch (err) {
        console.error('❌ Erreur :', err);
        setError('Erreur lors de la création.');
      } finally {
        setIsGenerating(false);
      }
    }, 3000);
  };

  return (
    <div className="no-publisher-page">
      <div className="info-section">
        <h1 className="font-montserrat">Bienvenue sur votre espace éditeur</h1>
        <p>
          Pour accéder à votre espace, vous devez créer un éditeur. Un identifiant unique (clé API)
          vous sera généré automatiquement.
        </p>
      </div>

      <form className="publisher-form" onSubmit={handleGenerateAndSubmit}>
        <TextInput label="Nom de l’éditeur *" value={name} onChange={setName} required />
        <TextInput label="Email *" value={email} onChange={setEmail} required />
        <TextInput label="Site Web *" value={website} onChange={setWebsite} required />

        {isGenerating && <Loader text="Génération de la clé API..." variant="logo" />}

        {submitted && apiKey && (
          <div className="api-key-result">
            <h4 className="font-montserrat">Clé API générée :</h4>
            <ClipboardInput value={apiKey} />
            <div className="api-actions">
              <Button
                text="À quoi sert cette clé ?"
                onClick={() => navigate('/api-key')}
                variant="transparent"
                size="small"
              />
            </div>
          </div>
        )}

        {!submitted && !isGenerating && (
          <div className="submit-container">
            <Button text="Valider l’enregistrement" type="submit" />
          </div>
        )}

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default NoPublisherPage;
