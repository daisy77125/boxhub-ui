import React from "react";

const Order = ({ order }) => {
  return (
    <div className="col-lg-6">
      <div className="card h-100">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={order.photo}
              className="img-fluid rounded-start"
              alt="box image"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{`Order #${order.id}`}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{`Created at ${order.created}`}</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{`customer: ${order.customer}`}</li>
                <li class="list-group-item">{`condition: ${order.condition}`}</li>
                <li class="list-group-item">{`size: ${order.size}`}</li>
                <li class="list-group-item">{`type: ${order.type}`}</li>
                <li class="list-group-item">{`from: ${order.origin_address}`}</li>
                <li class="list-group-item">{`to: ${order.shipping_address}`}</li>
              </ul>
              <p className="card-text">
                <small className="text-muted">{`current status: ${order.status}`}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
