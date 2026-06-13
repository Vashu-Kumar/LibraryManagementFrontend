import { useState } from "react";
import { searchUsers } from "../../services/userService";
import { searchBooks } from "../../services/bookService";
import { issueBook } from "../../services/loanService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const IssueBook = () => {

    const { userId: librarianId } = useAuth();

    const [step, setStep] = useState(1);
    const [studentQuery, setStudentQuery] = useState("");
    const [bookQuery, setBookQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searching, setSearching] = useState(false);
    const [issuing, setIssuing] = useState(false);
    const [issued, setIssued] = useState(null);

    // ── SEARCH STUDENT ───────────────────
    const handleSearchStudent = async (e) => {
        e.preventDefault();
        if (!studentQuery.trim()) return;
        setSearching(true);
        try {
            const response = await searchUsers(studentQuery.trim());
            setStudents(response.data.filter(
                u => u.role === "STUDENT"
            ));
        } catch (error) {
            toast.error("Student search failed");
        } finally {
            setSearching(false);
        }
    };

    // ── SEARCH BOOK ──────────────────────
    const handleSearchBook = async (e) => {
        e.preventDefault();
        if (!bookQuery.trim()) return;
        setSearching(true);
        try {
            const response = await searchBooks(bookQuery.trim());
            setBooks(response.data);
        } catch (error) {
            toast.error("Book search failed");
        } finally {
            setSearching(false);
        }
    };

    // ── ISSUE ────────────────────────────
    const handleIssue = async () => {
        if (!selectedStudent || !selectedBook) return;
        setIssuing(true);
        try {
            const response = await issueBook(
                {
                    userId: selectedStudent.id,
                    bookId: selectedBook.id
                },
                librarianId
            );
            setIssued(response.data);
            toast.success("Book issued successfully!");
        } catch (error) {
            toast.error(error.message || "Issue failed");
        } finally {
            setIssuing(false);
        }
    };

    // ── RESET ────────────────────────────
    const handleReset = () => {
        setStep(1);
        setStudentQuery("");
        setBookQuery("");
        setStudents([]);
        setBooks([]);
        setSelectedStudent(null);
        setSelectedBook(null);
        setIssued(null);
    };

    // ── SUCCESS SCREEN ───────────────────
    if (issued) {
        return (
            <div className="font-serif text-[#e8e0d0] max-w-lg mx-auto">
                <div className="bg-emerald-500/10 border border-emerald-500/20
                    rounded-2xl p-8 text-center"
                >
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-xl font-bold text-emerald-400 mb-2">
                        Book Issued Successfully!
                    </h2>
                    <div className="bg-white/5 rounded-xl p-4 mt-4
                        text-left space-y-2"
                    >
                        {[
                            { label: "Book", value: issued.bookTitle },
                            { label: "Student", value: issued.studentName },
                            { label: "Roll No", value: issued.rollNumber },
                            { label: "Issued", value: issued.issueDate },
                            { label: "Due", value: issued.dueDate }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between
                                text-sm"
                            >
                                <span className="text-gray-500">
                                    {item.label}
                                </span>
                                <span className="font-semibold">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleReset}
                        className="mt-6 w-full py-3 rounded-xl
                            bg-emerald-500 text-white font-bold
                            text-sm font-serif cursor-pointer
                            border-none hover:bg-emerald-400
                            transition-colors"
                    >
                        Issue Another Book
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-serif text-[#e8e0d0] max-w-2xl">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">📤 Issue Book</h1>
                <p className="text-sm text-gray-500">
                    Search student and book to issue
                </p>
            </div>

            {/* ── STEPS ────────────────────────── */}
            <div className="flex items-center gap-3 mb-8">
                {[
                    { num: 1, label: "Select Student" },
                    { num: 2, label: "Select Book" },
                    { num: 3, label: "Confirm Issue" }
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center gap-3">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center
                            justify-center text-sm font-bold
                            ${step >= s.num
                                ? "bg-emerald-500 text-white"
                                : "bg-white/10 text-gray-500"
                            }
                        `}>
                            {step > s.num ? "✓" : s.num}
                        </div>
                        <span className={`text-sm ${step >= s.num
                                ? "text-[#e8e0d0]"
                                : "text-gray-500"
                            }`}>
                            {s.label}
                        </span>
                        {i < 2 && (
                            <div className={`flex-1 h-px w-8 ${step > s.num
                                    ? "bg-emerald-500"
                                    : "bg-white/10"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* ── STEP 1 — SELECT STUDENT ──────── */}
            {step === 1 && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-6"
                >
                    <h2 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-4"
                    >
                        Search Student
                    </h2>
                    <form
                        onSubmit={handleSearchStudent}
                        className="flex gap-3 mb-4"
                    >
                        <input
                            type="text"
                            placeholder="Name, Roll No, or Student ID..."
                            value={studentQuery}
                            onChange={e => setStudentQuery(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl
                                bg-white/5 border border-white/10
                                text-[#e8e0d0] placeholder-gray-500
                                focus:outline-none
                                focus:border-emerald-400/60 text-sm
                                font-serif"
                        />
                        <button
                            type="submit"
                            disabled={searching}
                            className="px-5 py-3 bg-emerald-500
                                text-white rounded-xl font-bold
                                text-sm font-serif cursor-pointer
                                border-none hover:bg-emerald-400
                                transition-colors
                                disabled:opacity-50"
                        >
                            {searching ? "..." : "Search"}
                        </button>
                    </form>

                    {/* Student Results */}
                    {students.length > 0 && (
                        <div className="space-y-2">
                            {students.map(student => (
                                <div
                                    key={student.id}
                                    onClick={() => {
                                        setSelectedStudent(student);
                                        setStep(2);
                                    }}
                                    className={`
                                        p-4 rounded-xl border cursor-pointer
                                        transition-all duration-200
                                        ${selectedStudent?.id === student.id
                                            ? "border-emerald-500/60 bg-emerald-500/10"
                                            : "border-white/10 hover:border-white/20 bg-white/3"
                                        }
                                    `}
                                >
                                    <div className="flex items-center
                                        justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold text-sm">
                                                {student.fullName}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {student.rollNumber} •{" "}
                                                {student.studentId}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">
                                                {student.department}
                                            </p>
                                            <span className={`
                                                text-xs px-2 py-0.5
                                                rounded-full border mt-1
                                                inline-block
                                                ${student.borrowingBlocked
                                                    ? "bg-red-500/15 text-red-400 border-red-500/30"
                                                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                                }
                                            `}>
                                                {student.borrowingBlocked
                                                    ? "Blocked"
                                                    : "Active"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {students.length === 0 && studentQuery && !searching && (
                        <p className="text-gray-500 text-sm text-center py-4">
                            No students found
                        </p>
                    )}
                </div>
            )}

            {/* ── STEP 2 — SELECT BOOK ─────────── */}
            {step === 2 && (
                <div className="space-y-4">

                    {/* Selected Student */}
                    <div className="bg-emerald-500/10 border
                        border-emerald-500/20 rounded-xl p-4
                        flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm font-bold text-emerald-400">
                                ✓ {selectedStudent.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {selectedStudent.rollNumber}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setStep(1);
                                setSelectedStudent(null);
                            }}
                            className="text-xs text-gray-500
                                hover:text-red-400 cursor-pointer
                                bg-transparent border-none"
                        >
                            Change
                        </button>
                    </div>

                    {/* Search Book */}
                    <div className="bg-white/3 border border-white/7
                        rounded-2xl p-6"
                    >
                        <h2 className="text-sm font-bold uppercase
                            tracking-widest text-gray-400 mb-4"
                        >
                            Search Book
                        </h2>
                        <form
                            onSubmit={handleSearchBook}
                            className="flex gap-3 mb-4"
                        >
                            <input
                                type="text"
                                placeholder="Title, Author, or ISBN..."
                                value={bookQuery}
                                onChange={e => setBookQuery(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl
                                    bg-white/5 border border-white/10
                                    text-[#e8e0d0] placeholder-gray-500
                                    focus:outline-none
                                    focus:border-emerald-400/60 text-sm
                                    font-serif"
                            />
                            <button
                                type="submit"
                                disabled={searching}
                                className="px-5 py-3 bg-emerald-500
                                    text-white rounded-xl font-bold
                                    text-sm font-serif cursor-pointer
                                    border-none hover:bg-emerald-400
                                    transition-colors disabled:opacity-50"
                            >
                                {searching ? "..." : "Search"}
                            </button>
                        </form>

                        {/* Book Results */}
                        {books.length > 0 && (
                            <div className="space-y-2">
                                {books.map(book => (
                                    <div
                                        key={book.id}
                                        onClick={() => {
                                            if (!book.available) return;
                                            setSelectedBook(book);
                                            setStep(3);
                                        }}
                                        className={`
                                            p-4 rounded-xl border
                                            transition-all duration-200
                                            ${!book.available
                                                ? "border-white/5 opacity-50 cursor-not-allowed"
                                                : selectedBook?.id === book.id
                                                    ? "border-emerald-500/60 bg-emerald-500/10 cursor-pointer"
                                                    : "border-white/10 hover:border-white/20 bg-white/3 cursor-pointer"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center
                                            justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold
                                                    text-sm"
                                                >
                                                    {book.title}
                                                </p>
                                                <p className="text-xs
                                                    text-gray-500 mt-0.5"
                                                >
                                                    {book.author} •{" "}
                                                    {book.categoryName}
                                                </p>
                                            </div>
                                            <span className={`
                                                text-xs px-2 py-1 rounded-full
                                                border font-semibold
                                                ${book.available
                                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                                    : "bg-red-500/15 text-red-400 border-red-500/30"
                                                }
                                            `}>
                                                {book.available
                                                    ? `${book.availableCopies} left`
                                                    : "Unavailable"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── STEP 3 — CONFIRM ─────────────── */}
            {step === 3 && selectedStudent && selectedBook && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-6"
                >
                    <h2 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-6"
                    >
                        Confirm Issue
                    </h2>

                    {/* Summary */}
                    <div className="space-y-3 mb-6">
                        {[
                            {
                                icon: "👤",
                                label: "Student",
                                value: `${selectedStudent.fullName} (${selectedStudent.rollNumber})`
                            },
                            {
                                icon: "📚",
                                label: "Book",
                                value: selectedBook.title
                            },
                            {
                                icon: "✍️",
                                label: "Author",
                                value: selectedBook.author
                            },
                            {
                                icon: "📋",
                                label: "Available",
                                value: `${selectedBook.availableCopies} copies`
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3
                                    p-3 bg-white/3 rounded-xl border
                                    border-white/7"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        {item.label}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 py-3 rounded-xl border
                                border-white/10 text-gray-400 text-sm
                                font-serif cursor-pointer bg-transparent
                                hover:bg-white/5 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleIssue}
                            disabled={issuing}
                            className={`
                                flex-1 py-3 rounded-xl font-bold
                                text-sm font-serif border-none
                                transition-colors
                                ${issuing
                                    ? "bg-emerald-500/50 cursor-not-allowed text-white/50"
                                    : "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-400"
                                }
                            `}
                        >
                            {issuing ? "Issuing..." : "✓ Confirm Issue"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueBook;