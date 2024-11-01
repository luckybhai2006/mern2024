import { useState } from "react";
import '../styles/register.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Register = () => {
   const [user, setUser] = useState({
      username: "",
      email: "",
      phone: "",
      password: "",
      profileImage: null,
   });

   const navigate = useNavigate();

   const handelInput = (e) => {
      const name = e.target.name;
      const value = name === 'profileImage' ? e.target.files[0] : e.target.value;
      setUser({
         ...user,
         [name]: value,
      });
   };

   const handleImageUpload = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onloadend = () => resolve(reader.result);
         reader.onerror = reject;
         reader.readAsDataURL(file);
      });
   };

   const handelRegister = async (e) => {
      e.preventDefault();
      
      NProgress.start(); // Start loading bar
      
      // Convert image to Base64
      const imageBase64 = user.profileImage ? await handleImageUpload(user.profileImage) : null;

      const registrationData = {
         username: user.username,
         email: user.email,
         phone: user.phone,
         password: user.password,
         profileImage: imageBase64,
      };

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
         });

         const data = await response.json();
         if (response.ok) {
            toast.success("Registration Successful");
            setUser({ username: "", email: "", phone: "", password: "", profileImage: null });
            navigate("/login");
         } else {
            toast.error(data.extraDetails ? data.extraDetails : data.msg);
         }
      } catch (error) {
         console.log("Register error:", error);
      } finally {
         NProgress.done(); // Stop loading bar
      }
   };

   return (
      <>
         <section>
            <main>
               <div className="section-registration">
                  <div className="container grid grid-two-cols">
                     <div className="registration-image">
                        <img src="/images/register.png" alt="Trying to fill registration" width="400" height="500" />
                     </div>
                     <div className="registration-form">
                        <h1 className="main-heading">Registration Form</h1>
                        <form onSubmit={handelRegister}>
                           <div>
                              <label htmlFor="username">Username</label>
                              <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off" value={user.username} onChange={handelInput} />
                           </div>
                           <div>
                              <label htmlFor="email">Email</label>
                              <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off" value={user.email} onChange={handelInput} />
                           </div>
                           <div>
                              <label htmlFor="phone">Phone</label>
                              <input type="tel" name="phone" placeholder="Enter Your Phone no." id="Phone" required autoComplete="off" value={user.phone} onChange={handelInput} />
                           </div>
                           <div>
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" placeholder="Password" id="password" required autoComplete="off" value={user.password} onChange={handelInput} />
                           </div>
                           <br />
                           <button type="submit" className="btn-submit">Register</button>
                        </form>
                     </div>
                  </div>
               </div>
            </main>
         </section>
      </>
   );
};

export default Register;
