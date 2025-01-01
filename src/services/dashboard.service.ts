import api from "./api";

// Function to get a user by ID
const DashboardService = {
    counts: async () => {
        try {
            const response = await api.get<any>(`/counts`);
            return response.data;  // Return only the data portion of the response
        } catch (error: any) {
            console.log(error)
            return {
                error: error.response?.data?.message || error.message,
                data: null
            }
        }
    }

}

export default DashboardService
