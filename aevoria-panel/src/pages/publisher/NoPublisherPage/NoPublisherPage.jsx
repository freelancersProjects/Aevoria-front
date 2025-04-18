import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || user?.sub || user?.user_id;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkPublisherExists = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/publishers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const publishers = await res.json();
        const exists = Array.isArray(publishers) && publishers.some(pub => pub.user_id === userId);

        if (exists) {
          const publisher = publishers.find(pub => pub.user_id === userId);
          setApiKey(publisher.api_key);
          setSubmitted(true);
        }
      } catch (err) {
        console.error("Erreur lors de la vérification des publishers", err);
      } finally {
        setLoading(false);
      }
    };

    checkPublisherExists();
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);

    const generatedKey = generateApiKey();
    setTimeout(async () => {
      const payload = {
        name,
        email,
        website,
        logo_url: "",
        ApiKey: generatedKey,
        user_id: userId,
        is_verified: false,
        created_at: new Date().toISOString()
      };

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/publishers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Erreur lors de la création du publisher');

        const result = await res.json();
        const returnedKey = result?.api_key || generatedKey;

        setApiKey(returnedKey);
        setSubmitted(true);
      } catch (err) {
        console.error("Erreur :", err);
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

      {loading ? (
        <Loader text="Chargement..." variant="logo" />
      ) : submitted ? (
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
      ) : (
        <form className="publisher-form" onSubmit={handleSubmit}>
          <TextInput label="Nom de l’éditeur *" value={name} onChange={setName} required />
          <TextInput label="Email *" value={email} onChange={setEmail} required />
          <TextInput label="Site Web *" value={website} onChange={setWebsite} required />

          {isGenerating ? (
            <Loader text="Génération de la clé API..." variant="logo" />
          ) : (
            <div className="submit-container">
              <Button text="Valider l’enregistrement" type="submit" />
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default NoPublisherPage;
