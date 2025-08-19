import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUpload } from 'react-icons/fa';
import './UploadBox.scss';

const UploadBox = ({ onUpload, accept = '*', maxSize = '5MB', acceptedFormats = ['PNG', 'JPG', 'WEBP'] }) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onUpload(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  return (
    <div
      className={`aev-upload-box ${dragOver ? 'dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      {file ? (
        <div className="file-preview">
          {file.type.startsWith('image/') ? (
            <>
              <div className="preview-circle">
                <img src={URL.createObjectURL(file)} alt="preview" />
              </div>
              <div className="file-info">
                <h3>{file.name}</h3>
                <p>Cliquez pour changer d'image</p>
              </div>
            </>
          ) : (
            <>
              <div className="preview-circle">
                <FaUpload className="upload-icon" />
              </div>
              <div className="file-info">
                <h3>{file.name}</h3>
                <p>Cliquez pour changer de fichier</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="upload-circle">
            <FaUpload className="upload-icon" />
          </div>
          <div className="upload-text">
            <h3>Glissez et déposez votre fichier ici</h3>
            <p>ou cliquez pour parcourir vos fichiers</p>
          </div>
          <div className="upload-info">
            <span>Formats acceptés : {acceptedFormats.join(', ')}</span>
            <span>Taille maximale : {maxSize}</span>
          </div>
        </>
      )}
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        accept={accept}
        style={{ display: 'none' }}
      />
    </div>
  );
};

UploadBox.propTypes = {
  onUpload: PropTypes.func.isRequired,
  accept: PropTypes.string,
  maxSize: PropTypes.string,
  acceptedFormats: PropTypes.arrayOf(PropTypes.string),
};

export default UploadBox;
