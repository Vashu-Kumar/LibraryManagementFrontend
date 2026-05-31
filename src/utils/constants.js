export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    || "http://localhost:8080";


// ROLES
export const ROLES = {
    ADMIN: "ADMIN",
    LIBRARIAN: "LIBRARIAN",
    STUDENT: "STUDENT"
    
};


// API ENDPOINTS
export const ENDPOINTS = {

    // Auth
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        CHANGE_PASSWORD: "/api/auth/change-password",
        RESET_PASSWORD: "/api/auth/reset-password"
    },

    // Users
    USERS: {
        BASE: "/api/users",
        STUDENTS: "/api/users/students",
        LIBRARIANS: "/api/users/librarians",
        SEARCH: "/api/users/search",
        BLOCKED: "/api/users/blocked",
        LIBRARIAN: "/api/users/librarian",
        PROFILE: "/api/users/profile",
        TOGGLE_STATUS: "/api/users/toggle-status",
        MEMBERSHIP: "/api/users/membership"
    },

    // Books
    BOOKS: {
        BASE: "/api/books",
        SEARCH: "/api/books/search",
        FILTER: "/api/books/filter",
        TOP_BORROWED: "/api/books/top-borrowed",
        ADD_COPIES:   "/api/books",               // + /{id}/add-copies
        MARK_DAMAGED: "/api/books"                // + /{id}/mark-damaged
    },

    // Categories
    CATEGORIES: {
        BASE: "/api/categories"
    },

    // Loans
    LOANS: {
        BASE: "/api/loans",
        ISSUE: "/api/loans/issue",
        RETURN: "/api/loans/return",         // + /{id}
        RENEW:  "/api/loans/renew",          // + /{id}
        OVERDUE: "/api/loans/overdue",
        RECENT: "/api/loans/recent",
        STUDENT: "/api/loans/student",        // + /{id}
        LOST: "/api/loans/lost"            // + /{id}
    },

    // Reservations
    RESERVATIONS: {
        BASE: "/api/reservations",
        CANCEL: "/api/reservations/cancel",  // + /{id}
        ACTIVE: "/api/reservations/active",  // + /{id}
        PENDING: "/api/reservations/pending",
        STUDENT: "/api/reservations/student", // + /{id}
        BOOK: "/api/reservations/book"     // + /{id}
    },

    // Fines
    FINES: {
        BASE: "/api/fines",
        PAY: "/api/fines/pay",
        PENDING: "/api/fines/pending",
        STUDENT: "/api/fines/student",        // + /{id}
        LOAN:    "/api/fines/loan"            // + /{id}
    },

    // Dashboard
    DASHBOARD: {
        ADMIN: "/api/dashboard/admin",
        LIBRARIAN: "/api/dashboard/librarian",
        STUDENT: "/api/dashboard/student"     // + /{id}
    }
};

// ROUTES — frontend paths
export const ROUTES = {

    // Public
    LOGIN: "/login",
    REGISTER: "/register",

    // Student
    STUDENT: {
        DASHBOARD: "/student/dashboard",
        CATALOG: "/student/catalog",
        BOOK_DETAIL: "/student/books/:id",
        MY_BOOKS: "/student/my-books",
        RESERVATIONS: "/student/reservations",
        FINES:  "/student/fines",
        PROFILE: "/student/profile"
    },

    // Librarian
    LIBRARIAN: {
        DASHBOARD:   "/librarian/dashboard",
        ISSUE_BOOK:  "/librarian/issue",
        RETURN_BOOK: "/librarian/return",
        MANAGE_BOOKS: "/librarian/books",
        ADD_BOOK:   "/librarian/books/add",
        EDIT_BOOK:  "/librarian/books/edit/:id",
        MEMBERS:  "/librarian/members",
        OVERDUE:  "/librarian/overdue",
        FINES:   "/librarian/fines",
        RESERVATIONS:  "/librarian/reservations"
    },

    // Admin
    ADMIN: {
        DASHBOARD:   "/admin/dashboard",
        USERS:       "/admin/users",
        LIBRARIANS:  "/admin/librarians",
        CATEGORIES:  "/admin/categories",
        REPORTS:     "/admin/reports"
    }
};

// MEMBERSHIP TYPES
export const MEMBERSHIP_TYPES = [
    { value: "UNDERGRADUATE", label: "Undergraduate" },
    { value: "POSTGRADUATE",  label: "Postgraduate"  },
    { value: "STAFF", label: "Staff"         },
    { value: "GUEST", label: "Guest"         }
];


// DEPARTMENTS
export const DEPARTMENTS = [
    { value: "COMPUTER_SCIENCE",          label: "Computer Science"          },
    { value: "INFORMATION_TECHNOLOGY",    label: "Information Technology"    },
    { value: "MECHANICAL_ENGINEERING",    label: "Mechanical Engineering"    },
    { value: "CIVIL_ENGINEERING",         label: "Civil Engineering"         },
    { value: "ELECTRICAL_ENGINEERING",    label: "Electrical Engineering"    },
    { value: "ELECTRONICS_COMMUNICATION", label: "Electronics & Communication"},
    { value: "CHEMICAL_ENGINEERING",      label: "Chemical Engineering"      },
    { value: "BIOTECHNOLOGY",             label: "Biotechnology"             },
    { value: "MATHEMATICS",               label: "Mathematics"               },
    { value: "PHYSICS",                   label: "Physics"                   },
    { value: "COMMERCE",                  label: "Commerce"                  },
    { value: "LAW",                       label: "Law"                       },
    { value: "GENERAL",                   label: "General"                   }
];

// PAYMENT METHODS
export const PAYMENT_METHODS = [
    { value: "CASH", label: "Cash" },  // For now only cash is supported
];

// LOAN STATUS COLORS — for badges
export const LOAN_STATUS_COLORS = {
    ACTIVE: "green",
    RETURNED: "blue",
    OVERDUE: "red",
    LOST: "gray"
};

// FINE STATUS COLORS
export const FINE_STATUS_COLORS = {
    PENDING: "red",
    PAID: "green"
};

// RESERVATION STATUS COLORS
export const RESERVATION_STATUS_COLORS = {
    PENDING: "yellow",
    ACTIVE: "green",
    CANCELLED: "red"
};