import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Services from "./pages/services"
import Register from "./pages/register"
import Login from "./pages/login"
import Logout from "./pages/logout"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ErrorPage from "./pages/error"
import AdminLayout from "./components/layouts/admin-layout"
import AdminUsers from "./pages/Admin-Users"
import AdminUpdate from "./pages/Admin-Update"
import AdminContacts from "./pages/Admin-Contacts"
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="*" element={<ErrorPage/>} />
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="users/:id/edit" element={<AdminUpdate/>}/>
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
};

export default App;
