
import useFetch from '../../../hooks/useFetch';
import './Banner.scss';
import Toast from '../../../components/AEV/AEV.Toast/Toast';
import Button from '../../../components/AEV/AEV.Button/Button';
import Loader from '../../../components/AEV/AEV.Loader/Loader';

const Banner = () => {
  const { data, loading, error } = useFetch('/banners');

  if (loading) return <Loader variant="logo" />;
  if (error) return <Toast type="error" message="Erreur lors du chargement de la bannière" />;
  if (!data || !data.$values || data.$values.length === 0) return null;

  const banner = data.$values.find(b => b.isActive && new Date(b.expiresAt) > new Date());
  if (!banner) return null;

  return (
    <div className="banner-container mb-2">
      <div className="banner-background" style={{ backgroundImage: `url(${banner.imageUrl})` }} />
      <div className="banner-content">
        <h2 className="banner-title">{banner.title}</h2>
        <p className="banner-description">{banner.description}</p>
        <Button text="Explorer" variant="outline" size="large" />
      </div>
    </div>
  );
};

export default Banner;
