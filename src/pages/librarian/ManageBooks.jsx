import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllBooks,
    searchBooks,
    deleteBook,
    addCopies,
    markDamaged
} from "../../services/bookService";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const ManageBooks = () => {

    const navigate = useNavigate();

    const [books,    setBooks]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [keyword,  setKeyword]  = useState("");
    const [deleting, setDeleting] = useState(null);

    useEffect(() => { fetchBooks(); }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await getAllBooks();
            setBooks(response.data);
        } catch (error) {
            toast.error("Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!keyword.trim()) { fetchBooks(); return; }
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

    const handleDelete = async (bookId) => {
        if (!window.confirm("Delete this book?")) return;
        setDeleting(bookId);
        try {
            await deleteBook(bookId);
            toast.success("Book deleted");
            fetchBooks();
        } catch (error) {
            toast.error(error.message || "Delete failed");
        } finally {
            setDeleting(null);
        }
    };

    const handleAddCopies = async (bookId) => {
        const count = window.prompt("How many copies to add?");
        if (!count || isNaN(count) || count < 1) return;
        try {
            await addCopies(bookId, parseInt(count));
            toast.success("Copies added");
            fetchBooks();
        } catch (error) {
            toast.error(error.message || "Failed to add copies");
        }
    };

    const handleMarkDamaged = async (bookId) => {
        const desc = window.prompt("Describe the damage:");
        if (!desc) return;
        try {
            await markDamaged(bookId, desc);
            toast.success("Copy marked as damaged");
            fetchBooks();
        } catch (error) {
            toast.error(error.message || "Failed");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">📚 Manage Books</h1>
                    <p className="text-sm text-gray-500">
                        {books.length} books
                    </p>
                </div>
                <button
                    onClick={() => navigate(ROUTES.LIBRARIAN.ADD_BOOK)}
                    className="px-5 py-2.5 bg-emerald-500 text-white
                        rounded-xl font-bold text-sm font-serif
                        cursor-pointer border-none hover:bg-emerald-400
                        transition-colors"
                >
                    + Add Book
                </button>
            </div>

            {/* ── SEARCH ───────────────────────── */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by title, author, ISBN..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl
                        bg-white/5 border border-white/10
                        text-[#e8e0d0] placeholder-gray-500
                        focus:outline-none focus:border-emerald-400/60
                        text-sm font-serif"
                />
                <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 text-white
                        rounded-xl font-bold text-sm font-serif
                        cursor-pointer border-none hover:bg-emerald-400
                        transition-colors"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => { setKeyword(""); fetchBooks(); }}
                    className="px-4 py-2.5 rounded-xl border
                        border-white/10 text-gray-400 text-sm
                        font-serif cursor-pointer bg-transparent
                        hover:bg-white/5 transition-colors"
                >
                    Reset
                </button>
            </form>

            {/* ── BOOKS TABLE ──────────────────── */}
            {books.length === 0 ? (
                <EmptyState message="No books found" />
            ) : (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl overflow-hidden"
                >
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3
                        border-b border-white/7 text-xs text-gray-500
                        uppercase tracking-wider"
                    >
                        <div className="col-span-4">Book</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Copies</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Table Rows */}
                    {books.map((book, i) => (
                        <div
                            key={book.id}
                            className={`
                                grid grid-cols-12 gap-4 px-4 py-4
                                items-center
                                ${i < books.length - 1
                                    ? "border-b border-white/5"
                                    : ""
                                }
                            `}
                        >
                            {/* Book */}
                            <div className="col-span-4">
                                <p className="font-semibold text-sm
                                    text-[#e8e0d0] line-clamp-1"
                                >
                                    {book.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {book.author}
                                </p>
                                {book.isbn && (
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        {book.isbn}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="col-span-2">
                                <span className="text-xs text-indigo-400
                                    bg-indigo-500/10 px-2 py-1
                                    rounded-lg border border-indigo-500/20"
                                >
                                    {book.categoryName}
                                </span>
                            </div>

                            {/* Copies */}
                            <div className="col-span-2">
                                <p className="text-sm text-[#e8e0d0]">
                                    {book.availableCopies}/{book.totalCopies}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {book.issuedCopies} issued
                                </p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                <span className={`
                                    text-xs px-2 py-1 rounded-full
                                    border font-semibold
                                    ${book.available
                                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                        : "bg-red-500/15 text-red-400 border-red-500/30"
                                    }
                                `}>
                                    {book.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 flex gap-1
                                justify-end flex-wrap"
                            >
                                <button
                                    onClick={() => navigate(
                                        ROUTES.LIBRARIAN.EDIT_BOOK
                                            .replace(":id", book.id)
                                    )}
                                    className="p-2 rounded-lg border
                                        border-indigo-500/30 text-indigo-400
                                        text-xs cursor-pointer bg-transparent
                                        hover:bg-indigo-500/10
                                        transition-colors"
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleAddCopies(book.id)}
                                    className="p-2 rounded-lg border
                                        border-emerald-500/30 text-emerald-400
                                        text-xs cursor-pointer bg-transparent
                                        hover:bg-emerald-500/10
                                        transition-colors"
                                    title="Add Copies"
                                >
                                    ➕
                                </button>
                                <button
                                    onClick={() => handleMarkDamaged(book.id)}
                                    className="p-2 rounded-lg border
                                        border-orange-500/30 text-orange-400
                                        text-xs cursor-pointer bg-transparent
                                        hover:bg-orange-500/10
                                        transition-colors"
                                    title="Mark Damaged"
                                >
                                    🔨
                                </button>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    disabled={deleting === book.id}
                                    className="p-2 rounded-lg border
                                        border-red-500/30 text-red-400
                                        text-xs cursor-pointer bg-transparent
                                        hover:bg-red-500/10 transition-colors
                                        disabled:opacity-50"
                                    title="Delete"
                                >
                                    🗑️
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
            Loading books...
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

export default ManageBooks;