import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROUTES } from "../utils/constants";
import PrivateRoute from "./PrivateRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import StudentLayout from "../layouts/StudentLayout";
import LibrarianLayout from "../layouts/LibrarianLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

// Student Pages
const StudentDashboard = lazy(() => import("../pages/student/StudentDashboard"));
const Catalog = lazy(() => import("../pages/student/Catalog"));
const BookDetail = lazy(() => import("../pages/student/BookDetail"));
const MyBooks = lazy(() => import("../pages/student/MyBooks"));
const MyReservations = lazy(() => import("../pages/student/MyReservations"));
const MyFines = lazy(() => import("../pages/student/MyFines"));
const Profile = lazy(() => import("../pages/student/Profile"));

// Librarian Pages
const LibrarianDashboard = lazy(() => import("../pages/librarian/LibrarianDashboard"));
const IssueBook = lazy(() => import("../pages/librarian/IssueBook"));
const ReturnBook = lazy(() => import("../pages/librarian/ReturnBook"));
const ManageBooks = lazy(() => import("../pages/librarian/ManageBooks"));
const AddBook = lazy(() => import("../pages/librarian/AddBook"));
const EditBook = lazy(() => import("../pages/librarian/EditBook"));
const ManageMembers = lazy(() => import("../pages/librarian/ManageMembers"));
const OverdueList = lazy(() => import("../pages/librarian/OverdueList"));
const ManageFines = lazy(() => import("../pages/librarian/ManageFines"));
const ManageReservations = lazy(() => import("../pages/librarian/ManageReservations"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers"));
const ManageLibrarians = lazy(() => import("../pages/admin/ManageLibrarians"));
const ManageCategories = lazy(() => import("../pages/admin/ManageCategories"));
const Reports = lazy(() => import("../pages/admin/Reports"));

const AppRoutes = () => {

    const { isLoggedIn, getDashboardRoute } = useAuth();

    return (

        <Suspense fallback={<div>Loading...</div>}>
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
                    <Route path={ROUTES.LOGIN} element={<Login />} />
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
                    <Route
                        path={ROUTES.STUDENT.RESERVATIONS}
                        element={<MyReservations />}
                    />
                    <Route
                        path={ROUTES.STUDENT.FINES}
                        element={<MyFines />}
                    />
                    <Route
                        path={ROUTES.STUDENT.PROFILE}
                        element={<Profile />}
                    />
                </Route>

                {/* ── LIBRARIAN ROUTES ──────────────── */}
                <Route
                    element={
                        <PrivateRoute allowedRoles={[ROLES.LIBRARIAN, ROLES.ADMIN]}>
                            <LibrarianLayout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={ROUTES.LIBRARIAN.DASHBOARD}
                        element={<LibrarianDashboard />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.ISSUE_BOOK}
                        element={<IssueBook />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.RETURN_BOOK}
                        element={<ReturnBook />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.MANAGE_BOOKS}
                        element={<ManageBooks />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.ADD_BOOK}
                        element={<AddBook />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.EDIT_BOOK}
                        element={<EditBook />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.MEMBERS}
                        element={<ManageMembers />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.OVERDUE}
                        element={<OverdueList />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.FINES}
                        element={<ManageFines />}
                    />
                    <Route
                        path={ROUTES.LIBRARIAN.RESERVATIONS}
                        element={<ManageReservations />}
                    />
                </Route>

                {/* ── ADMIN ROUTES ──────────────────── */}
                <Route
                    element={
                        <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={ROUTES.ADMIN.DASHBOARD}
                        element={<AdminDashboard />}
                    />
                    <Route
                        path={ROUTES.ADMIN.USERS}
                        element={<ManageUsers />}
                    />
                    <Route
                        path={ROUTES.ADMIN.LIBRARIANS}
                        element={<ManageLibrarians />}
                    />
                    <Route
                        path={ROUTES.ADMIN.CATEGORIES}
                        element={<ManageCategories />}
                    />
                    <Route
                        path={ROUTES.ADMIN.REPORTS}
                        element={<Reports />}
                    />
                </Route>

                {/* ── 404 FALLBACK ──────────────────── */}
                <Route
                    path="*"
                    element={<Navigate to={ROUTES.LOGIN} replace />}
                />

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;