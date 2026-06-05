import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {

    const { isLoggedIn, getDashboardRoute } = useAuth();

    // Already logged in → redirect to dashboard
    if (isLoggedIn) {
        return <Navigate to={getDashboardRoute()} replace />;
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0f1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Georgia, serif"
        }}>
            {/* Background gradient */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                backgroundImage: `
                    radial-gradient(circle at 20% 20%,
                        rgba(99,102,241,0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%,
                        rgba(245,200,66,0.06) 0%, transparent 50%)
                `,
                pointerEvents: "none"
            }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
