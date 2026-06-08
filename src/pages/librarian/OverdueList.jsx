import { useState, useEffect } from "react";
import { getOverdueLoans, markAsLost } from "../../services/loanService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const OverdueList = () => {

    const navigate = useNavigate();
    const [loans,    setLoans]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [marking,  setMarking]  = useState(null);

    useEffect(() => { fetchOverdue(); }, []);

    const fetchOverdue = async () => {
        try {
            setLoading(true);
            const response = await getOverdueLoans();
            setLoans(response.data);
        } catch (error) {
            toast.error("Failed to load overdue loans");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkLost = async (loanId) => {
        if (!window.confirm("Mark this book as lost?")) return;
        setMarking(loanId);
        try {
            await markAsLost(loanId);
            toast.success("Marked as lost");
            fetchOverdue();
        } catch (error) {
            toast.error(error.message || "Failed");
        } finally {
            setMarking(null);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">⏰ Overdue Books</h1>
                <p className="text-sm text-gray-500">
                    {loans.length} overdue loan(s)
                </p>
            </div>

            {/* ── ALERT ────────────────────────── */}
            {loans.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20
                    rounded-xl p-4 mb-6 text-sm text-red-400"
                >
                    ⚠️ These books are past their due date.
                    Fines are being calculated automatically every day.
                </div>
            )}

            {/* ── LIST ─────────────────────────── */}
            {loans.length === 0 ? (
                <div className="flex flex-col items-center justify-center
                    h-64 text-gray-500"
                >
                    <div className="text-5xl mb-4">🎉</div>
                    <p className="font-serif text-sm">
                        No overdue books!
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {loans.map(loan => (
                        <div
                            key={loan.id}
                            className="bg-white/3 border border-red-500/20
                                rounded-2xl p-5 flex flex-col md:flex-row
                                items-start md:items-center
                                justify-between gap-4"
                        >
                            {/* Info */}
                            <div>
                                <p className="font-bold text-[#e8e0d0] mb-1">
                                    {loan.bookTitle}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">
                                    {loan.bookAuthor}
                                </p>
                                <div className="flex flex-wrap gap-4
                                    text-xs text-gray-500"
                                >
                                    <span>
                                        👤 {loan.studentName}
                                    </span>
                                    <span>
                                        🆔 {loan.rollNumber}
                                    </span>
                                    <span>
                                        📅 Due: {loan.dueDate}
                                    </span>
                                    <span className="text-red-400 font-semibold">
                                        ⏰ {loan.overdueDays} days overdue
                                    </span>
                                    <span className="text-orange-400 font-semibold">
                                        💰 Fine: ₹{loan.fineAmount}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => navigate(
                                        ROUTES.LIBRARIAN.RETURN_BOOK
                                    )}
                                    className="px-4 py-2 rounded-lg
                                        bg-blue-500 text-white text-xs
                                        font-bold font-serif cursor-pointer
                                        border-none hover:bg-blue-400
                                        transition-colors"
                                >
                                    Return
                                </button>
                                <button
                                    onClick={() => handleMarkLost(loan.id)}
                                    disabled={marking === loan.id}
                                    className="px-4 py-2 rounded-lg border
                                        border-red-500/40 text-red-400
                                        text-xs font-semibold font-serif
                                        cursor-pointer bg-transparent
                                        hover:bg-red-500/10 transition-colors
                                        disabled:opacity-50"
                                >
                                    {marking === loan.id
                                        ? "..."
                                        : "Mark Lost"
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading overdue loans...
        </div>
    </div>
);

export default OverdueList;