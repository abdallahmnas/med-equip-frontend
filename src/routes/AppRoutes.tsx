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
import { EquipmentDetails } from '../pages/admin/EquipmentDetails';
import AccountDetails from '../pages/admin/AccountDetails';
import { EquipmentEdit } from '../pages/admin/Equipment_Edit';



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
                <Route path="/accounts/:id" element={<AccountDetails />} />
                <Route path="/equipments" element={<Equipment />} />
                <Route path="/equipments/:id" element={<EquipmentDetails />} />
                <Route path="/equipments/:id/edit" element={<EquipmentEdit />} />

            </Route>
        </Routes>
    );
};

export default AppRoutes;
