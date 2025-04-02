import { useState } from 'react';
import './ClipboardInput.scss';

const ClipboardInput = ({ value, label, placeholder = 'Copy code' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    return (
        <div className="aev-clipboard-input">
            {label && <label className="clipboard-label">{label}</label>}
            <div className="clipboard-box">
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    readOnly
                    className="clipboard-field"
                />
                <button className="clipboard-btn" onClick={handleCopy}>
                    {!copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" strokeWidth="1.5" d="M9 5H7A2 2 0 0 0 5 7v10a2 2 0 0 0 2 2h2" />
                            <rect width="12" height="14" x="9" y="5" stroke="white" strokeWidth="1.5" rx="2" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ClipboardInput;
