import React, { useState } from "react";
import "./ApiKey.scss";
import ClipboardInput from "../../../components/AEV/AEV.ClipboardInput/ClipboardInput";
import { FaRedo } from "react-icons/fa";

const mockHistory = [
    { key: "aev_7fa23a2d", date: "2024-12-12 14:23" },
    { key: "aev_5e9f1b7a", date: "2024-08-02 09:48" },
    { key: "aev_29c5ea3d", date: "2024-06-30 18:12" },
];

const ApiKey = () => {
    const [apiKey, setApiKey] = useState("aev_live_3n9d7r1b8f3c");
    const [history, setHistory] = useState(mockHistory);

    const handleGenerateNewKey = () => {
        const newKey = `aev_${Math.random().toString(36).substring(2, 12)}`;
        const now = new Date().toLocaleString();
        setHistory([{ key: apiKey, date: now }, ...history]);
        setApiKey(newKey);
    };

    const handleSelectHistory = (selectedKey) => {
        setApiKey(selectedKey);
    };

    return (
        <div className="aev-apikey-v2">
            <div className="key-top-row">
                <h2 className="gradient-title">Clé API Actuelle</h2>
                <button className="refresh-btn" onClick={handleGenerateNewKey}>
                    <FaRedo />
                    Générer nouvelle clé
                </button>
            </div>

            <ClipboardInput value={apiKey} onChange={setApiKey} />

            <h3 className="gradient-subtitle">Historique des clés</h3>
            <div className="history-grid">
                {history.map((item, index) => (
                    <div key={index} className="history-item" onClick={() => handleSelectHistory(item.key)}>
                        <div className="key">{item.key}</div>
                        <div className="timestamp">{item.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApiKey;
