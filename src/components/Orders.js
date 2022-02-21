import React from "react";
import Order from "./Order";

const Orders = ({ orders }) => {
  return (
    <div className="row g-3">
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
