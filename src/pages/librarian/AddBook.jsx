import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../services/bookService";
import { getAllCategories } from "../../services/categoryService";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";

const AddBook = () => {

    const navigate = useNavigate();
    const { userId: librarianId } = useAuth();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        description: "",
        publisher: "",
        publishYear: "",
        totalPages: "",
        categoryId: "",
        totalCopies: "",
        coverImageUrl: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllCategories()
            .then(r => setCategories(r.data))
            .catch(() => toast.error("Failed to load categories"));
    }, []);

    const validate = () => {
        const e = {};
        if (!formData.title.trim()) e.title = "Required";
        if (!formData.author.trim()) e.author = "Required";
        if (!formData.publishYear) e.publishYear = "Required";
        if (!formData.categoryId) e.categoryId = "Required";
        if (!formData.totalCopies || formData.totalCopies < 1)
            e.totalCopies = "At least 1 copy required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const payload = {
                ...formData,
                publishYear: parseInt(formData.publishYear),
                totalCopies: parseInt(formData.totalCopies),
                totalPages: formData.totalPages
                    ? parseInt(formData.totalPages) : null,
                categoryId: parseInt(formData.categoryId),
                isbn: formData.isbn || null,
                coverImageUrl: formData.coverImageUrl || null
            };
            await addBook(payload, librarianId);
            toast.success("Book added successfully!");
            navigate(ROUTES.LIBRARIAN.MANAGE_BOOKS);
        } catch (error) {
            toast.error(error.message || "Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) => `
        w-full px-4 py-3 rounded-xl bg-white/5 border
        ${errors[field]
            ? "border-red-500/60"
            : "border-white/10 focus:border-emerald-400/60"
        }
        text-[#e8e0d0] placeholder-gray-500 focus:outline-none
        transition-all duration-200 text-sm font-serif
    `;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 225 }, (_, i) => currentYear - i);

    return (
        <div className="font-serif text-[#e8e0d0] max-w-2xl">

            {/* ── HEADER ───────────────────────── */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(ROUTES.LIBRARIAN.MANAGE_BOOKS)}
                    className="text-gray-400 hover:text-yellow-400
                        transition-colors cursor-pointer bg-transparent
                        border-none text-sm"
                >
                    ← Back
                </button>
                <div>
                    <h1 className="text-2xl font-bold">➕ Add New Book</h1>
                </div>
            </div>

            <div className="bg-white/3 border border-white/7
                rounded-2xl p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title + Author */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Book title"
                                value={formData.title}
                                onChange={handleChange}
                                className={inputClass("title")}
                            />
                            {errors.title && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Author <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Author name"
                                value={formData.author}
                                onChange={handleChange}
                                className={inputClass("author")}
                            />
                            {errors.author && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.author}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ISBN + Publisher */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                ISBN
                            </label>
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN-10 or ISBN-13"
                                value={formData.isbn}
                                onChange={handleChange}
                                className={inputClass("isbn")}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Publisher
                            </label>
                            <input
                                type="text"
                                name="publisher"
                                placeholder="Publisher name"
                                value={formData.publisher}
                                onChange={handleChange}
                                className={inputClass("publisher")}
                            />
                        </div>
                    </div>

                    {/* Category + Publish Year + Pages */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Category <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className={`${inputClass("categoryId")} cursor-pointer`}
                                style={{ background: "#0d1424" }}
                            >
                                <option value="">Select</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.categoryId}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Publish Year <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="publishYear"
                                value={formData.publishYear}
                                onChange={handleChange}
                                className={`${inputClass("publishYear")} cursor-pointer`}
                                style={{ background: "#0d1424" }}
                            >
                                <option value="">Select</option>
                                {years.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            {errors.publishYear && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.publishYear}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Total Pages
                            </label>
                            <input
                                type="number"
                                name="totalPages"
                                placeholder="e.g. 350"
                                value={formData.totalPages}
                                onChange={handleChange}
                                className={inputClass("totalPages")}
                            />
                        </div>
                    </div>

                    {/* Total Copies + Cover URL */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Total Copies <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                name="totalCopies"
                                placeholder="e.g. 5"
                                min="1"
                                value={formData.totalCopies}
                                onChange={handleChange}
                                className={inputClass("totalCopies")}
                            />
                            {errors.totalCopies && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.totalCopies}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                name="coverImageUrl"
                                placeholder="https://..."
                                value={formData.coverImageUrl}
                                onChange={handleChange}
                                className={inputClass("coverImageUrl")}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs text-gray-400
                            mb-2 uppercase tracking-wider"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Brief description of the book..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`${inputClass("description")} resize-none`}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(ROUTES.LIBRARIAN.MANAGE_BOOKS)}
                            className="flex-1 py-3 rounded-xl border
                                border-white/10 text-gray-400 text-sm
                                font-serif cursor-pointer bg-transparent
                                hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                flex-1 py-3 rounded-xl font-bold
                                text-sm font-serif border-none
                                transition-colors
                                ${loading
                                    ? "bg-emerald-500/50 cursor-not-allowed text-white/50"
                                    : "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-400"
                                }
                            `}
                        >
                            {loading ? "Adding..." : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;