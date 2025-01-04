import api from "./api";

function storeToken(token: string) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

async function login(email: string, password: string): Promise<any> {
    try {
        const response = await api.post<any>('/auth/signin', { email, password });
        const { accessToken, user } = response.data.data;

        // Store token and setup axios authorization
        storeToken(accessToken);

        console.log('Login successful!', user);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

async function signup(username: string, password: string, email: string): Promise<void> {
    try {
        const response = await api.post<any>('/auth/signup', { username, password, email });
        const { accessToken, user } = response.data.data;

        // Store token and setup axios authorization
        storeToken(accessToken);

        console.log('Signup successful!', user);
    } catch (error: any) {
        console.error('Signup failed:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
}

export { login, signup };