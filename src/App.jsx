import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { lazy, Suspense } from 'react';

// Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


// Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const BookPage = lazy(() => import('./pages/Book/BookPage.jsx'));
const MyReservation = lazy(() => import('./pages/MyReservation/MyReservation.jsx'));
const MyLoans = lazy(() => import('./pages/MyLoans/MyLoans.jsx'));
const UserLayout = lazy(() => import('./pages/UserLayout/UserLayout.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (

    <main>
      {/* HEADER */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
        <Suspense fallback={<div>Loading...</div>}>

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/shop"
              element={<Shop searchQuery={searchQuery} />}
            />

            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />

            {/*  Protected Routes */}
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-reservations"
              element={
                <ProtectedRoute>
                  <MyReservation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-loans"
              element={
                <ProtectedRoute>
                  <MyLoans />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        {/* FOOTER */}
        <Footer />

    </main>

  );
}

export default App;