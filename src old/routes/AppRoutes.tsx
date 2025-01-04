import { Routes, Route, Navigate, } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorised';
// import Layout from '../components/layout';
// import ProtectedRoute from './ProtectedRoute';
import { Dashboard } from '../pages/admin/Dashboard';
import { Register } from '../pages/Register';
import { Success } from '../pages/Success';
import { Verify } from '../pages/Verify';
import { Login } from '../pages/Login';
import { Accounts } from '../pages/admin/Accounts';
import { Equipment } from '../pages/admin/Equipment';
import { ProtectedRoute } from './ProtectedRoute';



const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/success" element={<Success />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/equipments" element={<Equipment />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
