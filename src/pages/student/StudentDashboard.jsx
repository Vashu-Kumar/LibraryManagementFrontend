import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getStudentStats } from "../../services/dashboardService";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const StudentDashboard = () => {

    const { userId, fullName } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await getStudentStats(userId);
            setStats(response.data);
        } catch (error) {
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: "Books Borrowed",
            value: stats?.totalActiveLoans ?? 0,
            icon: "📖",
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20"
        },
        {
            label: "Overdue Books",
            value: stats?.totalOverdueLoans ?? 0,
            icon: "⏰",
            color: "text-red-400",
            bg: "bg-red-500/10 border-red-500/20"
        },
        {
            label: "Reservations",
            value: stats?.totalPendingReservations ?? 0,
            icon: "🔖",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10 border-yellow-500/20"
        },
        {
            label: "Pending Fines",
            value: `₹${stats?.totalPendingFineAmount ?? 0}`,
            icon: "⚠️",
            color: "text-orange-400",
            bg: "bg-orange-500/10 border-orange-500/20"
        }
    ];

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── WELCOME ──────────────────────── */}
            <div className="bg-gradient-to-r from-indigo-500/10
                to-yellow-500/10 border border-yellow-400/20
                rounded-2xl p-6 mb-6"
            >
                <p className="text-yellow-400 text-xs uppercase
                    tracking-widest mb-1"
                >
                    Good Day
                </p>
                <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {fullName} 👋
                </h1>

                {/* Alerts */}
                {stats?.totalOverdueLoans > 0 && (
                    <p className="text-red-400 text-sm">
                        ⚠️ You have{" "}
                        <span className="font-bold">
                            {stats.totalOverdueLoans} overdue book(s)
                        </span>
                        . Please return them soon.
                    </p>
                )}
                {stats?.totalPendingFines > 0 && (
                    <p className="text-orange-400 text-sm mt-1">
                        💰 Pending fine:{" "}
                        <span className="font-bold">
                            ₹{stats.totalPendingFineAmount}
                        </span>
                        . Pay to unblock borrowing.
                    </p>
                )}
            </div>

            {/* ── STATS GRID ───────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        className={`
                            ${card.bg} border rounded-2xl p-5
                            transition-transform hover:scale-105
                        `}
                    >
                        <div className="text-3xl mb-3">{card.icon}</div>
                        <div className={`text-2xl font-bold ${card.color}`}>
                            {card.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {card.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── QUICK ACTIONS ────────────────── */}
            <div className="mb-8">
                <h2 className="text-sm text-gray-500 uppercase
                    tracking-widest mb-4"
                >
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        {
                            label: "Browse Catalog",
                            icon: "📚",
                            path: ROUTES.STUDENT.CATALOG,
                            color: "border-indigo-500/30 hover:bg-indigo-500/10"
                        },
                        {
                            label: "My Books",
                            icon: "📖",
                            path: ROUTES.STUDENT.MY_BOOKS,
                            color: "border-emerald-500/30 hover:bg-emerald-500/10"
                        },
                        {
                            label: "Reservations",
                            icon: "🔖",
                            path: ROUTES.STUDENT.RESERVATIONS,
                            color: "border-yellow-500/30 hover:bg-yellow-500/10"
                        },
                        {
                            label: "My Fines",
                            icon: "💰",
                            path: ROUTES.STUDENT.FINES,
                            color: "border-red-500/30 hover:bg-red-500/10"
                        }
                    ].map((action, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(action.path)}
                            className={`
                                flex items-center gap-3 p-4 rounded-xl
                                border bg-transparent text-[#e8e0d0]
                                text-sm font-serif cursor-pointer
                                transition-all duration-200
                                ${action.color}
                            `}
                        >
                            <span className="text-xl">{action.icon}</span>
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── RECENT LOANS ─────────────────── */}
            {stats?.recentLoans?.length > 0 && (
                <div>
                    <h2 className="text-sm text-gray-500 uppercase
                        tracking-widest mb-4"
                    >
                        Recent Activity
                    </h2>
                    <div className="bg-white/3 border border-white/7
                        rounded-2xl overflow-hidden"
                    >
                        {stats.recentLoans.slice(0, 5).map((loan, i) => (
                            <div
                                key={loan.id}
                                className={`
                                    flex items-center justify-between
                                    p-4 gap-4
                                    ${i < stats.recentLoans.length - 1
                                        ? "border-b border-white/5"
                                        : ""
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg
                                        bg-indigo-500/20 flex items-center
                                        justify-center text-lg flex-shrink-0"
                                    >
                                        📖
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold
                                            text-[#e8e0d0]"
                                        >
                                            {loan.bookTitle}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Due: {loan.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <LoanStatusBadge status={loan.status} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const LoanStatusBadge = ({ status }) => {
    const colors = {
        ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        RETURNED: "bg-blue-500/15    text-blue-400    border-blue-500/30",
        OVERDUE: "bg-red-500/15     text-red-400     border-red-500/30",
        LOST: "bg-gray-500/15    text-gray-400    border-gray-500/30"
    };
    return (
        <span className={`
            text-xs px-3 py-1 rounded-full border font-semibold
            ${colors[status] || colors.ACTIVE}
        `}>
            {status}
        </span>
    );
};

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">Loading...</div>
    </div>
);

export default StudentDashboard;