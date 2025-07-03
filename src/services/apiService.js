const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const apiService = {
    get: async (endpoint) => {
        try {
            const url = `${API_BASE_URL}${endpoint}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`GET Error (${response.status}) on ${url}`);
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            }
            return null;

        } catch (error) {
            console.error("GET Error:", error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const text = await response.text();
            let json;

            try {
                json = JSON.parse(text);
            } catch {
                json = { raw: text };
            }

            if (!response.ok) {
                console.error("Réponse non OK:", response.status, json); // AJOUT
                throw new Error(json?.message || `Erreur HTTP ${response.status}`);
            }

            return json;
        } catch (error) {
            console.error("POST Error complet:", error);
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: data ? JSON.stringify(data) : null,
            });

            if (!response.ok) throw new Error("Error updating data");

            const text = await response.text();
            return text ? JSON.parse(text) : {};
        } catch (error) {
            console.error("PUT Error:", error);
            return null;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Error deleting data");

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                return null;
            }
        } catch (error) {
            console.error("DELETE Error:", error);
            return null;
        }
    },

    // REPONSE QUERY

postQuery: async (endpoint, data = null) => {
    try {
        const token = localStorage.getItem("token");

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
             },
        };

        if (data) options.body = JSON.stringify(data);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        const text = await response.text();
        let json;

        try {
            json = JSON.parse(text);
        } catch {
            json = { raw: text };
        }

        if (!response.ok) {
            throw new Error(json?.message || `Erreur HTTP ${response.status}`);
        }

        return json;
    } catch (error) {
        console.error("POST QUERY Error:", error);
        return null;
    }
},

putQuery: async (endpoint, data = null) => {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        if (data) options.body = JSON.stringify(data);
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const text = await response.text();
        let json;
        try {
            json = JSON.parse(text);
        }
        catch {
            json = { raw: text };
        }
        if (!response.ok) {
            throw new Error(json?.message || `Erreur HTTP ${response.status}`);
        }
        return json;
    } catch (error) {
        console.error("PUT QUERY Error:", error);
        return null;
    }
    },

patchQuery: async (endpoint, data = null) => {
    try {
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        };

        if (data) options.body = JSON.stringify(data);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        const text = await response.text();
        let json;

        try {
            json = JSON.parse(text);
        } catch {
            json = { raw: text };
        }

        if (!response.ok) {
            throw new Error(json?.message || `Erreur HTTP ${response.status}`);
        }

        return json;
    } catch (error) {
        console.error("PATCH QUERY Error:", error);
        return null;
    }
},

};

export default apiService;

// exemple d'utilisation

///////// GET ///////////

// import apiService from "../apiService";

// useEffect(() => {
//     const fetchUsers = async () => {
//         const data = await apiService.get("/users"); // Appel API simplifié
//         if (data) setUsers(data);
//     };

//     fetchUsers();
// }, []);

///////// POST ///////////

// const userId = 123;
// const postData = { title, content };

// const response = await apiService.post(`/users/${userId}/posts`, postData);
