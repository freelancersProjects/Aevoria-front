import React from "react";
import "./PageSection.scss";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const promotions = [
    {
        id: 1,
        title: "Promo Été - Jusqu’à -40%",
        description: "Offre valable sur tous les jeux multijoueur jusqu’au 15 juillet.",
        startDate: "01/06/2025",
        endDate: "15/07/2025",
        isActive: true,
    },
    {
        id: 2,
        title: "Nouveau Pack XP+",
        description: "Bénéficiez de 3 mois offerts pour toute nouvelle souscription.",
        startDate: "15/04/2025",
        endDate: "01/05/2025",
        isActive: false,
    },
];

const PageSection = () => {
    return (
        <div className="promotion-page">
            <h2 className="title">Pages Promotionnelles</h2>
            <div className="promo-grid">
                {promotions.map((promo) => (
                    <div key={promo.id} className={`promo-card ${promo.isActive ? "active" : "inactive"}`}>
                        <div className="header">
                            <h3>{promo.title}</h3>
                            <span className="status">{promo.isActive ? "Active" : "Inactif"}</span>
                        </div>
                        <p className="description">{promo.description}</p>
                        <div className="footer">
                            <span className="date-range">
                                {promo.startDate} → {promo.endDate}
                            </span>
                            <div className="actions">
                                <Visibility className="icon" />
                                <Edit className="icon" />
                                <Delete className="icon" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageSection;
