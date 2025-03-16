import { useState, useEffect } from "react";
import apiService from "../services/apiService";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        apiService
            .get(endpoint)
            .then((res) => isMounted && setData(res.data))
            .catch((err) => isMounted && setError(err))
            .finally(() => isMounted && setLoading(false));

        return () => { isMounted = false };
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetch;
