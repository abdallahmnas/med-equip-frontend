import api from "./api";

async function storeToken(token: string) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function setErrorMessage(message: string) {
    localStorage.setItem('errorMessage', message);
}

async function login(email: string, password: string): Promise<any> {
    try {
        const response = await api.post<any>('/auth/signin', { email, password });
        const { accessToken, user } = response.data.data;

        // Store token and setup axios authorization
        await storeToken(accessToken);

        return {
            message: 'Login successful!',
            success: true,
            accessToken,
            data: user,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || 'Login failed',
        };
    }
}


async function signup(username: string, password: string, email: string): Promise<void> {
    try {
    
        const response = await api.post<any>('/auth/signup', { username, password, email });
        const { accessToken, user } = response.data.data;

        // Store token and setup axios authorization
        await storeToken(accessToken);

        console.log('Signup successful!', user);
    } catch (error: any) {
        console.error('Signup failed:', error.response?.data?.message || error.message);
        setErrorMessage(error.response?.data?.message || 'Signup failed');
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
}

export { login, signup };