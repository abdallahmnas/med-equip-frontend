import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; // Axios instance for API requests
// import { login } from '../services/auth.service'; // Function to handle login

interface AuthContextProps {
    user: User | any;
    setUser:any;
    // signIn: (email: string, password: string) => Promise<any>;
    signOut: () => void;
    loading: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | any>(null);
    const [loading, setLoading] = useState(true); // Track loading state


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLoading(false);
            // api
            //     .get('/auth/me') // Assuming there's an endpoint to get current user
            //     .then((response) => {setUser(response.data)})
            //     .catch(() => signOut())
            //     .finally(() => setLoading(false));


        } else {
            setLoading(false);
        }
    }, []);

    // const signIn = async (email: string, password: string): Promise<any> => {
    //     const response = await login(email, password);

    //     if (response.success) {
    //         setUser(response.data);
    //         localStorage.setItem('token', response.accessToken);
    //         console.log(response.data)
    //         return {
    //             message: response.message,
    //             success: true,
    //             data: response.data,
    //             accessToken: response.accessToken,
    //         }
    //     }

    //     return {
    //         message: response.message,
    //         success: false,
    //         data: null,
    //     }
    // };


    const signOut = () => {
        localStorage.removeItem('token'); // Clear token from localStorage
        api.defaults.headers.Authorization = ''; // Clear the token from axios
        setUser(null); // Clear user data
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
