import React, { useState, useEffect } from "react";
import Table from "../../../../components/AEV/AEV.Table/Table";
import { FaTable, FaThLarge } from "react-icons/fa";
import "./Order.scss";

const LOCAL_STORAGE_KEY = "orderViewType";

const Order = () => {
  const [view, setView] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "table";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, view);
  }, [view]);

  const columns = [
    { label: "Date", key: "date" },
    { label: "Items", key: "items" },
    { label: "Type", key: "type" },
    { label: "Order Number", key: "orderNumber" },
    { label: "Status", key: "status" },
    { label: "Total", key: "total" },
  ];

  const rows = [
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "Purchased",
      total: "$67.60 USD",
    },
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "In Cart",
      total: "$67.60 USD",
    },
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "Cancelled",
      total: "$67.60 USD",
    },
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "Purchased",
      total: "$67.60 USD",
    },
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "Cancelled",
      total: "$67.60 USD",
    },
    {
      date: "4 March 2025",
      items: "Lorum Ipsum Market",
      type: "In-App Purchase",
      orderNumber: "DRDS 56$67",
      status: "Purchased",
      total: "$67.60 USD",
    },
  ];

  return (
    <div className="orders-tab">
      <div className="order-header-row">
        <h2 className="order-title">My Orders</h2>
        <div className="order-view-switch">
          <button
            className={`switch-btn${view === "table" ? " active" : ""}`}
            onClick={() => setView("table")}
            title="Table view"
          >
            <FaTable />
          </button>
          <button
            className={`switch-btn${view === "card" ? " active" : ""}`}
            onClick={() => setView("card")}
            title="Card view"
          >
            <FaThLarge />
          </button>
        </div>
      </div>
      {view === "table" ? (
        <Table columns={columns} rows={rows} selectable={false} />
      ) : (
        <div className="order-cards-list">
          {rows.map((row, idx) => (
            <div className="order-card-large" key={idx}>
              <div className="order-card-row order-card-row-top">
                <span className="order-card-label">Order Number</span>
                <span className="order-card-value order-number">{row.orderNumber}</span>
                <span className={`order-card-status status-${row.status.replace(/\s/g, '').toLowerCase()}`}>{row.status}</span>
              </div>
              <div className="order-card-row">
                <span className="order-card-label">Date</span>
                <span className="order-card-value">{row.date}</span>
              </div>
              <div className="order-card-row">
                <span className="order-card-label">Items</span>
                <span className="order-card-value">{row.items}</span>
              </div>
              <div className="order-card-row">
                <span className="order-card-label">Type</span>
                <span className="order-card-value">{row.type}</span>
              </div>
              <div className="order-card-row order-card-row-bottom">
                <span className="order-card-label">Total</span>
                <span className="order-card-value order-total">{row.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
