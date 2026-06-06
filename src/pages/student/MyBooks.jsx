import { useState, useEffect } from "react";
import { getLoansByStudent } from "../../services/loanService";
import { renewLoan } from "../../services/loanService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyBooks = () => {

    const { userId } = useAuth();

    const [loans,    setLoans]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [renewing, setRenewing] = useState(null);
    const [filter,   setFilter]   = useState("ALL");

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await getLoansByStudent(userId);
            setLoans(response.data);
        } catch (error) {
            toast.error("Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    const handleRenew = async (loanId) => {
        setRenewing(loanId);
        try {
            await renewLoan(loanId, userId);
            toast.success("Loan renewed successfully!");
            fetchLoans();
        } catch (error) {
            toast.error(error.message || "Renewal failed");
        } finally {
            setRenewing(null);
        }
    };

    const filtered = loans.filter(loan => {
        if (filter === "ALL")      return true;
        if (filter === "ACTIVE")   return loan.status === "ACTIVE";
        if (filter === "OVERDUE")  return loan.status === "OVERDUE";
        if (filter === "RETURNED") return loan.status === "RETURNED";
        return true;
    });

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">
                        📖 My Books
                    </h1>
                    <p className="text-sm text-gray-500">
                        {loans.length} total loans
                    </p>
                </div>
            </div>

            {/* ── FILTER TABS ──────────────────── */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {["ALL", "ACTIVE", "OVERDUE", "RETURNED"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`
                            px-4 py-2 rounded-xl text-xs font-semibold
                            border transition-all cursor-pointer
                            font-serif
                            ${filter === f
                                ? "bg-yellow-400 text-[#0a0f1e] border-yellow-400"
                                : "bg-transparent text-gray-400 border-white/10 hover:border-white/20"
                            }
                        `}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* ── LOANS LIST ───────────────────── */}
            {filtered.length === 0 ? (
                <EmptyState message="No books found" />
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map(loan => (
                        <LoanCard
                            key={loan.id}
                            loan={loan}
                            onRenew={handleRenew}
                            renewing={renewing === loan.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── LOAN CARD ────────────────────────────
const LoanCard = ({ loan, onRenew, renewing }) => {

    const isOverdue  = loan.status === "OVERDUE" ||
        (loan.status === "ACTIVE" && loan.overdueDays > 0);
    const isActive   = loan.status === "ACTIVE";
    const isReturned = loan.status === "RETURNED";

    return (
        <div className={`
            bg-white/3 border rounded-2xl p-5
            flex flex-col md:flex-row items-start
            md:items-center justify-between gap-4
            ${isOverdue
                ? "border-red-500/30"
                : "border-white/7"
            }
        `}>
            {/* Book Info */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl
                    bg-indigo-500/20 flex items-center
                    justify-center text-2xl flex-shrink-0"
                >
                    📖
                </div>
                <div>
                    <p className="font-bold text-[#e8e0d0] mb-1">
                        {loan.bookTitle}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                        {loan.bookAuthor}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-500">
                        <span>📅 Issued: {loan.issueDate}</span>
                        <span>⏰ Due: {loan.dueDate}</span>
                    </div>
                </div>
            </div>

            {/* Status + Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">

                {/* Status Badge */}
                <StatusBadge status={loan.status} />

                {/* Overdue Info */}
                {isOverdue && loan.overdueDays > 0 && (
                    <p className="text-red-400 text-xs font-semibold">
                        {loan.overdueDays} days overdue
                        — Fine: ₹{loan.fineAmount}
                    </p>
                )}

                {/* Days Remaining */}
                {isActive && !isOverdue && loan.daysRemaining > 0 && (
                    <p className="text-emerald-400 text-xs">
                        {loan.daysRemaining} days remaining
                    </p>
                )}

                {/* Return Date */}
                {isReturned && loan.returnDate && (
                    <p className="text-blue-400 text-xs">
                        Returned: {loan.returnDate}
                    </p>
                )}

                {/* Renew Button */}
                {loan.renewable && isActive && !isOverdue && (
                    <button
                        onClick={() => onRenew(loan.id)}
                        disabled={renewing}
                        className="px-4 py-2 rounded-lg border
                            border-indigo-500/40 text-indigo-400
                            text-xs font-semibold font-serif
                            cursor-pointer bg-transparent
                            hover:bg-indigo-500/10 transition-colors
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {renewing ? "..." : "🔄 Renew"}
                    </button>
                )}
            </div>
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const StatusBadge = ({ status }) => {
    const colors = {
        ACTIVE:   "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        RETURNED: "bg-blue-500/15    text-blue-400    border-blue-500/30",
        OVERDUE:  "bg-red-500/15     text-red-400     border-red-500/30",
        LOST:     "bg-gray-500/15    text-gray-400    border-gray-500/30"
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
        <div className="text-gray-500 font-serif text-sm">
            Loading your books...
        </div>
    </div>
);

const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center
        h-64 text-gray-500"
    >
        <div className="text-5xl mb-4">📭</div>
        <p className="font-serif text-sm">{message}</p>
    </div>
);

export default MyBooks;