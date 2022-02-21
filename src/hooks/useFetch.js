import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(url, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

    return () => {
      cancelTokenSource.cancel();
    };
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
