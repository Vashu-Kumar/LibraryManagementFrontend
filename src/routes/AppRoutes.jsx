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
import MyReservations    from "../pages/student/MyReservations";
import MyFines           from "../pages/student/MyFines";
import Profile           from "../pages/student/Profile";

// Librarian Pages
import LibrarianDashboard  from "../pages/librarian/LibrarianDashboard";
import IssueBook           from "../pages/librarian/IssueBook";
import ReturnBook          from "../pages/librarian/ReturnBook";
import ManageBooks         from "../pages/librarian/ManageBooks";
import AddBook             from "../pages/librarian/AddBook";
import EditBook            from "../pages/librarian/EditBook";
import ManageMembers       from "../pages/librarian/ManageMembers";
import OverdueList         from "../pages/librarian/OverdueList";
import ManageFines         from "../pages/librarian/ManageFines";
import ManageReservations  from "../pages/librarian/ManageReservations";


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

            {/* ── 404 FALLBACK ──────────────────── */}
            <Route
                path="*"
                element={<Navigate to={ROUTES.LOGIN} replace />}
            />

        </Routes>
    );
};

export default AppRoutes;