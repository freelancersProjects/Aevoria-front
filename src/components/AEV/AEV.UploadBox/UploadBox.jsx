import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaFolder } from 'react-icons/fa';
import './UploadBox.scss';

const UploadBox = ({ onUpload, accept = '*' }) => {
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
        >
            {file ? (
                <div className="file-preview">
                    {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt="preview" />
                    ) : (
                        <p>{file.name}</p>
                    )}
                    <span className="change-label">Click to replace</span>
                </div>
            ) : (
                <div className="upload-instructions">
                    <p><FaFolder /> Drag and drop here</p>
                    <p className="sub">or click to browse</p>
                </div>
            )}
            <input type="file" onChange={handleFileChange} accept={accept} />
        </div>
    );
};

UploadBox.propTypes = {
    onUpload: PropTypes.func.isRequired,
    accept: PropTypes.string,
};

export default UploadBox;
