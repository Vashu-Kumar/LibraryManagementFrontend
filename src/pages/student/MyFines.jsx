import { useState, useEffect } from "react";
import { getFinesByStudent } from "../../services/fineService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyFines = () => {

    const { userId } = useAuth();

    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        fetchFines();
    }, []);

    const fetchFines = async () => {
        try {
            setLoading(true);
            const response = await getFinesByStudent(userId);
            setFines(response.data);
        } catch (error) {
            toast.error("Failed to load fines");
        } finally {
            setLoading(false);
        }
    };

    const filtered = fines.filter(fine => {
        if (filter === "ALL") return true;
        if (filter === "PENDING") return fine.status === "PENDING";
        if (filter === "PAID") return fine.status === "PAID";
        return true;
    });

    const totalPending = fines
        .filter(f => f.status === "PENDING")
        .reduce((sum, f) => sum + f.amount, 0);

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">⚠️ My Fines</h1>
                <p className="text-sm text-gray-500">
                    {fines.length} total fines
                </p>
            </div>

            {/* ── PENDING FINE SUMMARY ─────────── */}
            {totalPending > 0 && (
                <div className="bg-red-500/10 border border-red-500/20
                    rounded-2xl p-5 mb-6"
                >
                    <p className="text-xs text-red-400 uppercase
                        tracking-widest mb-1"
                    >
                        Total Pending Fine
                    </p>
                    <p className="text-4xl font-bold text-red-400 mb-2">
                        ₹{totalPending.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                        Visit the library counter to pay your fine
                        and unblock borrowing
                    </p>
                </div>
            )}

            {/* ── FILTER TABS ──────────────────── */}
            <div className="flex gap-2 mb-6">
                {["ALL", "PENDING", "PAID"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`
                            px-4 py-2 rounded-xl text-xs font-semibold
                            border transition-all cursor-pointer font-serif
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

            {/* ── FINES LIST ───────────────────── */}
            {filtered.length === 0 ? (
                <EmptyState message="No fines found" />
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map(fine => (
                        <FineCard key={fine.id} fine={fine} />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── FINE CARD ────────────────────────────
const FineCard = ({ fine }) => {
    const isPending = fine.status === "PENDING";
    return (
        <div className={`
            bg-white/3 border rounded-2xl p-5
            ${isPending
                ? "border-red-500/30"
                : "border-white/7"
            }
        `}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-bold text-[#e8e0d0] mb-1">
                        {fine.bookTitle}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                        Loan ID: #{fine.loanId}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs
                        text-gray-500"
                    >
                        <span>
                            📅 Overdue Days: {fine.overdueDays}
                        </span>
                        <span>
                            💰 Rate: ₹{fine.finePerDay}/day
                        </span>
                        {fine.paidAt && (
                            <span>
                                ✅ Paid: {new Date(fine.paidAt)
                                    .toLocaleDateString()}
                            </span>
                        )}
                        {fine.paymentMethod && (
                            <span>
                                💳 Method: {fine.paymentMethod}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2
                    flex-shrink-0"
                >
                    <p className={`text-2xl font-bold ${isPending ? "text-red-400" : "text-emerald-400"
                        }`}>
                        ₹{fine.amount?.toFixed(2)}
                    </p>
                    <StatusBadge status={fine.status} />
                </div>
            </div>
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: "bg-red-500/15    text-red-400     border-red-500/30",
        PAID: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    };
    return (
        <span className={`
            text-xs px-3 py-1 rounded-full border font-semibold
            ${colors[status] || colors.PENDING}
        `}>
            {status}
        </span>
    );
};

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading fines...
        </div>
    </div>
);

const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center
        h-64 text-gray-500"
    >
        <div className="text-5xl mb-4 ">🎉</div>
        <p className="font-serif text-sm">{message}</p>
    </div>
);

export default MyFines;