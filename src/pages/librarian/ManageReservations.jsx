import { useState, useEffect } from "react";
import {
    getAllReservations,
    cancelReservation,
    markReservationActive
} from "../../services/reservationService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ManageReservations = () => {

    const { userId: librarianId } = useAuth();

    const [reservations, setReservations] = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [filter,       setFilter]       = useState("PENDING");
    const [processing,   setProcessing]   = useState(null);

    useEffect(() => { fetchReservations(); }, []);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await getAllReservations();
            setReservations(response.data);
        } catch (error) {
            toast.error("Failed to load reservations");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkActive = async (id) => {
        setProcessing(id);
        try {
            await markReservationActive(id);
            toast.success("Reservation marked as active");
            fetchReservations();
        } catch (error) {
            toast.error(error.message || "Failed");
        } finally {
            setProcessing(null);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this reservation?")) return;
        setProcessing(id);
        try {
            await cancelReservation(
                id,
                librarianId,
                "Cancelled by librarian"
            );
            toast.success("Reservation cancelled");
            fetchReservations();
        } catch (error) {
            toast.error(error.message || "Failed");
        } finally {
            setProcessing(null);
        }
    };

    const filtered = reservations.filter(r => {
        if (filter === "ALL")       return true;
        if (filter === "PENDING")   return r.status === "PENDING";
        if (filter === "ACTIVE")    return r.status === "ACTIVE";
        if (filter === "CANCELLED") return r.status === "CANCELLED";
        return true;
    });

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">
                    🔖 Manage Reservations
                </h1>
                <p className="text-sm text-gray-500">
                    {reservations.length} total reservations
                </p>
            </div>

            {/* ── FILTER TABS ──────────────────── */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {["ALL", "PENDING", "ACTIVE", "CANCELLED"].map(f => (
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

            {/* ── LIST ─────────────────────────── */}
            {filtered.length === 0 ? (
                <EmptyState message="No reservations found" />
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map(r => (
                        <div
                            key={r.id}
                            className={`
                                bg-white/3 border rounded-2xl p-5
                                flex flex-col md:flex-row items-start
                                md:items-center justify-between gap-4
                                ${r.status === "PENDING"
                                    ? "border-yellow-500/20"
                                    : r.status === "ACTIVE"
                                        ? "border-emerald-500/20"
                                        : "border-white/7"
                                }
                            `}
                        >
                            {/* Info */}
                            <div>
                                <p className="font-bold text-[#e8e0d0] mb-1">
                                    {r.bookTitle}
                                </p>
                                <p className="text-xs text-gray-500 mb-2">
                                    👤 {r.studentName} • {r.rollNumber}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Reserved:{" "}
                                    {new Date(r.reservedAt)
                                        .toLocaleDateString()}
                                </p>
                            </div>

                            {/* Status + Actions */}
                            <div className="flex items-center gap-3
                                flex-shrink-0"
                            >
                                <StatusBadge status={r.status} />

                                {r.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => handleMarkActive(r.id)}
                                            disabled={processing === r.id}
                                            className={`
                                                px-4 py-2 rounded-lg font-bold
                                                text-xs font-serif border-none
                                                transition-colors
                                                ${processing === r.id
                                                    ? "bg-emerald-500/50 cursor-not-allowed text-white/50"
                                                    : "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-400"
                                                }
                                            `}
                                        >
                                            Mark Active
                                        </button>
                                        <button
                                            onClick={() => handleCancel(r.id)}
                                            disabled={processing === r.id}
                                            className="px-4 py-2 rounded-lg
                                                border border-red-500/40
                                                text-red-400 text-xs
                                                font-semibold font-serif
                                                cursor-pointer bg-transparent
                                                hover:bg-red-500/10
                                                transition-colors
                                                disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </>
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
        PENDING:   "bg-yellow-500/15 text-yellow-400  border-yellow-500/30",
        ACTIVE:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        CANCELLED: "bg-red-500/15    text-red-400     border-red-500/30"
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
            Loading reservations...
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

export default ManageReservations;