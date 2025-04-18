import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../../../src/components/AEV/AEV.Table/Table';
import Toast from '../../../components/AEV/AEV.Toast/Toast';
import './Developers.scss';

const Developers = () => {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/developers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await res.text();
        if (!text) throw new Error("Réponse vide du serveur");

        const raw = JSON.parse(text);
        const values = raw?.$values || raw;

        if (!Array.isArray(values)) throw new Error("Format inattendu");

        const formatted = values.map(dev => ({
          ...dev,
          created_at: dev.created_at ? new Date(dev.created_at).toLocaleDateString() : '-'
        }));

        setDevelopers(formatted);
      } catch (err) {
        setToast({
          show: true,
          message: `Erreur chargement : ${err.message}`,
          type: 'error',
        });
      }
    };

    fetchDevelopers();
  }, [token]);

  const handleDelete = async (selectedIndexes) => {
    const toDelete = selectedIndexes.map(i => developers[i]).filter(Boolean); // 👈 sécurisation
    let successCount = 0;

    for (const dev of toDelete) {
      try {
        if (!dev?.developer_id) throw new Error("ID manquant");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/developers/${dev.developer_id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Échec suppression de ${dev.name}`);

        successCount++;
      } catch (err) {
        setToast({
          show: true,
          message: `Erreur suppression : ${err.message}`,
          type: 'error',
        });
      }
    }

    if (successCount > 0) {
      const updated = developers.filter((_, i) => !selectedIndexes.includes(i));
      setDevelopers(updated);

      setToast({
        show: true,
        message: `✅ ${successCount} développeur(s) supprimé(s)`,
        type: 'success',
      });
    }
  };

  const columns = [
    { label: 'Nom', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Site web', key: 'website' },
    { label: 'Créé le', key: 'created_at' },
  ];

  return (
    <div className="developers-page">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={4000}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}

      <h2 className="developers-title">Liste des développeurs</h2>

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
