import { useEffect, useState } from "react";

const usePublisherCheck = () => {
    const [loading, setLoading] = useState(true);
    const [hasPublisher, setHasPublisher] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchPublisher = async () => {
            if (user?.role !== "Publisher") {
                setHasPublisher(true);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/publishers/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.status === 404) {
                    setHasPublisher(false);
                } else {
                    const data = await res.json();
                    setHasPublisher(!!data?.publisher_id);
                }
            } catch (err) {
                setHasPublisher(false);
            } finally {
                setLoading(false);
            }
        };

        fetchPublisher();
    }, [user]);

    return { hasPublisher, loading };
};

export default usePublisherCheck;
