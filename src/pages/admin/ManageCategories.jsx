import { useState, useEffect } from "react";
import {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";
import toast from "react-hot-toast";

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [loading,    setLoading]    = useState(true);
    const [showForm,   setShowForm]   = useState(false);
    const [editing,    setEditing]    = useState(null);
    const [deleting,   setDeleting]   = useState(null);
    const [saving,     setSaving]     = useState(false);
    const [formData,   setFormData]   = useState({
        name:        "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = "Category name is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            if (editing) {
                await updateCategory(
                    editing.id,
                    formData.name,
                    formData.description
                );
                toast.success("Category updated");
            } else {
                await addCategory(formData.name, formData.description);
                toast.success("Category added");
            }
            resetForm();
            fetchCategories();
        } catch (error) {
            toast.error(error.message || "Failed");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (category) => {
        setEditing(category);
        setFormData({
            name: category.name,
            description: category.description || ""
        });
        setShowForm(true);
        setErrors({});
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;
        setDeleting(id);
        try {
            await deleteCategory(id);
            toast.success("Category deleted");
            fetchCategories();
        } catch (error) {
            toast.error(error.message || "Delete failed");
        } finally {
            setDeleting(null);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditing(null);
        setFormData({ name: "", description: "" });
        setErrors({});
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
                        🏷️ Manage Categories
                    </h1>
                    <p className="text-sm text-gray-500">
                        {categories.length} categories
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (showForm && !editing) {
                            resetForm();
                        } else {
                            setEditing(null);
                            setFormData({ name: "", description: "" });
                            setErrors({});
                            setShowForm(true);
                        }
                    }}
                    className="px-5 py-2.5 bg-indigo-500 text-white
                        rounded-xl font-bold text-sm font-serif
                        cursor-pointer border-none hover:bg-indigo-400
                        transition-colors"
                >
                    {showForm && !editing ? "Cancel" : "+ Add Category"}
                </button>
            </div>

            {/* ── FORM ─────────────────────────── */}
            {showForm && (
                <div className="bg-white/3 border border-indigo-500/20
                    rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-sm uppercase tracking-widest
                        text-gray-400 mb-5"
                    >
                        {editing ? "Edit Category" : "New Category"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Computer Science"
                                value={formData.name}
                                onChange={e => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    });
                                    if (errors.name)
                                        setErrors({ ...errors, name: "" });
                                }}
                                className={inputClass("name")}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                placeholder="Brief description"
                                value={formData.description}
                                onChange={e => setFormData({
                                    ...formData,
                                    description: e.target.value
                                })}
                                className={inputClass("description")}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={resetForm}
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
                                {saving
                                    ? "Saving..."
                                    : editing
                                        ? "Update"
                                        : "Add Category"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── CATEGORIES GRID ──────────────── */}
            {categories.length === 0 ? (
                <EmptyState message="No categories found" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2
                    lg:grid-cols-3 gap-4"
                >
                    {categories.map(cat => (
                        <div
                            key={cat.id}
                            className="bg-white/3 border border-white/7
                                rounded-2xl p-5 hover:border-indigo-500/30
                                transition-all"
                        >
                            <div className="flex items-start
                                justify-between mb-3"
                            >
                                <div>
                                    <h3 className="font-bold text-[#e8e0d0]
                                        mb-1"
                                    >
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {cat.description || "No description"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="p-2 rounded-lg border
                                            border-indigo-500/30 text-indigo-400
                                            text-xs cursor-pointer bg-transparent
                                            hover:bg-indigo-500/10
                                            transition-colors"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        disabled={deleting === cat.id}
                                        className="p-2 rounded-lg border
                                            border-red-500/30 text-red-400
                                            text-xs cursor-pointer bg-transparent
                                            hover:bg-red-500/10 transition-colors
                                            disabled:opacity-50"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-indigo-500/10
                                    border border-indigo-500/20 text-indigo-400
                                    px-2 py-1 rounded-lg"
                                >
                                    📚 {cat.totalBooks} books
                                </span>
                                <span className={`
                                    text-xs px-2 py-1 rounded-lg border
                                    ${cat.active
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/10 border-red-500/20 text-red-400"
                                    }
                                `}>
                                    {cat.active ? "Active" : "Inactive"}
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
            Loading categories...
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

export default ManageCategories;