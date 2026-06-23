import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLibrarianStats } from "../../services/dashboardService";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const LibrarianDashboard = () => {

    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await getLibrarianStats();
            setStats(response.data);
        } catch (error) {
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: "Total Books",
            value: stats?.totalBooks ?? 0,
            icon: "📚",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10 border-indigo-500/20"
        },
        {
            label: "Available",
            value: stats?.totalAvailableBooks ?? 0,
            icon: "✅",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20"
        },
        {
            label: "Issued",
            value: stats?.totalIssuedBooks ?? 0,
            icon: "📤",
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20"
        },
        {
            label: "Overdue",
            value: stats?.totalOverdueLoans ?? 0,
            icon: "⏰",
            color: "text-red-400",
            bg: "bg-red-500/10 border-red-500/20"
        },
        {
            label: "Pending Fines",
            value: stats?.totalPendingFines ?? 0,
            icon: "💰",
            color: "text-orange-400",
            bg: "bg-orange-500/10 border-orange-500/20"
        },
        {
            label: "Reservations",
            value: stats?.totalPendingReservations ?? 0,
            icon: "🔖",
            color: "text-yellow-400",
            bg: "bg-yellow-500/10 border-yellow-500/20"
        }
    ];

    const quickActions = [
        {
            label: "Issue Book",
            icon: "📤",
            path: ROUTES.LIBRARIAN.ISSUE_BOOK,
            color: "border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400"
        },
        {
            label: "Return Book",
            icon: "📥",
            path: ROUTES.LIBRARIAN.RETURN_BOOK,
            color: "border-blue-500/30 hover:bg-blue-500/10 text-blue-400"
        },
        {
            label: "Manage Books",
            icon: "📚",
            path: ROUTES.LIBRARIAN.MANAGE_BOOKS,
            color: "border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400"
        },
        {
            label: "Overdue List",
            icon: "⏰",
            path: ROUTES.LIBRARIAN.OVERDUE,
            color: "border-red-500/30 hover:bg-red-500/10 text-red-400"
        },
        {
            label: "Manage Fines",
            icon: "💰",
            path: ROUTES.LIBRARIAN.FINES,
            color: "border-orange-500/30 hover:bg-orange-500/10 text-orange-400"
        },
        {
            label: "Reservations",
            icon: "🔖",
            path: ROUTES.LIBRARIAN.RESERVATIONS,
            color: "border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
        }
    ];

    if (loading) return <Loader />;

    return (
        //  <div className="font-serif text-[#e8e0d0]">
<div className="font-serif text-[#e8e0d0] px-3 sm:px-4 md:px-6 lg:px-8">
            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                {/* <h1 className="text-2xl font-bold mb-1"> */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                    🏠 Librarian Dashboard
                </h1>
                {/* <p className="text-sm text-gray-500"> */}
                <p className="text-xs sm:text-sm text-gray-500">
                    Library overview and quick actions
                </p>
            </div>

            {/* ── ALERTS ───────────────────────── */}
            {stats?.totalOverdueLoans > 0 && (
                // <div className="bg-red-500/10 border border-red-500/20
                //     rounded-xl p-4 mb-6 flex items-center gap-3"
                // >

                <div className="bg-red-500/10 border border-red-500/20
    rounded-xl p-3 sm:p-4 mb-6 flex flex-col sm:flex-row
    items-start sm:items-center gap-3">
                    <span className="text-xl">⚠️</span>
                    <p className="text-sm text-red-400">
                        <span className="font-bold">
                            {stats.totalOverdueLoans} overdue loan(s)
                        </span>
                        {" "}— please follow up with students.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.LIBRARIAN.OVERDUE)}
                        className="sm:ml-auto w-full sm:w-auto px-3 py-2 rounded-lg 
                            border border-red-500/40 text-red-400
                            text-xs font-serif cursor-pointer
                            bg-transparent hover:bg-red-500/10
                            transition-colors"
                    >
                        View
                    </button>
                </div>
            )}

            {/* ── STAT CARDS ───────────────────── */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3
                lg:grid-cols-6 gap-4 mb-8"
            > */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        className={`
                            ${card.bg} border rounded-2xl p-4 text-center
                            transition-transform hover:scale-105
                        `}
                    >
                        {/* <div className="text-2xl mb-2"> */}
                            <div className="text-3xl sm:text-2xl mb-2">
                            {card.icon}</div>
                        {/* <div className={`text-xl font-bold ${card.color}`}> */}
                        <div className={`text-lg sm:text-xl md:text-2xl font-bold ${card.color}`}>
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
                {/* <div className="grid grid-cols-2 md:grid-cols-3
                    lg:grid-cols-6 gap-3"
                > */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(action.path)}
                            className={`flex flex-col items-center justify-center
gap-2 p-4 min-h-[120px] rounded-xl border
bg-transparent font-serif cursor-pointer
transition-all duration-200 ${action.color}`}
                        >
                            <span className="text-2xl">{action.icon}</span>
                            <span className="text-xs font-semibold">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── RECENT + OVERDUE ─────────────── */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent Loans */}
                {stats?.recentLoans?.length > 0 && (
                    <div>
                        <h2 className="text-sm text-gray-500 uppercase
                            tracking-widest mb-4"
                        >
                            Recent Issues
                        </h2>
                        <div className="bg-white/3 border border-white/7
                            rounded-2xl overflow-hidden"
                        >
                            {stats.recentLoans.slice(0, 5).map((loan, i) => (
                                <LoanRow
                                    key={loan.id}
                                    loan={loan}
                                    last={i === stats.recentLoans.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Overdue Loans */}
                {stats?.overdueLoans?.length > 0 && (
                    <div>
                        <h2 className="text-sm text-gray-500 uppercase
                            tracking-widest mb-4"
                        >
                            Overdue Books
                        </h2>
                        <div className="bg-white/3 border border-red-500/20
                            rounded-2xl overflow-hidden"
                        >
                            {stats.overdueLoans.slice(0, 5).map((loan, i) => (
                                <LoanRow
                                    key={loan.id}
                                    loan={loan}
                                    last={i === stats.overdueLoans.length - 1}
                                    overdue
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const LoanRow = ({ loan, last, overdue }) => (
    // <div className={`
    //     flex items-center justify-between p-4 gap-4
    //     ${!last ? "border-b border-white/5" : ""}
    // `}>

    <div
    className={`
    flex flex-col sm:flex-row
    sm:items-center sm:justify-between
    p-4 gap-2 sm:gap-4
    ${!last ? "border-b border-white/5" : ""}
`}
>
        <div>
            {/* <p className="text-sm font-semibold text-[#e8e0d0]"> */}
            <p className="text-sm sm:text-base font-semibold text-[#e8e0d0] break-words">
                {loan.bookTitle}
            </p>
            <p className="text-xs text-gray-500">
                {loan.studentName} • {loan.rollNumber}
            </p>
        </div>
        {/* <div className="text-right flex-shrink-0"> */}
        <div className="sm:text-right flex-shrink-0">
            {overdue ? (
                <p className="text-xs text-red-400 font-semibold">
                    {loan.overdueDays}d overdue
                </p>
            ) : (
                <p className="text-xs text-gray-500">
                    Due: {loan.dueDate}
                </p>
            )}
        </div>
    </div>
);

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading dashboard...
        </div>
    </div>
);

export default LibrarianDashboard;