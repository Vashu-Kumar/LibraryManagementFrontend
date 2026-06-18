import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

const StudentLayout = () => {
    const { fullName, studentId, logout } = useAuth();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 1024
    );

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 1024
    );

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;

            setIsMobile(mobile);

            if (!mobile) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    const navItems = [
        {
            path: ROUTES.STUDENT.DASHBOARD,
            icon: "🏠",
            label: "Dashboard"
        },
        {
            path: ROUTES.STUDENT.CATALOG,
            icon: "📚",
            label: "Book Catalog"
        },
        {
            path: ROUTES.STUDENT.MY_BOOKS,
            icon: "📖",
            label: "My Books"
        },
        {
            path: ROUTES.STUDENT.RESERVATIONS,
            icon: "🔖",
            label: "Reservations"
        },
        {
            path: ROUTES.STUDENT.FINES,
            icon: "⚠️",
            label: "My Fines"
        },
        {
            path: ROUTES.STUDENT.PROFILE,
            icon: "👤",
            label: "Profile"
        }
    ];

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    const handleNavClick = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#0E121A",
                fontFamily: "Georgia, serif",
                color: "#e8e0d0"
            }}
        >
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        zIndex: 150
                    }}
                />
            )}

            {/* Sidebar */}
            <aside
                style={{
                    width: 240,
                    background: "#0E121A",
                    borderRight:
                        "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    zIndex: 200,
                    overflowX: "hidden",

                    transform:
                        isMobile && !sidebarOpen
                            ? "translateX(-100%)"
                            : "translateX(0)",

                    transition: "transform 0.3s ease"
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: "20px 16px",
                        borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10
                    }}
                >
                    <span
                        style={{
                            fontSize: 24,
                            flexShrink: 0
                        }}
                    >
                        📚
                    </span>

                    <div>
                        <div
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#f5c842",
                                letterSpacing: 1
                            }}
                        >
                            Central Library
                        </div>

                        <div
                            style={{
                                fontSize: 10,
                                color: "#6b7280",
                                letterSpacing: 2
                            }}
                        >
                            STUDENT
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        flex: 1,
                        padding: "16px 8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4
                    }}
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 12px",
                                borderRadius: 10,
                                textDecoration: "none",
                                fontSize: 13,
                                color: isActive
                                    ? "#0a0f1e"
                                    : "#9ca3af",
                                background: isActive
                                    ? "#f5c842"
                                    : "transparent",
                                fontWeight: isActive
                                    ? 700
                                    : 400,
                                transition: "all 0.2s"
                            })}
                        >
                            <span
                                style={{
                                    fontSize: 18
                                }}
                            >
                                {item.icon}
                            </span>

                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* User Info */}
                <div
                    style={{
                        padding: "16px",
                        borderTop:
                            "1px solid rgba(255,255,255,0.07)"
                    }}
                >
                    <div
                        style={{
                            marginBottom: 12
                        }}
                    >
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#e8e0d0"
                            }}
                        >
                            {fullName}
                        </div>

                        <div
                            style={{
                                fontSize: 11,
                                color: "#6b7280"
                            }}
                        >
                            {studentId}
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: 8,
                            border:
                                "1px solid rgba(248,113,113,0.3)",
                            background: "transparent",
                            color: "#f87171",
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: "Georgia, serif"
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    marginLeft: isMobile ? 0 : 240,
                    transition: "margin-left 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}
            >
                {/* Header */}
                <header
                    style={{
                        height: 60,
                        background: "rgba(10,15,30,0.92)",
                        backdropFilter: "blur(16px)",
                        borderBottom:
                            "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        position: "sticky",
                        top: 0,
                        zIndex: 99
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontSize: isMobile ? 16 : 18,
                            color: "#f5c842"
                        }}
                    >
                        Central Library
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        }}
                    >
                        {/* User */}
                        {!isMobile && (
                            <>
                                <div
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontWeight: 700,
                                        
                                    }}
                                >
                                    {fullName?.charAt(0) || "S"}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 600
                                        }}
                                    >
                                        {fullName}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: "#6b7280"
                                        }}
                                    >
                                        Student
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Menu Button - Mobile & Tablet Only */}
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#fff",
                                    fontSize: 24,
                                    cursor: "pointer",
                                    padding: "4px 8px"
                                }}
                            >
                                {sidebarOpen ? "✕" : "☰"}
                            </button>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main
                    style={{
                        padding: isMobile ? 16 : 24,
                        flex: 1
                        
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;