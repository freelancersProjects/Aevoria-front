import { useState, useEffect } from "react";
import apiService from "../services/apiService";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!endpoint) {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const response = await apiService.get(endpoint);
                setData(response);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetch;
