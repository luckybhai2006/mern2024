import { Routes, Route, HashRouter, useLocation } from "react-router-dom";
import NProgress from "nprogress"; // Import NProgress
import 'nprogress/nprogress.css'; // Import NProgress CSS
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Services from "./pages/services";
import Register from "./pages/register";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/error";
import AdminLayout from "./components/layouts/admin-layout";
import AdminUsers from "./pages/Admin-Users";
import AdminUpdate from "./pages/Admin-Update";
import AdminContacts from "./pages/Admin-Contacts";
import './App.css';
import AdminServices from "./pages/Admin-Services";
import AccessService from "./pages/serv-detail";
import { useEffect } from "react";

// Configure NProgress
NProgress.configure({
  showSpinner: false, // Set to true to show a spinner
  speed: 500, // The speed of the loading bar
  trickleSpeed: 200, // Speed of the trickle effect
});

const App = () => {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Start NProgress when the route changes
    NProgress.start();

    // Finish NProgress after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Adjust this timeout as needed

    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/serv-detail" element={<AccessService />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminUsers />} /> {/* Default page for /admin */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="service" element={<AdminServices />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

// Wrap your App component with HashRouter
const WrappedApp = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default WrappedApp;
