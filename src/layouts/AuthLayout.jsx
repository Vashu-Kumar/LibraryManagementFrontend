import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
    const { isLoggedIn, getDashboardRoute } = useAuth();

    if (isLoggedIn) {
        return <Navigate to={getDashboardRoute()} replace />;
    }

    return (
        <div
            className="
                min-h-screen w-full
                flex items-center justify-center
                bg-[#0E121A]
                relative overflow-hidden
                font-serif
            "
        >
            {/* Decorative Blobs */}
            

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Library Branding */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-5xl">📚</span>

                    <div>
                        <h1 className="text-4xl font-bold text-yellow-500 tracking-wide">
                            Central Library
                        </h1>

                        <p className="text-sm text-[#0796ac] tracking-[0.25em] uppercase">
                            Digital Library Management System
                        </p>
                    </div>
                </div>

                {/* Login / Register Pages */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;