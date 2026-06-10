import { useState, useEffect } from "react";
import {
    getAllLibrarians,
    createLibrarian,
    toggleUserStatus
} from "../../services/userService";
import { adminResetPassword } from "../../services/authService";
import toast from "react-hot-toast";

const ManageLibrarians = () => {

    const [librarians, setLibrarians] = useState([]);
    const [loading,    setLoading]    = useState(true);
    const [showForm,   setShowForm]   = useState(false);
    const [toggling,   setToggling]   = useState(null);
    const [saving,     setSaving]     = useState(false);
    const [formData,   setFormData]   = useState({
        firstName: "",
        lastName:  "",
        email:     "",
        password:  ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => { fetchLibrarians(); }, []);

    const fetchLibrarians = async () => {
        try {
            setLoading(true);
            const response = await getAllLibrarians();
            setLibrarians(response.data);
        } catch (error) {
            toast.error("Failed to load librarians");
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const e = {};
        if (!formData.firstName.trim()) e.firstName = "Required";
        if (!formData.email.trim())     e.email     = "Required";
        if (!formData.password || formData.password.length < 8)
            e.password = "Min 8 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleCreate = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            await createLibrarian(formData);
            toast.success("Librarian created successfully!");
            setShowForm(false);
            setFormData({
                firstName: "",
                lastName:  "",
                email:     "",
                password:  ""
            });
            setErrors({});
            fetchLibrarians();
        } catch (error) {
            toast.error(error.message || "Failed to create librarian");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (userId, currentStatus) => {
        setToggling(userId);
        try {
            await toggleUserStatus(userId);
            toast.success(
                currentStatus ? "Librarian deactivated" : "Librarian activated"
            );
            fetchLibrarians();
        } catch (error) {
            toast.error(error.message || "Failed");
        } finally {
            setToggling(null);
        }
    };

    const handleResetPassword = async (userId) => {
        const newPassword = window.prompt(
            "Enter new password (min 8 characters):"
        );
        if (!newPassword || newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        try {
            await adminResetPassword(userId, newPassword);
            toast.success("Password reset successfully");
        } catch (error) {
            toast.error(error.message || "Reset failed");
        }
    };

    const inputClass = (field) => `
        w-full px-4 py-3 rounded-xl bg-white/5 border
        ${errors[field]
            ? "border-red-500/60"
            : "border-white/10 focus:border-indigo-400/60"
        }
        text-[#e8e0d0] placeholder-gray-500 focus:outline-none
        transition-all duration-200 text-sm font-serif
    `;

    if (loading) return <Loader />;

    return (
        <div className="font-serif text-[#e8e0d0]">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">
                        📋 Manage Librarians
                    </h1>
                    <p className="text-sm text-gray-500">
                        {librarians.length} librarians
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2.5 bg-indigo-500 text-white
                        rounded-xl font-bold text-sm font-serif
                        cursor-pointer border-none hover:bg-indigo-400
                        transition-colors"
                >
                    {showForm ? "Cancel" : "+ Add Librarian"}
                </button>
            </div>

            {/* ── ADD FORM ─────────────────────── */}
            {showForm && (
                <div className="bg-white/3 border border-indigo-500/20
                    rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-sm uppercase tracking-widest
                        text-gray-400 mb-5"
                    >
                        New Librarian
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    First Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={e => setFormData({
                                        ...formData,
                                        firstName: e.target.value
                                    })}
                                    className={inputClass("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={e => setFormData({
                                        ...formData,
                                        lastName: e.target.value
                                    })}
                                    className={inputClass("lastName")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="librarian@library.com"
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
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Min 8 characters"
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
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 py-3 rounded-xl border
                                    border-white/10 text-gray-400 text-sm
                                    font-serif cursor-pointer bg-transparent
                                    hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className={`
                                    flex-1 py-3 rounded-xl font-bold
                                    text-sm font-serif border-none
                                    transition-colors
                                    ${saving
                                        ? "bg-indigo-500/50 cursor-not-allowed text-white/50"
                                        : "bg-indigo-500 text-white cursor-pointer hover:bg-indigo-400"
                                    }
                                `}
                            >
                                {saving ? "Creating..." : "Create Librarian"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── TABLE ────────────────────────── */}
            {librarians.length === 0 ? (
                <EmptyState message="No librarians found" />
            ) : (
                <div className="bg-white/3 border border-white/7
                    rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3
                        border-b border-white/7 text-xs text-gray-500
                        uppercase tracking-wider"
                    >
                        <div className="col-span-4">Librarian</div>
                        <div className="col-span-3">Email</div>
                        <div className="col-span-2">Created</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    {librarians.map((lib, i) => (
                        <div
                            key={lib.id}
                            className={`
                                grid grid-cols-12 gap-4 px-4 py-4
                                items-center
                                ${i < librarians.length - 1
                                    ? "border-b border-white/5"
                                    : ""
                                }
                            `}
                        >
                            {/* Librarian */}
                            <div className="col-span-4 flex
                                items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-full
                                    bg-gradient-to-br from-emerald-500
                                    to-teal-500 flex items-center
                                    justify-center text-xs font-bold
                                    text-white flex-shrink-0"
                                >
                                    {lib.firstName?.charAt(0)}
                                </div>
                                <p className="text-sm font-semibold
                                    text-[#e8e0d0]"
                                >
                                    {lib.fullName}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="col-span-3">
                                <p className="text-xs text-gray-400">
                                    {lib.email || "—"}
                                </p>
                            </div>

                            {/* Created */}
                            <div className="col-span-2">
                                <p className="text-xs text-gray-500">
                                    {lib.createdAt
                                        ? new Date(lib.createdAt)
                                            .toLocaleDateString()
                                        : "—"
                                    }
                                </p>
                            </div>

                            {/* Status */}
                            <div className="col-span-1">
                                <span className={`
                                    text-xs px-2 py-0.5 rounded-full
                                    border font-semibold
                                    ${lib.active
                                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                        : "bg-red-500/15 text-red-400 border-red-500/30"
                                    }
                                `}>
                                    {lib.active ? "Active" : "Off"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 flex gap-1
                                justify-end"
                            >
                                <button
                                    onClick={() => handleToggle(
                                        lib.id, lib.active
                                    )}
                                    disabled={toggling === lib.id}
                                    className={`
                                        px-3 py-1.5 rounded-lg text-xs
                                        font-semibold font-serif border
                                        cursor-pointer transition-colors
                                        disabled:opacity-50
                                        ${lib.active
                                            ? "border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10"
                                            : "border-emerald-500/30 text-emerald-400 bg-transparent hover:bg-emerald-500/10"
                                        }
                                    `}
                                >
                                    {toggling === lib.id
                                        ? "..."
                                        : lib.active
                                            ? "Deactivate"
                                            : "Activate"
                                    }
                                </button>
                                <button
                                    onClick={() => handleResetPassword(lib.id)}
                                    className="px-3 py-1.5 rounded-lg
                                        text-xs font-semibold font-serif
                                        border border-indigo-500/30
                                        text-indigo-400 bg-transparent
                                        hover:bg-indigo-500/10
                                        cursor-pointer transition-colors"
                                >
                                    Reset PW
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
            Loading librarians...
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

export default ManageLibrarians;