import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Orders from "../components/Orders";
import SearchSection from "../components/SearchSection";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchByText, setSearchByText] = useState({});
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

    Object.entries(searchByText).forEach(([key, value]) => {
      computedOrders = computedOrders.filter((item) =>
        item[key].toLowerCase().includes(value.toLowerCase())
      );
    });
    if (sizeRange.minSize || sizeRange.minSize === 0) {
      computedOrders = computedOrders.filter(
        (item) =>
          Number.parseFloat(item.size.substring(0, item.size.length - 2)) >=
          sizeRange.minSize
      );
    }
    if (sizeRange.maxSize || sizeRange.maxSize === 0) {
      computedOrders = computedOrders.filter(
        (item) =>
          Number.parseFloat(item.size.substring(0, item.size.length - 2)) <=
          sizeRange.maxSize
      );
    }

    setTotalItems(computedOrders.length);

    // Sorting orders
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
  }, [orders, searchByText, sizeRange, oldestFirst, currentPage]);

  const handleSearchTextChange = (e) => {
    setSearchByText({
      ...searchByText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeRangeChange = (e) => {
    setSizeRange({
      ...sizeRange,
      [e.target.name]: Number.parseFloat(e.target.value),
    });
  };

  return (
    <>
      <SearchSection
        onTextChange={handleSearchTextChange}
        onSizeRangeChange={handleSizeRangeChange}
      />

      {/* Pagination and sorting order section */}
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

      {ordersDisplayed && <Orders orders={ordersDisplayed} />}
    </>
  );
};

export default Home;
