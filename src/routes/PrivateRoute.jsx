// src/routes/PrivateRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

const PrivateRoute = ({ children, allowedRoles }) => {

    const { isLoggedIn, role } = useAuth();

    // Not logged in → redirect to login
    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Wrong role → redirect to own dashboard
    if (allowedRoles && !allowedRoles.includes(role)) {
        const redirectMap = {
            ADMIN:     ROUTES.ADMIN.DASHBOARD,
            LIBRARIAN: ROUTES.LIBRARIAN.DASHBOARD,
            STUDENT:   ROUTES.STUDENT.DASHBOARD
        };
        return <Navigate to={redirectMap[role]} replace />;
    }

    return children;
};

export default PrivateRoute;