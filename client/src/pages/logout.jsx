import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {

   const [token, setToken] = useState(localStorage.getItem('token'))
   
   useEffect(() => {
      //tackling logout functionality
      const LogoutUser = () => {
         setToken('');
         return localStorage.removeItem('token')
      }
      LogoutUser()
   },[token]);
   return <Navigate to="/login" />;
};
export default Logout;