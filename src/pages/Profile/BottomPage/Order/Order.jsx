import React from "react";
import Table from "../../../../components/AEV/AEV.Table/Table";

const Order = () => {
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
      <Table
        columns={columns}
        rows={rows}
        selectable={false} // Pas de bouton "Ajouter"
      />
    </div>
  );
};

export default Order;
