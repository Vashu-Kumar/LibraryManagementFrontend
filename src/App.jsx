import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Shop from './pages/Shop';

// Components
import Header from './components/Header';
import Footer from './Components/Footer';

function App() {

  //  GLOBAL SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  return (
      <main>

        {/* HEADER */}
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/shop" 
            element={<Shop searchQuery={searchQuery} />} 
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Home />} />
        </Routes>

        {/* FOOTER */}
        <Footer />

      </main>
  );
}

export default App;