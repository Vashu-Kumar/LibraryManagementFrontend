import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; 

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import BookPage from './pages/Book/BookPage';
import Dashboard from './pages/Dashboard/Dashboard';
import MyReservation from './pages/MyReservation/MyReservation';
import MyLoans from './pages/MyLoans/MyLoans';
import UserLayout from './pages/UserLayout/UserLayout';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
   
      <main>

        {/* HEADER */}
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route 
            path="/shop" 
            element={<Shop searchQuery={searchQuery} />} 
          />

          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 Protected Routes */}
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

        {/* FOOTER */}
        <Footer />

      </main>
    
  );
}

export default App;