import React from "react";
import "./Sales.scss";
import Table from "../../../../../src/components/AEV/AEV.Table/Table";

const Sales = () => {
    const metrics = [
        { label: "Revenu total", value: "$124,893", growth: "+14%" },
        { label: "Ventes nettes", value: "$102,478", growth: "+11%" },
        { label: "Remboursements", value: "$5,340", growth: "-3%" },
        { label: "Panier moyen", value: "$22.35", growth: "+5%" },
    ];

    const columns = [
        { label: "Date", key: "date" },
        { label: "Jeu", key: "game" },
        { label: "Plateforme", key: "platform" },
        { label: "Quantité", key: "qty" },
        { label: "Prix", key: "price" },
        { label: "Total", key: "total" },
        { label: "Statut", key: "status" },
    ];

    const rows = [
        {
            date: "2025-04-07",
            game: "Elden Ring",
            platform: "Steam",
            qty: 3,
            price: "$49.99",
            total: "$149.97",
            status: "Payé",
        },
        {
            date: "2025-04-06",
            game: "Valorant XP Pack",
            platform: "Riot",
            qty: 5,
            price: "$9.99",
            total: "$49.95",
            status: "Remboursé",
        },
        {
            date: "2025-04-06",
            game: "Cyberpunk 2077",
            platform: "GOG",
            qty: 2,
            price: "$29.99",
            total: "$59.98",
            status: "Payé",
        },
    ];

    return (
        <div className="sales-page">
            <h1 className="sales-title">Statistiques des Ventes</h1>

            <div className="metrics-grid">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="metric-card">
                        <div className="label">{metric.label}</div>
                        <div className="value">{metric.value}</div>
                        <div
                            className={`growth ${metric.growth.startsWith("+") ? "positive" : "negative"
                                }`}
                        >
                            {metric.growth}
                        </div>
                    </div>
                ))}
            </div>

            <div className="sales-table-wrapper">
                <h2>Historique des ventes</h2>
                <Table columns={columns} rows={rows} selectable={false} />
            </div>
        </div>
    );
};

export default Sales;
