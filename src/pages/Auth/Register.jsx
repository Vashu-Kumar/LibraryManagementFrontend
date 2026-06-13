import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/authService";
import { ROUTES, DEPARTMENTS, DEPARTMENT_COURSES } from "../../utils/constants";
import toast from "react-hot-toast";

const Register = () => {

    const navigate = useNavigate();
    const { setAuthData } = useAuth();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        course: "",
        admissionYear: ""
    });
    const [errors, setErrors] = useState({});

   
    // GET COURSES FOR SELECTED DEPARTMENT
    const getCoursesForDepartment = (department) => {
        if (!department) return [];
        return DEPARTMENT_COURSES[department] || [];
    };

    // HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset course when department changes
        if (name === "department") {
            setFormData(prev => ({
                ...prev,
                department: value,
                course:     ""
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };


    // VALIDATION
    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim() || null,
                email: formData.email.trim() || null,
                password: formData.password,
                department: formData.department || null,
                course: formData.course || null,
                admissionYear: formData.admissionYear
                    ? parseInt(formData.admissionYear)
                    : null
            };

            const response = await register(payload);
            setAuthData(response.data);
            toast.success(`Welcome, ${response.data.fullName}! Account created.`);
            navigate(ROUTES.STUDENT.DASHBOARD);

        } catch (error) {
            toast.error(error.message || "Registration failed. Try again");
        } finally {
            setLoading(false);
        }
    };

    // INPUT
    const inputClass = (field) => `
        w-full px-4 py-3 rounded-xl
        bg-white/5 border
        ${errors[field]
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-yellow-400/60"
        }
        text-[#e8e0d0] placeholder-gray-500
        focus:outline-none transition-all
        duration-200 text-sm font-serif
        focus:bg-white/8
    `;

    // ADMISSION YEARS — last 6 years
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - i
    );

    return (
        <div className="min-h-screen flex items-center justify-center
            px-4 py-10 font-serif"
        >
            <div className="w-full max-w-lg">

                {/* ── LOGO ─────────────────────────── */}
                <div className="text-center mb-8">
                    <div className="text-4xl mb-3">📚</div>
                    <h1 className="text-2xl font-bold text-yellow-400
                        tracking-widest"
                    >
                        Central Library
                    </h1>
                    <p className="text-gray-500 text-xs tracking-widest
                        uppercase mt-1"
                    >
                        Create Your Account
                    </p>
                </div>

                {/* ── FORM CARD ────────────────────── */}
                <div className="bg-white/3 border border-white/7
                    rounded-2xl p-8"
                >
                    <h2 className="text-xl font-bold mb-1 text-[#e8e0d0]">
                        Student Registration
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">
                        Fields marked <span className="text-red-400">*</span> are required.
                        College info is optional.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* ── NAME ROW ─────────────────── */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* First Name */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    First Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Arjun"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputClass("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Mehta"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputClass("lastName")}
                                />
                            </div>
                        </div>

                        {/* ── EMAIL ────────────────────── */}
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Email
                                <span className="text-gray-600 ml-2
                                    normal-case tracking-normal"
                                >
                                    (optional — any email works with valid format)
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="sompal12@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClass("email")}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* ── PASSWORD ROW ─────────────── */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* Password */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Min 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={inputClass("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Confirm <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repeat password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={inputClass("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ── DIVIDER ──────────────────── */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-gray-600
                                uppercase tracking-wider whitespace-nowrap"
                            >
                                College Info — Optional
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* ── DEPARTMENT ───────────────── */}
                        <div>
                            <label className="block text-xs text-gray-400
                                mb-2 uppercase tracking-wider"
                            >
                                Department
                            </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className={`
                                    ${inputClass("department")}
                                    cursor-pointer
                                `}
                                style={{ background: "#0d1424" }}
                            >
                                <option value="">Select Department</option>
                                {DEPARTMENTS.map(dept => (
                                    <option
                                        key={dept.value}
                                        value={dept.value}
                                    >
                                        {dept.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ── COURSE + YEAR ROW ─────────── */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* Course — depends on department */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Course
                                </label>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    disabled={!formData.department}
                                    className={`
                                        ${inputClass("course")}
                                        cursor-pointer
                                        ${!formData.department
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                        }
                                    `}
                                    style={{ background: "#0d1424" }}
                                >
                                    <option value="">
                                        {formData.department
                                            ? "Select Course"
                                            : "Select Dept First"
                                        }
                                    </option>
                                    {getCoursesForDepartment(formData.department)
                                        .map(c => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Admission Year */}
                            <div>
                                <label className="block text-xs text-gray-400
                                    mb-2 uppercase tracking-wider"
                                >
                                    Admission Year
                                </label>
                                <select
                                    name="admissionYear"
                                    value={formData.admissionYear}
                                    onChange={handleChange}
                                    className={`
                                        ${inputClass("admissionYear")}
                                        cursor-pointer
                                    `}
                                    style={{ background: "#0d1424" }}
                                >
                                    <option value="">Select Year</option>
                                    {years.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* ── SUBMIT ───────────────────── */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-3 rounded-xl font-bold
                                text-sm transition-all duration-200
                                border-none font-serif mt-2
                                ${loading
                                    ? "bg-yellow-400/50 text-[#0a0f1e]/50 cursor-not-allowed"
                                    : "bg-yellow-400 text-[#0a0f1e] hover:bg-yellow-300 cursor-pointer"
                                }
                            `}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"
                            }
                        </button>
                    </form>

                    {/* ── LOGIN LINK ───────────────────── */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-yellow-400 hover:text-yellow-300
                                transition-colors"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>

                {/* ── BOTTOM NOTE ──────────────────────── */}
                <p className="text-center text-xs text-gray-600 mt-4 px-4">
                    Your Student ID and Roll Number will be
                    auto-generated after registration
                </p>
            </div>
        </div>
    );
};

export default Register;