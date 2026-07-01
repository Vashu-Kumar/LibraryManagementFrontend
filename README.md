**** Important Note ****
The backend is running on a free-tier server, so login may be slow or fail on the first attempt. If that happens, please wait a few seconds and try again.
****



# Central Library — Library Management System (Frontend)

A React-based frontend for a full-featured Library Management System, supporting three roles — **Student**, **Librarian**, and **Admin** — each with a dedicated dashboard and workflow. Built with Vite, React Router, Tailwind CSS, and Axios, it consumes a REST API for authentication, book catalog management, loans, reservations, and fines.

🔗 **Live demo:** https://library-management-frontend-kappa-lyart.vercel.app

## Features

### 🎓 Student
- Browse and search the book catalog, view book details
- View borrowed books ("My Books") and reservation history
- Track and view fines
- Manage profile

### 📚 Librarian
- Issue and return books
- Add, edit, and manage the book catalog
- Manage members and reservations
- Track overdue loans and manage fines

### 🛠️ Admin
- Manage users and librarians
- Manage book categories
- View system-wide reports and analytics

### 🔐 Shared
- Role-based authentication with protected routes
- JWT-based session handling with automatic logout on token expiry
- Toast notifications for user feedback
- Responsive UI with charts for dashboard analytics

## Tech Stack

| Category         | Technology |
|-------------------|------------|
| Framework          | [React 18](https://react.dev/) |
| Build tool         | [Vite](https://vitejs.dev/) |
| Routing            | [React Router v6](https://reactrouter.com/) |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com/) |
| HTTP client        | [Axios](https://axios-http.com/) |
| Forms              | [React Hook Form](https://react-hook-form.com/) |
| Notifications      | [React Hot Toast](https://react-hot-toast.com/) |
| Charts             | [Recharts](https://recharts.org/) |
| Icons              | [Lucide React](https://lucide.dev/) |
| Linting            | ESLint |
| Deployment         | Vercel |

## Project Structure

```
src/
├── context/            # Global auth context
│   └── AuthContext.jsx
├── layouts/            # Role-based layout shells
│   ├── AdminLayout.jsx
│   ├── AuthLayout.jsx
│   ├── LibrarianLayout.jsx
│   └── StudentLayout.jsx
├── pages/
│   ├── admin/          # Admin dashboard, users, librarians, categories, reports
│   ├── auth/            # Login, Register
│   ├── librarian/       # Dashboard, issue/return, manage books, members, fines, reservations, overdue
│   └── student/         # Dashboard, catalog, book detail, my books, reservations, fines, profile
├── routes/
│   ├── AppRoutes.jsx    # Central route definitions (with role-based access)
│   └── PrivateRoute.jsx # Route guard component
├── services/            # Axios service modules per domain (auth, books, users, loans, ...)
├── utils/
│   ├── constants.js     # API endpoints, frontend routes, roles, dropdown options
│   └── tokenUtils.js    # Token storage/retrieval helpers
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- A running instance of the corresponding Library Management backend API

### Installation

```bash
git clone https://github.com/Vashu-Kumar/LibraryManagementFrontend.git
cd LibraryManagementFrontend
npm install
```

### Environment Variables

Create a `.env` file in the project root with the backend API URL:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

## Available Scripts

| Script            | Description |
|--------------------|-------------|
| `npm run dev`      | Start the Vite development server |
| `npm run build`    | Build the app for production |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint across the project |

## Roles & Access

Routes are protected based on user role via `PrivateRoute`:

| Role        | Access |
|-------------|--------|
| `STUDENT`   | Student dashboard, catalog, my books, reservations, fines, profile |
| `LIBRARIAN` | Librarian dashboard + all Student-facing operational tools (issue/return, manage books, members, overdue, fines, reservations) |
| `ADMIN`     | Admin dashboard, user & librarian management, categories, reports (plus Librarian routes) |

Unauthenticated users are redirected to `/login`; unknown routes fall back to `/login`.

## Deployment

The project includes a `vercel.json` and is configured for deployment on [Vercel](https://vercel.com/). Push to your connected branch, or deploy manually with the Vercel CLI:

```bash
vercel --prod
```

Remember to set the `VITE_API_BASE_URL` environment variable in your Vercel project settings.

## Contributing

Contributions are welcome! Please open an issue to discuss significant changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## License

No license has been specified for this project yet.
