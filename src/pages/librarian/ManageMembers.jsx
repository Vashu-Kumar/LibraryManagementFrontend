import { useState, useEffect } from "react";
import {
    getAllStudents,
    searchUsers
} from "../../services/userService";
import toast from "react-hot-toast";

const ManageMembers = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    useEffect(() => { fetchStudents(); }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await getAllStudents();
            setStudents(response.data);
        } catch (error) {
            toast.error("Failed to load members");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!keyword.trim()) { fetchStudents(); return; }
        try {
            setLoading(true);
            const response = await searchUsers(keyword.trim());
            setStudents(response.data.filter(u => u.role === "STUDENT"));
        } catch (error) {
            toast.error("Search failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">👥 Members</h1>
                <p className="text-sm text-gray-500">
                    {students.length} registered students
                </p>
            </div>

            {/* ── SEARCH ───────────────────────── */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by name, roll number, student ID..."
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
                    className="px-5 py-2.5 bg-yellow-400 text-[#0a0f1e]
                        rounded-xl font-bold text-sm font-serif
                        cursor-pointer border-none hover:bg-yellow-300
                        transition-colors"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => { setKeyword(""); fetchStudents(); }}
                    className="px-4 py-2.5 rounded-xl border
                        border-white/10 text-gray-400 text-sm
                        font-serif cursor-pointer bg-transparent
                        hover:bg-white/5 transition-colors"
                >
                    Reset
                </button>
            </form>

            {/* ── TABLE ────────────────────────── */}
            {students.length === 0 ? (
                <EmptyState message="No students found" />
            ) : (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3
                        border-b border-white/7 text-xs text-gray-500
                        uppercase tracking-wider"
                    >
                        <div className="col-span-3">Student</div>
                        <div className="col-span-2">ID / Roll</div>
                        <div className="col-span-3">Department</div>
                        <div className="col-span-2">Membership</div>
                        <div className="col-span-2">Status</div>
                    </div>

                    {/* Rows */}
                    {students.map((student, i) => (
                        <div
                            key={student.id}
                            className={`
                                grid grid-cols-12 gap-4 px-4 py-4
                                items-center
                                ${i < students.length - 1
                                    ? "border-b border-white/5"
                                    : ""
                                }
                            `}
                        >
                            {/* Student */}
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full
                                    bg-gradient-to-br from-indigo-500
                                    to-purple-500 flex items-center
                                    justify-center text-xs font-bold
                                    text-white flex-shrink-0"
                                >
                                    {student.firstName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold
                                        text-[#e8e0d0]"
                                    >
                                        {student.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {student.email || "No email"}
                                    </p>
                                </div>
                            </div>

                            {/* ID / Roll */}
                            <div className="col-span-2">
                                <p className="text-xs text-indigo-400">
                                    {student.studentId}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {student.rollNumber}
                                </p>
                            </div>

                            {/* Department */}
                            <div className="col-span-3">
                                <p className="text-xs text-[#e8e0d0]">
                                    {student.department || "—"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {student.course || ""}
                                </p>
                            </div>

                            {/* Membership */}
                            <div className="col-span-2">
                                <p className="text-xs text-[#e8e0d0]">
                                    {student.membershipType}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {student.maxBorrowLimit} books
                                </p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2 flex flex-col gap-1">
                                <span className={`
                                    text-xs px-2 py-0.5 rounded-full
                                    border w-fit font-semibold
                                    ${student.active
                                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                        : "bg-red-500/15 text-red-400 border-red-500/30"
                                    }
                                `}>
                                    {student.active ? "Active" : "Inactive"}
                                </span>
                                {student.borrowingBlocked && (
                                    <span className="text-xs px-2 py-0.5
                                        rounded-full border w-fit
                                        bg-orange-500/15 text-orange-400
                                        border-orange-500/30 font-semibold"
                                    >
                                        Blocked
                                    </span>
                                )}
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
            Loading members...
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

export default ManageMembers;