import React, { useState } from "react";
import "./Analytics.scss";
import ChartBox from "../../../components/chartBox/ChartBox";
import BarChartBox from "../../../components/barChartBox/BarChartBox";
import PieChartBox from "../../../components/pieCartBox/PieChartBox";
import {
    chartBoxUser,
    chartBoxConversion,
    barChartBoxRevenue,
    barChartBoxVisit
} from "../../../data";

const Analytics = () => {
    const [view, setView] = useState("revenue");

    return (
        <div className="analytics-page">
            <h2>Statistiques Globales</h2>

            <div className="analytics-switcher">
                <button onClick={() => setView("revenue")} className={view === "revenue" ? "active" : ""}>
                    Revenus
                </button>
                <button onClick={() => setView("users")} className={view === "users" ? "active" : ""}>
                    Utilisateurs
                </button>
                <button onClick={() => setView("conversion")} className={view === "conversion" ? "active" : ""}>
                    Conversion
                </button>
                <button onClick={() => setView("visit")} className={view === "visit" ? "active" : ""}>
                    Visites
                </button>
                <button onClick={() => setView("platform")} className={view === "platform" ? "active" : ""}>
                    Plateformes
                </button>
            </div>

            <div className="analytics-content">
                {view === "revenue" && <BarChartBox {...barChartBoxRevenue} />}
                {view === "visit" && <BarChartBox {...barChartBoxVisit} />}
                {view === "users" && <ChartBox {...chartBoxUser} />}
                {view === "conversion" && <ChartBox {...chartBoxConversion} />}
                {view === "platform" && <PieChartBox />}
            </div>
        </div>
    );
};

export default Analytics;
