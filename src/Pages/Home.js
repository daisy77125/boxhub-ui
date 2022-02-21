import React from "react";
import useFetch from "../hooks/useFetch";
import ShowOrders from "../components/ShowOrders";

const Home = () => {
  const {
    isLoading,
    error,
    data: orders,
  } = useFetch(process.env.REACT_APP_BACKEND_API_ENDPOINT + "/orders");

  return (
    <>
      {isLoading && <p>Is Loading...</p>}
      {error && <p>{error}</p>}
      {orders && <ShowOrders orders={orders} />}
    </>
  );
};

export default Home;
