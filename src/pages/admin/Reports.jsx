import { useState, useEffect } from "react";
import { getAdminStats } from "../../services/dashboardService";
import { getTopBorrowedBooks } from "../../services/bookService";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import toast from "react-hot-toast";

const COLORS = [
    "#6366f1", "#10b981", "#f5c842",
    "#f87171", "#60a5fa", "#a78bfa",
    "#34d399", "#fb923c"
];

const Reports = () => {

    const [stats, setStats]   = useState(null);
    const [topBooks, setTopBooks]   = useState([]);
    const [loading, setLoading]    = useState(true);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, booksRes] = await Promise.all([
                getAdminStats(),
                getTopBorrowedBooks()
            ]);
            setStats(statsRes.data);
            setTopBooks(booksRes.data.slice(0, 8));
        } catch (error) {
            toast.error("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    // ── CHART DATA ───────────────────────
    const bookStatsData = [
        { name: "Available", value: stats?.totalAvailableBooks ?? 0 },
        { name: "Issued",  value: stats?.totalIssuedBooks ?? 0 },
        { name: "Damaged", value: stats?.totalDamagedBooks ?? 0 }
    ];

    const loanStatsData = [
        { name: "Active",  value: stats?.totalActiveLoans ?? 0 },
        { name: "Overdue", value: stats?.totalOverdueLoans ?? 0 }
    ];

    const fineStatsData = [
        {
            name: "Pending",
            value: stats?.totalPendingFineAmount ?? 0
        },
        {
            name: "Collected",
            value: stats?.totalCollectedFineAmount ?? 0
        }
    ];

    const topBooksData = topBooks.map(book => ({
        name:  book.title.length > 20
            ? book.title.substring(0, 20) + "..."
            : book.title,
        count: book.totalBorrowCount
    }));

    const customTooltipStyle = {
        background:    "#1a2035",
        border:        "1px solid rgba(255,255,255,0.1)",
        borderRadius:  "8px",
        color:         "#e8e0d0",
        fontFamily:    "Georgia, serif",
        fontSize:      "12px"
    };

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">📊 Reports</h1>
                <p className="text-sm text-gray-500">
                    Library analytics overview
                </p>
            </div>

            {/* ── SUMMARY CARDS ────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: "Total Books",
                        value: stats?.totalBooks ?? 0,
                        icon:  "📚",
                        color: "text-indigo-400"
                    },
                    {
                        label: "Total Students",
                        value: stats?.totalStudents ?? 0,
                        icon:  "👥",
                        color: "text-purple-400"
                    },
                    {
                        label: "Fines Collected",
                        value: `₹${stats?.totalCollectedFineAmount?.toFixed(0) ?? 0}`,
                        icon:  "💰",
                        color: "text-emerald-400"
                    },
                    {
                        label: "Pending Fines",
                        value: `₹${stats?.totalPendingFineAmount?.toFixed(0) ?? 0}`,
                        icon:  "⚠️",
                        color: "text-red-400"
                    }
                ].map((card, i) => (
                    <div
                        key={i}
                        className="bg-white/3 border border-white/7
                            rounded-2xl p-5"
                    >
                        <div className="text-2xl mb-2">{card.icon}</div>
                        <div className={`text-2xl font-bold ${card.color}`}>
                            {card.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {card.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── CHARTS ROW 1 ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* Book Distribution Pie */}
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-5"
                >
                    <h3 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-4"
                    >
                        Book Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={bookStatsData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {bookStatsData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={customTooltipStyle}
                            />
                            <Legend
                                formatter={v => (
                                    <span style={{
                                        color: "#9ca3af",
                                        fontSize: "11px",
                                        fontFamily: "Georgia, serif"
                                    }}>
                                        {v}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Loan Stats Pie */}
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-5"
                >
                    <h3 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-4"
                    >
                        Loan Status
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={loanStatsData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {loanStatsData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i + 2]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={customTooltipStyle}
                            />
                            <Legend
                                formatter={v => (
                                    <span style={{
                                        color: "#9ca3af",
                                        fontSize: "11px",
                                        fontFamily: "Georgia, serif"
                                    }}>
                                        {v}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Fine Stats */}
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-5"
                >
                    <h3 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-4"
                    >
                        Fine Collection
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={fineStatsData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {fineStatsData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i + 4]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={customTooltipStyle}
                                formatter={v => [`₹${v}`, ""]}
                            />
                            <Legend
                                formatter={v => (
                                    <span style={{
                                        color: "#9ca3af",
                                        fontSize: "11px",
                                        fontFamily: "Georgia, serif"
                                    }}>
                                        {v}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ── TOP BORROWED BOOKS CHART ─────── */}
            {topBooksData.length > 0 && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-5 mb-6"
                >
                    <h3 className="text-sm font-bold uppercase
                        tracking-widest text-gray-400 mb-4"
                    >
                        Top Borrowed Books
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={topBooksData}
                            margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
                        >
                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: "#6b7280",
                                    fontSize: "10px",
                                    fontFamily: "Georgia, serif"
                                }}
                                angle={-30}
                                textAnchor="end"
                            />
                            <YAxis
                                tick={{
                                    fill: "#6b7280",
                                    fontSize:   11,
                                    fontFamily: "Georgia, serif"
                                }}
                            />
                            <Tooltip
                                contentStyle={customTooltipStyle}
                                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                            />
                            <Bar
                                dataKey="count"
                                fill="#6366f1"
                                radius={[6, 6, 0, 0]}
                                name="Times Borrowed"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ── TOP BOOKS TABLE ──────────────── */}
            {topBooks.length > 0 && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl overflow-hidden"
                >
                    <div className="px-5 py-4 border-b border-white/7">
                        <h3 className="text-sm font-bold uppercase
                            tracking-widest text-gray-400"
                        >
                            Most Borrowed Books
                        </h3>
                    </div>
                    <div className="grid grid-cols-12 gap-4 px-5 py-3
                        border-b border-white/7 text-xs text-gray-500
                        uppercase tracking-wider"
                    >
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Title</div>
                        <div className="col-span-3">Author</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-1 text-right">Count</div>
                    </div>
                    {topBooks.map((book, i) => (
                        <div
                            key={book.id}
                            className={`
                                grid grid-cols-12 gap-4 px-5 py-4
                                items-center
                                ${i < topBooks.length - 1
                                    ? "border-b border-white/5"
                                    : ""
                                }
                            `}
                        >
                            <div className="col-span-1">
                                <span className="text-sm font-bold
                                    text-gray-500"
                                >
                                    #{i + 1}
                                </span>
                            </div>
                            <div className="col-span-5">
                                <p className="text-sm font-semibold
                                    text-[#e8e0d0] line-clamp-1"
                                >
                                    {book.title}
                                </p>
                            </div>
                            <div className="col-span-3">
                                <p className="text-xs text-gray-500">
                                    {book.author}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-xs text-indigo-400
                                    bg-indigo-500/10 px-2 py-0.5
                                    rounded-lg border border-indigo-500/20"
                                >
                                    {book.categoryName}
                                </span>
                            </div>
                            <div className="col-span-1 text-right">
                                <span className="text-sm font-bold
                                    text-yellow-400"
                                >
                                    {book.totalBorrowCount}
                                </span>
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
            Loading reports...
        </div>
    </div>
);

export default Reports;