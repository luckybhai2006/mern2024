import { NavLink, Navigate, Outlet} from "react-router-dom";
import { FaUserCircle, FaServer, FaHome } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { useState,useEffect } from "react";
const AdminLayout = () => {


   const [user, setUser] = useState(null); // State to store admin data
   const [isLoading, setIsLoading] = useState(true); // State to track loading status

   useEffect(() => {
      const token = localStorage.getItem('token');

      const checkAdminStatus = async () => {
         try {
            setIsLoading(true); // Start loading
            const response = await fetch('http://192.168.1.41:5000/api/auth/user', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            });

            if(response.ok) {
               const data = await response.json();
               setUser(data.userData); // Update the user state with the fech-data
               setIsLoading(false)
            } else {
               console.error('Failed to fetch user data:', response.statusText);
               setIsLoading(false)
            }
         } catch (error) {
            console.error('Error checking admin status:', error);
         } finally {
            setIsLoading(false); // Stop loading
         }
      };

      checkAdminStatus(); // Fetch user data on component mount
   }, []); // Empty dependency array ensures it only runs once on mount

   if(isLoading){
      return <h1>Loading......</h1>
   }


   if(!user.isAdmin){
      return <Navigate to="/" />
   }
   


   return <>
      <header>
         <div className="container" style={{ color: "blue" }}>
            <nav>
               <ul style={{ display: "flex",  padding: "6px" }}>
                  <li  style={{ marginRight: "40px" }}>
                     <NavLink to='/admin/users'><FaUserCircle /> Users</NavLink>
                  </li>
                  <li  style={{ marginRight: "40px" }}>
                     <NavLink to='/admin/contacts'><RiContactsFill /> Contacts</NavLink>
                  </li>
                  <li  style={{ marginRight: "40px" }}>
                     <NavLink to='/services'><FaServer /> Services</NavLink>
                  </li>
                  <li  style={{ marginRight: "40px" }}>
                     <NavLink to='/'><FaHome /> Home</NavLink>
                  </li>
               </ul>
            </nav>
         </div>
      </header>
      {/* outlet is use in nested component to redirect to pages */}
      <Outlet />
   </>
};
export default AdminLayout;