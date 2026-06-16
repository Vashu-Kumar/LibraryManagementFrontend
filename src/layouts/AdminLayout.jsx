import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/constants";

const AdminLayout = () => {

    const { fullName, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { path: ROUTES.ADMIN.DASHBOARD, icon: "🏠", label: "Dashboard" },
        { path: ROUTES.ADMIN.USERS, icon: "👥", label: "All Users" },
        { path: ROUTES.ADMIN.LIBRARIANS, icon: "📋", label: "Librarians"},
        { path: ROUTES.ADMIN.CATEGORIES, icon: "🏷️", label: "Categories" },
        { path: ROUTES.ADMIN.REPORTS, icon: "📊", label: "Reports" },

        // Admin can also access librarian panel
        {
            path: ROUTES.LIBRARIAN.DASHBOARD,
            icon: "🔧",
            label: "Librarian Panel"
        }
    ];

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            background: "#0E121A",
            fontFamily: "Georgia, serif",
            color: "#e8e0d0"
        }}>

            {/* ── SIDEBAR ───────────────────────── */}
            <aside style={{
                width: sidebarOpen ? 240 : 70,
                background: "rgba(255,255,255,0.03)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.3s ease",
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                zIndex: 100,
                overflowX: "hidden"
            }}>

                {/* Logo */}
                <div style={{
                    padding: "20px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>📚</span>
                    {sidebarOpen && (
                        <div>
                            <div style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#f5c842",
                                letterSpacing: 1
                            }}>
                                Central Library
                            </div>
                            <div style={{
                                fontSize: 10,
                                color: "#6b7280",
                                letterSpacing: 2
                            }}>
                                ADMIN
                            </div>
                        </div>
                    )}
                </div>

                {/* Nav Items */}
                <nav style={{
                    flex: 1,
                    padding: "16px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}>
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 12px",
                                borderRadius: 10,
                                textDecoration: "none",
                                fontSize: 13,
                                color: isActive ? "#0a0f1e" : "#9ca3af",
                                background: isActive
                                    ? "#6366f1"
                                    : "transparent",
                                fontWeight: isActive ? 700 : 400,
                                transition: "all 0.2s",
                                whiteSpace: "nowrap"
                            })}
                        >
                            <span style={{
                                fontSize: 18,
                                flexShrink: 0
                            }}>
                                {item.icon}
                            </span>
                            {sidebarOpen && item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* User Info + Logout */}
                <div style={{
                    padding: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.07)"
                }}>
                    {sidebarOpen && (
                        <div style={{ marginBottom: 12 }}>
                            <div style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#e8e0d0"
                            }}>
                                {fullName}
                            </div>
                            <div style={{
                                fontSize: 11,
                                color: "#6b7280"
                            }}>
                                Administrator
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: 8,
                            border: "1px solid rgba(248,113,113,0.3)",
                            background: "transparent",
                            color: "#f87171",
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: "Georgia, serif",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6
                        }}
                    >
                        <span>🚪</span>
                        {sidebarOpen && "Logout"}
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ──────────────────── */}
            <div style={{
                flex: 1,
                marginLeft: sidebarOpen ? 240 : 70,
                transition: "margin-left 0.3s ease",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}>

                {/* Top Bar */}
                <header style={{
                    height: 60,
                    background: "rgba(10,15,30,0.92)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 24px",
                    position: "sticky",
                    top: 0,
                    zIndex: 99
                }}>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#9ca3af",
                            fontSize: 20,
                            cursor: "pointer",
                            padding: 4
                        }}
                    >
                        ☰
                    </button>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                    }}>
                        <div style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#fff"
                        }}>
                            {fullName?.charAt(0) || "A"}
                        </div>
                        <div>
                            <div style={{
                                fontSize: 13,
                                fontWeight: 600
                            }}>
                                {fullName}
                            </div>
                            <div style={{
                                fontSize: 11,
                                color: "#6b7280"
                            }}>
                                Administrator
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: 24, flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;