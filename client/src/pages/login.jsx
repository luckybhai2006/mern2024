import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Login = () => {
   const [user, setUser] = useState({
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   const handelInput = (e) => {
      const { name, value } = e.target;
      setUser({
         ...user,
         [name]: value,
      });
   };

   const handelLogin = async (e) => {
      e.preventDefault();
      NProgress.start(); // Start the loading bar

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(user),
         });
         const data = await response.json();

         if (response.ok) {
            toast.success('Login successful');
            localStorage.setItem("token", data.token);
            setUser({ email: "", password: "" });
            navigate("/contact");
         } else {
            toast.error(data.message ? data.message : data.msg);
         }
      } catch (error) {
         console.error("Login error", error);
         toast.error("An error occurred. Please try again.");
      } finally {
         NProgress.done(); // Stop the loading bar
      }
   };

   return (
      <section>
         <main>
            <div className="section-registration">
               <div className="container grid grid-two-cols">
                  <div className="registration-image">
                     <img src="/images/login.png" alt="trying to fill registration" width="400" height="500" />
                  </div>

                  <div className="registration-form">
                     <h1 className="main-heading">Login Form</h1>
                     <form onSubmit={handelLogin}>
                        <div>
                           <label htmlFor="email">Email</label>
                           <input
                              type="email"
                              name="email"
                              placeholder=" Enter Your Email"
                              id="email"
                              required
                              autoComplete="off"
                              value={user.email}
                              onChange={handelInput}
                           />
                        </div>
                        
                        <div>
                           <label htmlFor="password">Password</label>
                           <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              id="password"
                              required
                              autoComplete="off"
                              value={user.password}
                              onChange={handelInput}
                           />
                        </div>
                        <br />

                        <button type="submit" className="btn-submit">Login</button>
                     </form>
                  </div>
               </div>
            </div>
         </main>
      </section>
   );
};

export default Login;
