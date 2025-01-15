import api from "./api";

// Function to get a user by ID
async function getUser(id: string): Promise<any> {
    try {
        const response = await api.get<any>(`/users/${id}`);
        return response.data;  // Return only the data portion of the response
    } catch (error: any) {
        handleError(error, 'Failed to get user');
    }
}

// Function to get all users
async function getAllUsers(): Promise<any> {
    try {
        const response = await api.get<any>('/users/all');
        console.log(response.data);  // Log the entire response
        return response.data;  // Return only the data portion of the response

    } catch (error: any) {
        handleError(error, 'Failed to get users');
    }
}

// Function to create a new user (admin use)
async function createUser(username: string, email: string, password: string, role: string): Promise<any> {
    try {
        const response = await api.post<any>('/users', { username, email, password, role });
        return response.data;
    } catch (error: any) {
        handleError(error, 'Failed to create user');
    }
}

// Function to update a user by ID
async function updateUser(id: string, data: object): Promise<any> {
    try {
        const response = await api.put<any>(`/users/${id}`, data);
        return response.data;
    } catch (error: any) {
        handleError(error, 'Failed to update user');
    }
}

// Function to delete a user by ID
async function deleteUser(id: string): Promise<void> {
    try {
        await api.delete(`/users/${id}`);
        console.log(`User with ID ${id} has been deleted`);
    } catch (error: any) {
        handleError(error, 'Failed to delete user');
    }
}

// Centralized error handling function
function handleError(error: any, customMessage: string) {
    // Check if it's a 401 (Unauthorized) and handle token expiry or invalid session
    if (error.response?.status === 401) {
        console.error('Unauthorized access: please log in again.');
        // Here you could redirect to login page or handle token refresh
    }

    // Handle general errors and show the custom error message
    const errorMessage = error.response?.data?.message || error.message || customMessage;
    console.error(`${customMessage}: ${errorMessage}`);
    throw new Error(errorMessage);
}

export { getUser, getAllUsers, createUser, updateUser, deleteUser };
