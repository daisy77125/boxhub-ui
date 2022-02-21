import React from "react";
import useFetch from "../hooks/useFetch";
import ShowOrders from "../components/ShowOrders";

const Home = () => {
  const {
    isLoading,
    error,
    data: orders,
  } = useFetch("http://localhost:5000/orders");

  return (
    <>
      {isLoading && <p>Is Loading...</p>}
      {error && <p>{error}</p>}
      {orders && <ShowOrders orders={orders} />}
    </>
  );
};

export default Home;
