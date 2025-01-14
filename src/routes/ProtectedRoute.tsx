import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageLoading } from '../components/page-loading';

export const ProtectedRoute = () => {
    const { loading, user } = useAuth();
    const token = localStorage.getItem('token');


    if (loading || !user) {
        return <PageLoading />
    }
    console.log(token)

    return token ? <Outlet /> : <Navigate to="/login" />;
};