import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate();
    const { setAuthData, getDashboardRoute } = useAuth();

    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState("email");
    const [formData, setFormData] = useState({
        email: "",
        rollNumber: "",
        studentId: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    // ── DEMO ACCOUNTS ────────────────────
    const demoAccounts = [
        {
            label: "Admin",
            email: import.meta.env.VITE_DEMO_ADMIN_EMAIL,
            password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD,
            color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
        },
        {
            label: "Librarian",
            email: import.meta.env.VITE_DEMO_LIBRARIAN_EMAIL,
            password: import.meta.env.VITE_DEMO_LIBRARIAN_PASSWORD,
            color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
        },
        {
            label: "Student",
            email: import.meta.env.VITE_DEMO_STUDENT_EMAIL,
            password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD,
            color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
        }
    ];

    const fillDemo = (account) => {
        setLoginType("email");
        setFormData({
            email: account.email,
            rollNumber: "",
            studentId: "",
            password: account.password
        });
        setErrors({});
    };

    // ── VALIDATION ───────────────────────

    const validate = () => {
        const newErrors = {};
        if (loginType === "email" && !formData.email)
            newErrors.email = "Email is required";
        if (loginType === "rollNumber" && !formData.rollNumber)
            newErrors.rollNumber = "Roll number is required";
        if (loginType === "studentId" && !formData.studentId)
            newErrors.studentId = "Student ID is required";
        if (!formData.password)
            newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ── SUBMIT ───────────────────────────

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = { password: formData.password };
            if (loginType === "email") payload.email = formData.email;
            if (loginType === "rollNumber") payload.rollNumber = formData.rollNumber;
            if (loginType === "studentId") payload.studentId = formData.studentId;

            const response = await login(payload);
            setAuthData(response.data);
            toast.success(`Welcome back, ${response.data.fullName}!`);
            navigate(getDashboardRoute());

        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // ── INPUT CLASS ──────────────────────

    const inputClass = (field) => `
        w-full px-8 py-2 rounded-xl bg-white/5 border
        ${errors[field]
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-yellow-400/60"
        }
        text-[#000] placeholder-gray-500
        focus:outline-none focus:bg-white/8
        transition-all duration-200 text-sm font-serif
    `;

    return (
        <div className="w-[80%] max-w-md font-serif"
        >
            <div className="w-full max-w-md">

                {/* ── DEMO ACCOUNTS ────────────────── */}
                <div className="mb-2">
                    <p className="text-xs text-red-800 text-center
                        uppercase tracking-widest mb-3"
                    >
                        Try Demo Accounts
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {demoAccounts.map(account => (
                            <button
                                key={account.label}
                                onClick={() => fillDemo(account)}
                                className={`
                                    py-2 px-3 rounded-lg border text-xs
                                    font-semibold transition-all duration-200
                                    hover:opacity-80 cursor-pointer
                                    ${account.color}
                                `}
                            >
                                {account.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── FORM CARD ────────────────────── */}
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-2"
                >
                    <h2 className="text-xl font-bold mb-4 text-[#3746ec]">
                        Sign In
                    </h2>

                    {/* Login Type Tabs */}
                    <div className="flex gap-1 p-1 bg-white/5
                        rounded-xl mb-4"
                    >
                        {[
                            { value: "email", label: "Email" },
                            { value: "rollNumber", label: "Roll No." },
                            { value: "studentId", label: "Student ID" }
                        ].map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setLoginType(tab.value);
                                    setErrors({});
                                }}
                                className={`
                                    flex-1 py-2 px-3 rounded-lg text-xs
                                    font-semibold transition-all duration-200
                                    cursor-pointer border-none
                                    ${loginType === tab.value
                                        ? "bg-yellow-400 text-[#0a0f1e]"
                                        : "text-gray-600 bg-transparent"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Dynamic Credential Field */}
                        {loginType === "email" && (
                            <div>
                                <label className="block text-xs text-gray-700
                                    mb-1 uppercase tracking-wider"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={e => setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })}
                                    className={inputClass("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        )}

                        {loginType === "rollNumber" && (
                            <div>
                                <label className="block text-xs text-gray-700
                                    mb-1 uppercase tracking-wider"
                                >
                                    Roll Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 24CS782"
                                    value={formData.rollNumber}
                                    onChange={e => setFormData({
                                        ...formData,
                                        rollNumber: e.target.value
                                    })}
                                    className={inputClass("rollNumber")}
                                />
                                {errors.rollNumber && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.rollNumber}
                                    </p>
                                )}
                            </div>
                        )}

                        {loginType === "studentId" && (
                            <div>
                                <label className="block text-xs text-gray-700
                                    mb-1 uppercase tracking-wider"
                                >
                                    Student ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. CS2024-4782"
                                    value={formData.studentId}
                                    onChange={e => setFormData({
                                        ...formData,
                                        studentId: e.target.value
                                    })}
                                    className={inputClass("studentId")}
                                />
                                {errors.studentId && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.studentId}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block text-xs text-gray-700
                                mb-1 uppercase tracking-wider"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={e => setFormData({
                                    ...formData,
                                    password: e.target.value
                                })}
                                className={inputClass("password")}
                            />
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-4 rounded-xl font-bold text-sm
                                transition-all duration-200 border-none
                                font-serif cursor-pointer mt-2
                                ${loading
                                    ? "bg-yellow-400/50 text-[#0a0f1e]/50 cursor-not-allowed"
                                    : "bg-yellow-400 text-[#0a0f1e] hover:bg-yellow-300"
                                }
                            `}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-500 mt-2">
                        New student?{" "}
                        <Link
                            to={ROUTES.REGISTER}
                            className="text-yellow-600 text-bold
                            hover:text-yellow-300
                                transition-colors"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;