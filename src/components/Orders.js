import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Order from "./Order";
import Pagination from "./Pagination";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({});
  const [sizeRange, setSizeRange] = useState({ minSize: null, maxSize: null });
  const [oldestFirst, setOldestFirst] = useState(false); // By default, orders are sorted in chronological order

  const PAGE_SIZE = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ordersDisplayed = useMemo(() => {
    let computedOrders = orders;

    Object.entries(search).forEach(([key, value]) => {
      computedOrders = computedOrders.filter((item) =>
        item[key].toLowerCase().includes(value.toLowerCase())
      );
    });

    if (sizeRange.minSize) {
      computedOrders = computedOrders.filter(
        (item) =>
          Number.parseFloat(item.size.substring(0, item.size.length - 2)) >=
          sizeRange.minSize
      );
    }
    if (sizeRange.maxSize) {
      computedOrders = computedOrders.filter(
        (item) =>
          Number.parseFloat(item.size.substring(0, item.size.length - 2)) <=
          sizeRange.maxSize
      );
    }

    setTotalItems(computedOrders.length);

    //Sorting orders
    if (oldestFirst) {
      computedOrders.sort((a, b) => new Date(a.created) - new Date(b.created));
    } else {
      computedOrders.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    // Current Page slice
    return computedOrders.slice(
      (currentPage - 1) * PAGE_SIZE,
      (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
    );
  }, [orders, currentPage, search, sizeRange, oldestFirst]);

  return (
    <>
      {/* Input Texts */}
      <div className="row mb-3">
        <label className="col-2 col-form-label">Status</label>
        <div className="col-10">
          <input
            type="text"
            name="status"
            className="form-control"
            onChange={(e) => {
              setSearch({
                ...search,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
      </div>

      {/* Input Numbers */}
      <div className="row mb-3">
        <label className="col-2 col-form-label">Size (ft)</label>
        <div className="col-auto">
          <input
            style={{ width: "150px" }}
            type="number"
            name="minSize"
            className="form-control"
            onChange={(e) => {
              setSizeRange({
                ...sizeRange,
                [e.target.name]: Number.parseFloat(e.target.value),
              });
            }}
          />
        </div>
        <div className="col-auto">-</div>
        <div className="col-auto">
          <input
            style={{ width: "150px" }}
            type="number"
            name="maxSize"
            className="form-control"
            onChange={(e) => {
              setSizeRange({
                ...sizeRange,
                [e.target.name]: Number.parseFloat(e.target.value),
              });
            }}
          />
        </div>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="d-flex align-items-center justify-content-between">
          <Pagination
            total={totalItems}
            itemsPerPage={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <i
            className={`bi bi-arrow-${oldestFirst ? "down" : "up"}-circle-fill`}
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setOldestFirst(!oldestFirst)}
          ></i>
        </div>
      )}

      <div className="row g-3">
        {ordersDisplayed &&
          ordersDisplayed.map((order) => (
            <Order key={order.id} order={order} />
          ))}
      </div>
    </>
  );
};

export default Orders;
