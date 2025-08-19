import { useState } from 'react';
import PropTypes from 'prop-types';
import './Image.scss';

const Image = ({ src, alt = '', description = '', clickable = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`aev-img-preview ${clickable ? 'clickable' : ''}`}
        onClick={() => clickable && setIsOpen(true)}
      >
        <img src={src} alt={alt} />
      </div>

      {isOpen && (
        <div className="aev-img-modal">
          <div className="img-modal-content">
            <div className="img-left">
              <img src={src} alt={alt} />
            </div>
            <div className="img-right">
              <div className="img-info">
                <h2 className="img-title">{alt || 'Image Preview'}</h2>
                {description && <p className="img-description">{description}</p>}
              </div>
            </div>
            <button className="img-close" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  description: PropTypes.string,
  clickable: PropTypes.bool,
};

export default Image;
