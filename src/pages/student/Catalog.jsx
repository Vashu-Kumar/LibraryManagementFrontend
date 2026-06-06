import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllBooks,
    searchBooks,
    filterBooks
} from "../../services/bookService";
import { getAllCategories } from "../../services/categoryService";
import { createReservation } from "../../services/reservationService";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const Catalog = () => {

    const { userId } = useAuth();
    const navigate   = useNavigate();

    const [books,       setBooks]       = useState([]);
    const [categories,  setCategories]  = useState([]);
    const [loading,     setLoading]     = useState(true);
    const [reserving,   setReserving]   = useState(null);
    const [keyword,     setKeyword]     = useState("");
    const [categoryId,  setCategoryId]  = useState("");
    const [available,   setAvailable]   = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [booksRes, catsRes] = await Promise.all([
                getAllBooks(),
                getAllCategories()
            ]);
            setBooks(booksRes.data);
            setCategories(catsRes.data);
        } catch (error) {
            toast.error("Failed to load catalog");
        } finally {
            setLoading(false);
        }
    };

    // ── SEARCH ───────────────────────────
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!keyword.trim()) {
            fetchData();
            return;
        }
        try {
            setLoading(true);
            const response = await searchBooks(keyword.trim());
            setBooks(response.data);
        } catch (error) {
            toast.error("Search failed");
        } finally {
            setLoading(false);
        }
    };

    // ── FILTER ───────────────────────────
    const handleFilter = async () => {
        try {
            setLoading(true);
            const response = await filterBooks(
                categoryId || null,
                available || null
            );
            setBooks(response.data);
        } catch (error) {
            toast.error("Filter failed");
        } finally {
            setLoading(false);
        }
    };

    // ── RESERVE ──────────────────────────
    const handleReserve = async (bookId) => {
        setReserving(bookId);
        try {
            await createReservation({ bookId }, userId);
            toast.success("Book reserved successfully!");
            fetchData();
        } catch (error) {
            toast.error(error.message || "Reservation failed");
        } finally {
            setReserving(null);
        }
    };

    // ── RESET FILTERS ────────────────────
    const handleReset = () => {
        setKeyword("");
        setCategoryId("");
        setAvailable(false);
        fetchData();
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">📚 Book Catalog</h1>
                <p className="text-sm text-gray-500">
                    {books.length} books found
                </p>
            </div>

            {/* ── SEARCH + FILTERS ─────────────── */}
            <div className="bg-white/3 border border-white/7
                rounded-2xl p-4 mb-6"
            >
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search by title, author, ISBN..."
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl
                            bg-white/5 border border-white/10
                            text-[#e8e0d0] placeholder-gray-500
                            focus:outline-none focus:border-yellow-400/60
                            text-sm font-serif"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-yellow-400
                            text-[#0a0f1e] rounded-xl font-bold
                            text-sm cursor-pointer border-none
                            hover:bg-yellow-300 transition-colors
                            font-serif"
                    >
                        Search
                    </button>
                </form>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-3 items-center">

                    {/* Category Filter */}
                    <select
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-white/5
                            border border-white/10 text-sm
                            text-[#e8e0d0] font-serif cursor-pointer
                            focus:outline-none"
                        style={{ background: "#0d1424" }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* Available Toggle */}
                    <label className="flex items-center gap-2
                        text-sm text-gray-400 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={available}
                            onChange={e => setAvailable(e.target.checked)}
                            className="w-4 h-4 accent-yellow-400"
                        />
                        Available only
                    </label>

                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 rounded-xl border
                            border-indigo-500/40 text-indigo-400
                            text-sm font-serif cursor-pointer
                            bg-transparent hover:bg-indigo-500/10
                            transition-colors"
                    >
                        Apply Filter
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-xl border
                            border-white/10 text-gray-400
                            text-sm font-serif cursor-pointer
                            bg-transparent hover:bg-white/5
                            transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* ── BOOKS GRID ───────────────────── */}
            {books.length === 0 ? (
                <EmptyState message="No books found" />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3
                    lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onReserve={handleReserve}
                            reserving={reserving === book.id}
                            onClick={() => navigate(
                                ROUTES.STUDENT.BOOK_DETAIL
                                    .replace(":id", book.id)
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// ── BOOK CARD ────────────────────────────
const BookCard = ({ book, onReserve, reserving, onClick }) => (
    <div className="bg-white/3 border border-white/7 rounded-2xl
        overflow-hidden hover:border-white/15 transition-all
        duration-200 cursor-pointer group"
    >
        {/* Cover */}
        <div
            onClick={onClick}
            className="relative h-48 bg-gradient-to-br
                from-indigo-500/20 to-purple-500/20
                flex items-center justify-center"
        >
            {book.coverImageUrl ? (
                <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={e => {
                        e.target.style.display = "none";
                    }}
                />
            ) : (
                <span className="text-5xl opacity-30">📖</span>
            )}

            {/* Availability Badge */}
            <div className={`
                absolute top-2 right-2 text-xs px-2 py-1
                rounded-full font-bold
                ${book.available
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }
            `}>
                {book.available
                    ? `${book.availableCopies} left`
                    : "Unavailable"
                }
            </div>
        </div>

        {/* Info */}
        <div className="p-3">
            <p
                onClick={onClick}
                className="text-sm font-bold leading-tight
                    mb-1 line-clamp-2 hover:text-yellow-400
                    transition-colors"
            >
                {book.title}
            </p>
            <p className="text-xs text-gray-500 mb-3">
                {book.author}
            </p>
            <p className="text-xs text-gray-600 mb-3">
                {book.categoryName}
            </p>

            {/* Reserve Button */}
            {!book.available ? (
                <button
                    onClick={() => onReserve(book.id)}
                    disabled={reserving}
                    className="w-full py-2 rounded-lg border
                        border-yellow-400/30 text-yellow-400
                        text-xs font-semibold font-serif
                        cursor-pointer bg-transparent
                        hover:bg-yellow-400/10 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {reserving ? "..." : "Reserve"}
                </button>
            ) : (
                <div className="w-full py-2 rounded-lg
                    bg-emerald-500/10 border border-emerald-500/20
                    text-emerald-400 text-xs font-semibold
                    text-center"
                >
                    Available
                </div>
            )}
        </div>
    </div>
);

// ── HELPERS ──────────────────────────────
const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading catalog...
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

export default Catalog;