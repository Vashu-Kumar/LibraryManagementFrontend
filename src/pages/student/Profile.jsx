import { useState, useEffect } from "react";
import { getUserById } from "../../services/userService";
import { changePassword } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { DEPARTMENTS } from "../../utils/constants";
import toast from "react-hot-toast";

const Profile = () => {

    const { userId } = useAuth();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("profile");
    const [pwData, setPwData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [pwLoading, setPwLoading] = useState(false);
    const [pwErrors, setPwErrors] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUserById(userId);
            setUser(response.data);
        } catch (error) {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!pwData.currentPassword)
            errors.currentPassword = "Required";
        if (!pwData.newPassword)
            errors.newPassword = "Required";
        else if (pwData.newPassword.length < 8)
            errors.newPassword = "Min 8 characters";
        if (pwData.newPassword !== pwData.confirmPassword)
            errors.confirmPassword = "Passwords do not match";

        if (Object.keys(errors).length > 0) {
            setPwErrors(errors);
            return;
        }

        setPwLoading(true);
        try {
            await changePassword(
                userId,
                pwData.currentPassword,
                pwData.newPassword,
                pwData.confirmPassword
            );
            toast.success("Password changed successfully");
            setPwData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setPwErrors({});
        } catch (error) {
            toast.error(error.message || "Password change failed");
        } finally {
            setPwLoading(false);
        }
    };

    const getDepartmentLabel = (value) => {
        const dept = DEPARTMENTS.find(d => d.value === value);
        return dept ? dept.label : value;
    };

    const inputClass = (field) => `
        w-full px-4 py-3 rounded-xl bg-white/5 border
        ${pwErrors[field]
            ? "border-red-500/60"
            : "border-white/10 focus:border-yellow-400/60"
        }
        text-[#e8e0d0] placeholder-gray-500 focus:outline-none
        transition-all duration-200 text-sm font-serif
    `;

    if (loading) return <Loader />;
    if (!user) return null;

    return (
        <div className="font-serif text-[#e8e0d0] max-w-2xl">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl
                    bg-gradient-to-br from-indigo-500 to-purple-500
                    flex items-center justify-center text-2xl
                    font-bold text-white flex-shrink-0"
                >
                    {user.firstName?.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user.fullName}</h1>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <div className="flex gap-3 mt-1">
                        <span className="text-xs text-indigo-400">
                            {user.studentId}
                        </span>
                        <span className="text-xs text-gray-600">|</span>
                        <span className="text-xs text-indigo-400">
                            {user.rollNumber}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── TABS ─────────────────────────── */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6">
                {[
                    { value: "profile", label: "Profile" },
                    { value: "password", label: "Change Password" }
                ].map(t => (
                    <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={`
                            flex-1 py-2 px-4 rounded-lg text-sm
                            font-semibold transition-all cursor-pointer
                            border-none font-serif
                            ${tab === t.value
                                ? "bg-yellow-400 text-[#0a0f1e]"
                                : "text-gray-400 bg-transparent hover:text-[#e8e0d0]"
                            }
                        `}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── PROFILE TAB ──────────────────── */}
            {tab === "profile" && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-6"
                >
                    <h2 className="text-sm uppercase tracking-widest
                        text-gray-500 mb-5"
                    >
                        Personal Information
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                            { label: "First Name", value: user.firstName },
                            { label: "Last Name", value: user.lastName },
                            { label: "Email", value: user.email },
                            { label: "Student ID", value: user.studentId },
                            { label: "Roll Number", value: user.rollNumber },
                            { label: "Department", value: getDepartmentLabel(user.department) },
                            { label: "Course", value: user.course },
                            { label: "Admission Year", value: user.admissionYear },
                            { label: "Membership", value: user.membershipType },
                            { label: "Borrow Limit", value: `${user.maxBorrowLimit} books` },
                            { label: "Loan Duration", value: `${user.borrowDurationDays} days` },
                            {
                                label: "Membership Expiry",
                                value: user.membershipExpiry
                            }
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
                                    {item.value || "—"}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Status */}
                    <div className="flex gap-3">
                        <div className={`
                            px-3 py-1.5 rounded-xl text-xs
                            font-semibold border
                            ${user.active
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                : "bg-red-500/15 text-red-400 border-red-500/30"
                            }
                        `}>
                            {user.active ? "✓ Active" : "✗ Inactive"}
                        </div>
                        <div className={`
                            px-3 py-1.5 rounded-xl text-xs
                            font-semibold border
                            ${user.borrowingBlocked
                                ? "bg-red-500/15 text-red-400 border-red-500/30"
                                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            }
                        `}>
                            {user.borrowingBlocked
                                ? "🔒 Borrowing Blocked"
                                : "✓ Borrowing Allowed"
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* ── PASSWORD TAB ─────────────────── */}
            {tab === "password" && (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-6"
                >
                    <h2 className="text-sm uppercase tracking-widest
                        text-gray-500 mb-5"
                    >
                        Change Password
                    </h2>

                    <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                    >
                        {/* Current Password */}
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={pwData.currentPassword}
                                onChange={e => setPwData({
                                    ...pwData,
                                    currentPassword: e.target.value
                                })}
                                className={inputClass("currentPassword")}
                            />
                            {pwErrors.currentPassword && (
                                <p className="text-red-400 text-xs mt-1">
                                    {pwErrors.currentPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Min 8 characters"
                                value={pwData.newPassword}
                                onChange={e => setPwData({
                                    ...pwData,
                                    newPassword: e.target.value
                                })}
                                className={inputClass("newPassword")}
                            />
                            {pwErrors.newPassword && (
                                <p className="text-red-400 text-xs mt-1">
                                    {pwErrors.newPassword}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Repeat new password"
                                value={pwData.confirmPassword}
                                onChange={e => setPwData({
                                    ...pwData,
                                    confirmPassword: e.target.value
                                })}
                                className={inputClass("confirmPassword")}
                            />
                            {pwErrors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">
                                    {pwErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={pwLoading}
                            className={`
                                w-full py-3 rounded-xl font-bold
                                text-sm border-none font-serif
                                transition-all duration-200
                                ${pwLoading
                                    ? "bg-yellow-400/50 text-[#0a0f1e]/50 cursor-not-allowed"
                                    : "bg-yellow-400 text-[#0a0f1e] hover:bg-yellow-300 cursor-pointer"
                                }
                            `}
                        >
                            {pwLoading
                                ? "Updating..."
                                : "Update Password"
                            }
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const Loader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 font-serif text-sm">
            Loading profile...
        </div>
    </div>
);

export default Profile;