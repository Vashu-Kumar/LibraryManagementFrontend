import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!user) {
        alert('Please login first.');
        return <Navigate to="/LibraryManagement/login" />;
    }

    if (user.role !== 'admin') {
        alert('You are not authorized to access this page.');
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedAdminRoute;
