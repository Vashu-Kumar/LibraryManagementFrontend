import { useState } from "react";
import { getLoansByStudent } from "../../services/loanService";
import { returnBook } from "../../services/loanService";
import { searchUsers } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ReturnBook = () => {

    const { userId: librarianId } = useAuth();

    const [query, setQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeLoans, setActiveLoans] = useState([]);
    const [searching, setSearching] = useState(false);
    const [returning, setReturning] = useState(null);
    const [returned, setReturned] = useState(null);
    const [condition, setCondition] = useState("GOOD");
    const [remarks, setRemarks] = useState("");

    // ── SEARCH STUDENT ───────────────────
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        try {
            const response = await searchUsers(query.trim());
            setStudents(response.data.filter(u => u.role === "STUDENT"));
            setSelectedStudent(null);
            setActiveLoans([]);
        } catch (error) {
            toast.error("Search failed");
        } finally {
            setSearching(false);
        }
    };

    // ── SELECT STUDENT ───────────────────
    const handleSelectStudent = async (student) => {
        setSelectedStudent(student);
        setSearching(true);
        try {
            const response = await getLoansByStudent(student.id);
            const active = response.data.filter(
                l => l.status === "ACTIVE" || l.status === "OVERDUE"
            );
            setActiveLoans(active);
        } catch (error) {
            toast.error("Failed to load loans");
        } finally {
            setSearching(false);
        }
    };

    // ── RETURN ───────────────────────────
    const handleReturn = async (loanId) => {
        setReturning(loanId);
        try {
            const response = await returnBook(
                loanId,
                librarianId,
                condition,
                remarks
            );
            setReturned(response.data);
            toast.success("Book returned successfully!");
        } catch (error) {
            toast.error(error.message || "Return failed");
        } finally {
            setReturning(null);
        }
    };

    // ── RESET ────────────────────────────
    const handleReset = () => {
        setQuery("");
        setStudents([]);
        setSelectedStudent(null);
        setActiveLoans([]);
        setReturned(null);
        setCondition("GOOD");
        setRemarks("");
    };

    // ── SUCCESS SCREEN ───────────────────
    if (returned) {
        return (
            <div className="font-serif text-[#e8e0d0] max-w-lg mx-auto">
                <div className={`
                    border rounded-2xl p-8 text-center
                    ${returned.fineApplied
                        ? "bg-orange-500/10 border-orange-500/20"
                        : "bg-blue-500/10 border-blue-500/20"
                    }
                `}>
                    <div className="text-5xl mb-4">
                        {returned.fineApplied ? "⚠️" : "✅"}
                    </div>
                    <h2 className={`text-xl font-bold mb-2 ${returned.fineApplied
                            ? "text-orange-400"
                            : "text-blue-400"
                        }`}>
                        Book Returned
                        {returned.fineApplied && " — Fine Applied"}
                    </h2>

                    <div className="bg-white/5 rounded-xl p-4 mt-4
                        text-left space-y-2"
                    >
                        {[
                            { label: "Book", value: returned.bookTitle },
                            { label: "Student", value: returned.studentName },
                            { label: "Returned", value: returned.returnDate },
                            returned.fineApplied && {
                                label: "Fine",
                                value: `₹${returned.fineAmount}`
                            }
                        ].filter(Boolean).map((item, i) => (
                            <div key={i} className="flex justify-between
                                text-sm"
                            >
                                <span className="text-gray-500">
                                    {item.label}
                                </span>
                                <span className={`font-semibold ${item.label === "Fine"
                                        ? "text-orange-400"
                                        : ""
                                    }`}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleReset}
                        className="mt-6 w-full py-3 rounded-xl
                            bg-blue-500 text-white font-bold
                            text-sm font-serif cursor-pointer
                            border-none hover:bg-blue-400
                            transition-colors"
                    >
                        Return Another Book
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="font-serif text-[#e8e0d0] max-w-2xl">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">📥 Return Book</h1>
                <p className="text-sm text-gray-500">
                    Search student to process book return
                </p>
            </div>

            {/* ── SEARCH STUDENT ───────────────── */}
            <div className="bg-white/3 border border-white/7
                rounded-2xl p-6 mb-6"
            >
                <h2 className="text-sm font-bold uppercase tracking-widest
                    text-gray-400 mb-4"
                >
                    Search Student
                </h2>
                <form onSubmit={handleSearch} className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Name, Roll No, or Student ID..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl
                            bg-white/5 border border-white/10
                            text-[#e8e0d0] placeholder-gray-500
                            focus:outline-none focus:border-blue-400/60
                            text-sm font-serif"
                    />
                    <button
                        type="submit"
                        disabled={searching}
                        className="px-5 py-3 bg-blue-500 text-white
                            rounded-xl font-bold text-sm font-serif
                            cursor-pointer border-none
                            hover:bg-blue-400 transition-colors
                            disabled:opacity-50"
                    >
                        {searching ? "..." : "Search"}
                    </button>
                </form>

                {/* Student Results */}
                {students.length > 0 && !selectedStudent && (
                    <div className="mt-4 space-y-2">
                        {students.map(student => (
                            <div
                                key={student.id}
                                onClick={() => handleSelectStudent(student)}
                                className="p-4 rounded-xl border
                                    border-white/10 hover:border-blue-400/40
                                    bg-white/3 cursor-pointer
                                    transition-all duration-200"
                            >
                                <div className="flex items-center
                                    justify-between"
                                >
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {student.fullName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {student.rollNumber} •{" "}
                                            {student.studentId}
                                        </p>
                                    </div>
                                    <span className="text-xs text-blue-400">
                                        Select →
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── SELECTED STUDENT LOANS ───────── */}
            {selectedStudent && (
                <div>
                    {/* Student Info */}
                    <div className="bg-blue-500/10 border
                        border-blue-500/20 rounded-xl p-4 mb-4
                        flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm font-bold text-blue-400">
                                {selectedStudent.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {selectedStudent.rollNumber}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedStudent(null);
                                setActiveLoans([]);
                            }}
                            className="text-xs text-gray-500
                                hover:text-red-400 cursor-pointer
                                bg-transparent border-none"
                        >
                            Change
                        </button>
                    </div>

                    {/* Book Condition */}
                    <div className="bg-white/3 border border-white/7
                        rounded-2xl p-5 mb-4"
                    >
                        <h3 className="text-xs uppercase tracking-widest
                            text-gray-500 mb-3"
                        >
                            Book Condition on Return
                        </h3>
                        <div className="flex gap-2 mb-3">
                            {["GOOD", "FAIR", "POOR", "DAMAGED"].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setCondition(c)}
                                    className={`
                                        px-3 py-2 rounded-lg text-xs
                                        font-semibold border cursor-pointer
                                        font-serif transition-all
                                        ${condition === c
                                            ? "bg-yellow-400 text-[#0a0f1e] border-yellow-400"
                                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/20"
                                        }
                                    `}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Remarks (optional)"
                            value={remarks}
                            onChange={e => setRemarks(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl
                                bg-white/5 border border-white/10
                                text-[#e8e0d0] placeholder-gray-500
                                focus:outline-none focus:border-blue-400/60
                                text-sm font-serif"
                        />
                    </div>

                    {/* Active Loans */}
                    {searching ? (
                        <p className="text-center text-gray-500 text-sm py-4">
                            Loading loans...
                        </p>
                    ) : activeLoans.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">📭</div>
                            <p className="text-sm">No active loans found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <h3 className="text-xs uppercase tracking-widest
                                text-gray-500"
                            >
                                Active Loans ({activeLoans.length})
                            </h3>
                            {activeLoans.map(loan => (
                                <div
                                    key={loan.id}
                                    className={`
                                        bg-white/3 border rounded-2xl p-5
                                        flex items-center justify-between gap-4
                                        ${loan.overdueDays > 0
                                            ? "border-red-500/30"
                                            : "border-white/7"
                                        }
                                    `}
                                >
                                    <div>
                                        <p className="font-bold text-sm mb-1">
                                            {loan.bookTitle}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {loan.bookAuthor}
                                        </p>
                                        <div className="flex gap-3 text-xs
                                            text-gray-500"
                                        >
                                            <span>Issued: {loan.issueDate}</span>
                                            <span>Due: {loan.dueDate}</span>
                                        </div>
                                        {loan.overdueDays > 0 && (
                                            <p className="text-red-400 text-xs mt-1">
                                                ⚠️ {loan.overdueDays} days overdue
                                                — Fine: ₹{loan.fineAmount}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleReturn(loan.id)}
                                        disabled={returning === loan.id}
                                        className={`
                                            px-5 py-2.5 rounded-xl font-bold
                                            text-sm font-serif border-none
                                            flex-shrink-0 transition-colors
                                            ${returning === loan.id
                                                ? "bg-blue-500/50 cursor-not-allowed text-white/50"
                                                : "bg-blue-500 text-white cursor-pointer hover:bg-blue-400"
                                            }
                                        `}
                                    >
                                        {returning === loan.id
                                            ? "..."
                                            : "Return"
                                        }
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReturnBook;