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







// 
//         
//         <Route path="/CentralLibrary/shop" element={<Shop />} />
//         <Route path="/CentralLibrary/shop/:id" element={<ProductDetails />} />
//         <Route path="/CentralLibrary/blog" element={<Blog />} />
//         <Route path="/CentralLibrary/contact" element={<Contact />} />

//         {/* <Route path="/CentralLibrary/about" element={<About />} /> */}
//         <Route path="*" element={<Home />} />
//       </Routes>

//       <Footer />




//       import Footer from './components/Footer';
//
// import Blog from './pages/Blog';
// import Contact from './pages/Contact'
// // import About from './pages/About'
// import Shop from './pages/Shop';
// import ProductDetails from './pages/ProductDetails'



import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';


// Pages
import Header from './components/Header';



function App() {
  return (
    <main>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>


    </main>
  );
}

export default App;

