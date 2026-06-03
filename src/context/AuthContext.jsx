import { createContext, useContext, useState, useEffect } from "react";
import {
    getUser,
    getToken,
    getUserRole,
    getUserId,
    clearAuth,
    isAuthenticated
} from "../utils/tokenUtils";
import { ROLES, ROUTES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

// CREATE CONTEXT
const AuthContext = createContext(null);

// PROVIDER
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());
    const [loading, setLoading] = useState(false);

    // ── COMPUTED ─────────────────────────
    const isLoggedIn  = !!token && !!user;
    const role = user?.role || null;
    const userId = user?.userId || null;
    const fullName = user?.fullName || null;
    const studentId = user?.studentId || null;
    const rollNumber = user?.rollNumber || null;

    const isAdmin = role === ROLES.ADMIN;
    const isLibrarian = role === ROLES.LIBRARIAN;
    const isStudent = role === ROLES.STUDENT;

    // ── SET USER AFTER LOGIN ──────────────
    const setAuthData = (authResponse) => {
        const { token, ...userData } = authResponse;
        setToken(token);
        setUser(userData);
    };

    // ── LOGOUT ───────────────────────────
    const logout = () => {
        clearAuth();
        setUser(null);
        setToken(null);
    };

    // ── GET DASHBOARD ROUTE BY ROLE ───────
    const getDashboardRoute = () => {
        switch (role) {
            case ROLES.ADMIN: return ROUTES.ADMIN.DASHBOARD;
            case ROLES.LIBRARIAN: return ROUTES.LIBRARIAN.DASHBOARD;
            case ROLES.STUDENT:   return ROUTES.STUDENT.DASHBOARD;
            default:  return ROUTES.LOGIN;
        }
    };

    // ── SYNC WITH LOCALSTORAGE ────────────
    useEffect(() => {
        const storedUser  = getUser();
        const storedToken = getToken();
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isLoggedIn,
            role,
            userId,
            fullName,
            studentId,
            rollNumber,
            isAdmin,
            isLibrarian,
            isStudent,
            setAuthData,
            logout,
            getDashboardRoute
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// HOOK
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};