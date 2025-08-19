
import Dropdown from '../AEV/AEV.Dropdown/Dropdown';
import NumberInput from '../AEV/AEV.NumberInput/NumberInput';
import CheckBox from '../AEV/AEV.Checkbox/CheckBox';
import './GameFilters.scss';

const sortOptions = [
  'Les plus pertinents',
  'Prix croissant',
  'Prix décroissant',
  'Date de sortie',
  'Alphabétique',
  'Meilleures notes',
  'Plus populaires',
];

const genreOptions = [
  'Tous les genres',
  'Action',
  'Aventure',
  'RPG',
  'FPS',
  'Sport',
  'Course',
  'Stratégie',
  'Simulation',
  'Horreur',
  'Plateforme',
];

const platformOptions = [
  'Toutes les plateformes',
  'PC',
  'PlayStation',
  'Xbox',
  'Nintendo',
];

const availabilityOptions = [
  'Tout',
  'En stock',
  'Précommande',
  'Prochainement',
];

const GameFilters = ({
  selectedSort,
  setSelectedSort,
  selectedPlatform,
  setSelectedPlatform,
  selectedGenre,
  setSelectedGenre,
  selectedAvailability,
  setSelectedAvailability,
  priceRange,
  setPriceRange,
  inStock,
  setInStock,
  showAllFilters = true,
}) => {
  return (
    <div className="search-filters">
      <div className="filters-row">
        <div className="filter-group">
          <label>Trier par</label>
          <Dropdown
            value={selectedSort}
            options={sortOptions}
            onSelect={setSelectedSort}
            variant="primary"
          />
        </div>
        <div className="filter-group">
          <label>Genre</label>
          <Dropdown
            value={selectedGenre}
            options={genreOptions}
            onSelect={setSelectedGenre}
            variant="primary"
          />
        </div>
        <div className="filter-group">
          <label>Plateforme</label>
          <Dropdown
            value={selectedPlatform}
            options={platformOptions}
            onSelect={setSelectedPlatform}
            variant="primary"
          />
        </div>
      </div>
      {showAllFilters && (
        <div className="filters-row">
          <div className="filter-group">
            <label>Disponibilité</label>
            <Dropdown
              value={selectedAvailability}
              options={availabilityOptions}
              onSelect={setSelectedAvailability}
              variant="primary"
            />
          </div>
          <div className="filter-group price-filter">
            <label>Prix</label>
            <div className="price-inputs">
              <NumberInput
                value={priceRange[0].toString()}
                onChange={(val) => {
                  const value = parseInt(val);
                  if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
              />
              <span className="price-separator">-</span>
              <NumberInput
                value={priceRange[1].toString()}
                onChange={(val) => {
                  const value = parseInt(val);
                  if (!isNaN(value) && value >= priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
              />
            </div>
          </div>
          <div className="filter-group stock-filter">
            <CheckBox
              label="En stock uniquement"
              checked={inStock}
              onChange={setInStock}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFilters;
