import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

// Pages
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import Shop from './pages/Shop.jsx';
import BookPage from './pages/Book/BookPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MyReservation from './pages/MyReservation/MyReservation.jsx';
import MyLoans from './pages/MyLoans/MyLoans.jsx';
import UserLayout from './pages/UserLayout/UserLayout.jsx';

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

        {/* FOOTER */}
        <Footer />

      </main>
    
  );
}

export default App;