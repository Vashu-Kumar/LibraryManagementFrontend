import { useState, useEffect } from "react";
import { getReservationsByStudent } from "../../services/reservationService";
import { cancelReservation } from "../../services/reservationService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MyReservations = () => {

    const { userId } = useAuth();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await getReservationsByStudent(userId);
            setReservations(response.data);
        } catch (error) {
            toast.error("Failed to load reservations");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (reservationId) => {
        setCancelling(reservationId);
        try {
            await cancelReservation(
                reservationId,
                userId,
                "Cancelled by student"
            );
            toast.success("Reservation cancelled");
            fetchReservations();
        } catch (error) {
            toast.error(error.message || "Cancel failed");
        } finally {
            setCancelling(null);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">
                    🔖 My Reservations
                </h1>
                <p className="text-sm text-gray-500">
                    {reservations.length} total reservations
                </p>
            </div>

            {/* ── INFO BOX ─────────────────────── */}
            <div className="bg-yellow-500/10 border border-yellow-500/20
                rounded-xl p-4 mb-6 text-sm text-yellow-400"
            >
                💡 Reserved books are held when you visit the library.
                Visit within a reasonable time to collect your book.
            </div>

            {/* ── LIST ─────────────────────────── */}
            {reservations.length === 0 ? (
                <EmptyState message="No reservations found" />
            ) : (
                <div className="flex flex-col gap-4">
                    {reservations.map(reservation => (
                        <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            onCancel={handleCancel}
                            cancelling={cancelling === reservation.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── RESERVATION CARD ─────────────────────
const ReservationCard = ({ reservation, onCancel, cancelling }) => {

    const isPending = reservation.status === "PENDING";
    const isActive = reservation.status === "ACTIVE";
    const isCancelled = reservation.status === "CANCELLED";

    return (
        <div className={`
            bg-white/3 border rounded-2xl p-5
            flex flex-col md:flex-row items-start
            md:items-center justify-between gap-4
            ${isPending
                ? "border-yellow-500/30"
                : isActive
                    ? "border-emerald-500/30"
                    : "border-white/7"
            }
        `}>
            {/* Book Info */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20
                    flex items-center justify-center
                    text-2xl flex-shrink-0"
                >
                    🔖
                </div>
                <div>
                    <p className="font-bold text-[#e8e0d0] mb-1">
                        {reservation.bookTitle}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                        {reservation.bookAuthor}
                    </p>
                    <p className="text-xs text-gray-500">
                        Reserved: {new Date(reservation.reservedAt)
                            .toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Status + Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">

                {/* Status Badge */}
                <StatusBadge status={reservation.status} />

                {/* Cancel Button */}
                {isPending && (
                    <button
                        onClick={() => onCancel(reservation.id)}
                        disabled={cancelling}
                        className="px-4 py-2 rounded-lg border
                            border-red-500/40 text-red-400
                            text-xs font-semibold font-serif
                            cursor-pointer bg-transparent
                            hover:bg-red-500/10 transition-colors
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelling ? "..." : "Cancel"}
                    </button>
                )}

                {/* Cancelled Reason */}
                {isCancelled && reservation.cancelReason && (
                    <p className="text-xs text-gray-600">
                        {reservation.cancelReason}
                    </p>
                )}
            </div>
        </div>
    );
};

// ── HELPERS ──────────────────────────────
const StatusBadge = ({ status }) => {
    const colors = {
        PENDING: "bg-yellow-500/15 text-yellow-400  border-yellow-500/30",
        ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
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

export default MyReservations;