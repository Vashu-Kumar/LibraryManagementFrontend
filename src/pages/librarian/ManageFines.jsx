import { useState, useEffect } from "react";
import { getAllFines, markFinePaid } from "../../services/fineService";
import { useAuth } from "../../context/AuthContext";
import { PAYMENT_METHODS } from "../../utils/constants";
import toast from "react-hot-toast";

const ManageFines = () => {

    const { userId: librarianId } = useAuth();

    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("PENDING");
    const [paying, setPaying] = useState(null);
    const [method, setMethod] = useState("CASH");

    useEffect(() => { fetchFines(); }, []);

    const fetchFines = async () => {
        try {
            setLoading(true);
            const response = await getAllFines();
            setFines(response.data);
        } catch (error) {
            toast.error("Failed to load fines");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkPaid = async (fineId) => {
        setPaying(fineId);
        try {
            await markFinePaid(
                { fineId, paymentMethod: method },
                librarianId
            );
            toast.success("Fine marked as paid!");
            fetchFines();
        } catch (error) {
            toast.error(error.message || "Failed to mark paid");
        } finally {
            setPaying(null);
        }
    };

    const filtered = fines.filter(f => {
        if (filter === "ALL") return true;
        if (filter === "PENDING") return f.status === "PENDING";
        if (filter === "PAID") return f.status === "PAID";
        return true;
    });

    const totalPending = fines
        .filter(f => f.status === "PENDING")
        .reduce((sum, f) => sum + f.amount, 0);

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">
                        💰 Manage Fines
                    </h1>
                    <p className="text-sm text-gray-500">
                        {fines.length} total fines
                    </p>
                </div>
                {totalPending > 0 && (
                    <div className="bg-orange-500/10 border
                        border-orange-500/20 rounded-xl px-4 py-2
                        text-right"
                    >
                        <p className="text-xs text-gray-500">Total Pending</p>
                        <p className="text-xl font-bold text-orange-400">
                            ₹{totalPending.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>

            {/* ── PAYMENT METHOD + FILTER ──────── */}
            <div className="flex flex-wrap gap-4 items-center mb-6">

                {/* Payment Method */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase
                        tracking-wider"
                    >
                        Payment Method:
                    </span>
                    <div className="flex gap-1">
                        {PAYMENT_METHODS.map(m => (
                            <button
                                key={m.value}
                                onClick={() => setMethod(m.value)}
                                className={`
                                    px-3 py-1.5 rounded-lg text-xs
                                    font-semibold border cursor-pointer
                                    font-serif transition-all
                                    ${method === m.value
                                        ? "bg-yellow-400 text-[#0a0f1e] border-yellow-400"
                                        : "bg-transparent text-gray-400 border-white/10 hover:border-white/20"
                                    }
                                `}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter */}
                <div className="flex gap-2 ml-auto">
                    {["ALL", "PENDING", "PAID"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs
                                font-semibold border cursor-pointer
                                font-serif transition-all
                                ${filter === f
                                    ? "bg-yellow-400 text-[#0a0f1e] border-yellow-400"
                                    : "bg-transparent text-gray-400 border-white/10"
                                }
                            `}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── FINES LIST ───────────────────── */}
            {filtered.length === 0 ? (
                <EmptyState message="No fines found" />
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map(fine => (
                        <div
                            key={fine.id}
                            className={`
                                bg-white/3 border rounded-2xl p-5
                                flex flex-col md:flex-row items-start
                                md:items-center justify-between gap-4
                                ${fine.status === "PENDING"
                                    ? "border-orange-500/20"
                                    : "border-white/7"
                                }
                            `}
                        >
                            {/* Info */}
                            <div>
                                <p className="font-bold text-[#e8e0d0] mb-1">
                                    {fine.bookTitle}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">
                                    👤 {fine.studentName} •{" "}
                                    {fine.rollNumber}
                                </p>
                                <div className="flex flex-wrap gap-3
                                    text-xs text-gray-500"
                                >
                                    <span>
                                        ⏰ {fine.overdueDays} days
                                    </span>
                                    <span>
                                        ₹{fine.finePerDay}/day
                                    </span>
                                    {fine.paidAt && (
                                        <span>
                                            Paid: {new Date(fine.paidAt)
                                                .toLocaleDateString()}
                                        </span>
                                    )}
                                    {fine.collectedByName && (
                                        <span>
                                            By: {fine.collectedByName}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Amount + Action */}
                            <div className="flex items-center gap-4
                                flex-shrink-0"
                            >
                                <div className="text-right">
                                    <p className={`text-xl font-bold ${fine.status === "PENDING"
                                            ? "text-orange-400"
                                            : "text-emerald-400"
                                        }`}>
                                        ₹{fine.amount?.toFixed(2)}
                                    </p>
                                    <StatusBadge status={fine.status} />
                                </div>
                                {fine.status === "PENDING" && (
                                    <button
                                        onClick={() => handleMarkPaid(fine.id)}
                                        disabled={paying === fine.id}
                                        className={`
                                            px-4 py-2.5 rounded-xl font-bold
                                            text-sm font-serif border-none
                                            transition-colors
                                            ${paying === fine.id
                                                ? "bg-emerald-500/50 cursor-not-allowed text-white/50"
                                                : "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-400"
                                            }
                                        `}
                                    >
                                        {paying === fine.id
                                            ? "..."
                                            : "Mark Paid"
                                        }
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: "bg-orange-500/15 text-orange-400 border-orange-500/30",
        PAID: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    };
    return (
        <span className={`
            text-xs px-2 py-0.5 rounded-full border
            font-semibold mt-1 inline-block
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
        <div className="text-5xl mb-4">📭</div>
        <p className="font-serif text-sm">{message}</p>
    </div>
);

export default ManageFines;