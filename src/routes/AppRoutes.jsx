// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROUTES } from "../utils/constants";
import PrivateRoute from "./PrivateRoute";

// Layouts
import AuthLayout       from "../layouts/AuthLayout";
import StudentLayout    from "../layouts/StudentLayout";
import LibrarianLayout  from "../layouts/LibrarianLayout";
import AdminLayout      from "../layouts/AdminLayout";

// Auth Pages
import Login    from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import StudentDashboard  from "../pages/student/StudentDashboard";
import Catalog           from "../pages/student/Catalog";
import BookDetail        from "../pages/student/BookDetail";
import MyBooks           from "../pages/student/MyBooks";


const AppRoutes = () => {

    const { isLoggedIn, getDashboardRoute } = useAuth();

    return (
        <Routes>

            {/* ── ROOT REDIRECT ─────────────────── */}
            <Route
                path="/"
                element={
                    isLoggedIn
                        ? <Navigate to={getDashboardRoute()} replace />
                        : <Navigate to={ROUTES.LOGIN} replace />
                }
            />

            {/* ── AUTH ROUTES ───────────────────── */}
            <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN}    element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
            </Route>

            {/* ── STUDENT ROUTES ────────────────── */}
            <Route
                element={
                    <PrivateRoute allowedRoles={[ROLES.STUDENT]}>
                        <StudentLayout />
                    </PrivateRoute>
                }
            >
                <Route
                    path={ROUTES.STUDENT.DASHBOARD}
                    element={<StudentDashboard />}
                />
                <Route
                    path={ROUTES.STUDENT.CATALOG}
                    element={<Catalog />}
                />
                <Route
                    path={ROUTES.STUDENT.BOOK_DETAIL}
                    element={<BookDetail />}
                />
                <Route
                    path={ROUTES.STUDENT.MY_BOOKS}
                    element={<MyBooks />}
                />
            </Route>
            {/* ── 404 FALLBACK ──────────────────── */}
            <Route
                path="*"
                element={<Navigate to={ROUTES.LOGIN} replace />}
            />

        </Routes>
    );
};

export default AppRoutes;