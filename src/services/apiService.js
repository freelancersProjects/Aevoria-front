const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL);
const apiService = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error("Error fetching data");
            return await response.json();
        } catch (error) {
            console.error("GET Error:", error);
            return null;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Error sending data");
            return await response.json();
        } catch (error) {
            console.error("POST Error:", error);
            return null;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Error updating data");
            return await response.json();
        } catch (error) {
            console.error("PUT Error:", error);
            return null;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Error deleting data");
            return await response.json();
        } catch (error) {
            console.error("DELETE Error:", error);
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
