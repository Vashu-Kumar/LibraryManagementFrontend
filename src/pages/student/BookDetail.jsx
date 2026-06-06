import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../../services/bookService";
import { createReservation } from "../../services/reservationService";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const BookDetail = () => {

    const { id }     = useParams();
    const navigate   = useNavigate();
    const { userId } = useAuth();

    const [book,      setBook]      = useState(null);
    const [loading,   setLoading]   = useState(true);
    const [reserving, setReserving] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            setLoading(true);
            const response = await getBookById(id);
            setBook(response.data);
        } catch (error) {
            toast.error("Failed to load book details");
            navigate(ROUTES.STUDENT.CATALOG);
        } finally {
            setLoading(false);
        }
    };

    const handleReserve = async () => {
        setReserving(true);
        try {
            await createReservation({ bookId: book.id }, userId);
            toast.success("Book reserved successfully!");
            fetchBook();
        } catch (error) {
            toast.error(error.message || "Reservation failed");
        } finally {
            setReserving(false);
        }
    };

    if (loading) return <Loader />;
    if (!book)   return null;

    return (
        <div className="font-serif text-[#e8e0d0] max-w-4xl">

            {/* ── BACK ─────────────────────────── */}
            <button
                onClick={() => navigate(ROUTES.STUDENT.CATALOG)}
                className="flex items-center gap-2 text-gray-400
                    text-sm mb-6 hover:text-yellow-400 transition-colors
                    cursor-pointer bg-transparent border-none"
            >
                ← Back to Catalog
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* ── COVER ────────────────────── */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl overflow-hidden
                        bg-gradient-to-br from-indigo-500/20
                        to-purple-500/20 aspect-[3/4]
                        flex items-center justify-center"
                    >
                        {book.coverImageUrl ? (
                            <img
                                src={book.coverImageUrl}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-8xl opacity-20">📖</span>
                        )}
                    </div>

                    {/* Availability */}
                    <div className={`
                        mt-4 p-4 rounded-xl border text-center
                        ${book.available
                            ? "bg-emerald-500/10 border-emerald-500/20"
                            : "bg-red-500/10 border-red-500/20"
                        }
                    `}>
                        <p className={`text-lg font-bold ${
                            book.available
                                ? "text-emerald-400"
                                : "text-red-400"
                        }`}>
                            {book.available ? "Available" : "Not Available"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {book.availableCopies} of {book.totalCopies} copies
                        </p>
                    </div>

                    {/* Reserve Button */}
                    {!book.available && (
                        <button
                            onClick={handleReserve}
                            disabled={reserving}
                            className="w-full mt-3 py-3 rounded-xl
                                border border-yellow-400/40
                                text-yellow-400 font-bold text-sm
                                font-serif cursor-pointer bg-transparent
                                hover:bg-yellow-400/10 transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {reserving ? "Reserving..." : "🔖 Reserve Book"}
                        </button>
                    )}
                </div>

                {/* ── DETAILS ──────────────────── */}
                <div className="md:col-span-2">

                    {/* Title & Author */}
                    <h1 className="text-2xl font-bold mb-1">
                        {book.title}
                    </h1>
                    <p className="text-gray-400 mb-1">by {book.author}</p>
                    <p className="text-xs text-indigo-400 mb-6">
                        {book.categoryName}
                    </p>

                    {/* Description */}
                    {book.description && (
                        <div className="mb-6">
                            <h3 className="text-sm uppercase tracking-widest
                                text-gray-500 mb-2"
                            >
                                About
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {book.description}
                            </p>
                        </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: "ISBN",        value: book.isbn         || "N/A" },
                            { label: "Publisher",   value: book.publisher    || "N/A" },
                            { label: "Year",        value: book.publishYear  || "N/A" },
                            { label: "Pages",       value: book.totalPages   || "N/A" },
                            { label: "Total Copies",value: book.totalCopies           },
                            { label: "Available",   value: book.availableCopies       }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/3 border border-white/7
                                    rounded-xl p-3"
                            >
                                <p className="text-xs text-gray-500 mb-1">
                                    {item.label}
                                </p>
                                <p className="text-sm font-semibold">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex gap-4">
                        <div className="text-center">
                            <p className="text-xl font-bold text-yellow-400">
                                {book.totalBorrowCount}
                            </p>
                            <p className="text-xs text-gray-500">
                                Times Borrowed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading book details...
        </div>
    </div>
);

export default BookDetail;