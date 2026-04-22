// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'
// import Dashboard from './pages/Dashboard/Dashboard'
// import UserLayout from './pages/UserLayout/UserLayout'
// import Navbar from './pages/UserLayout/Navbar'
// import UserSidebar from './pages/UserLayout/UserSidebar';
// import BookPage from './pages/Book/BookPage'
// import MyLoans from './pages/MyLoans/MyLoans'
// import MyReservation from "./pages/My Reservarion/MyReservation";

// import Home from "./pages/Home/Home";

// function App() {
//   return (
//     <>
//       <Routes>



// <Home />

//         <Route element={<UserLayout />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/books" element={<BookPage />} />
//           <Route path="/my-loans" element={<MyLoans />} />
//           <Route path="/my-reservations" element={<MyReservation />} />
//           <Route path="/my-fines" element={<Dashboard />} />
//           <Route path="/subscriptions" element={<Dashboard />} />
//           <Route path="/wishlist" element={<Dashboard />} />
//         </Route>
//       </Routes>

//     </>
//   )
// }

// export default App






import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



// Pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact'
import About from './pages/About'


function App() {
  return (
    <main>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CentralLibrary/blog" element={<Blog />} />
        <Route path="/CentralLibrary/contact" element={<Contact />} />
        <Route path="/CentralLibrary/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />


    </main>
  );
}

export default App;

