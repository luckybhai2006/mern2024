import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

// import './regi.css';
const Login = () => {
   const [user, setUser] = useState({
      email: "",
      password: "",
   })
   // // after filling login form it will redirect to login form---->
   const navigate = useNavigate();
   // handeling the input
   const handelInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
         ...user,
         [name]: value,
      });
   };
   // handel submit

   const handelLogin = async (e) => {
      e.preventDefault();
      console.log(user)

      try {
         const response = await fetch(`https://mern2024-2095.onrender.com/api/auth/login`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(user) 
         });
         console.log("Login form",response)
         const data = await response.json();

         // console.log(data)
         if (response.ok) {
            toast.success('Login successful');
            // store Token
            localStorage.setItem("token",data.token);
            setUser({ email: "", password: "", });

            // navigate tologin page-->
            navigate("/contact")
         }else{
            toast.error(data.message?data.message:data.msg)
         }

      } catch (error) {
         console.log("register", error)
      }
   }
   return (
         <section>
            <main>
               <div className="section-registration">
                  <div className="container grid grid-two-cols">
                     <div className="registration-image">
                        <img src="/images/login.png" alt="trying to fill registration" width="400" height="500" />
                     </div>

                     {/* REGISTRATION FORM */}
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


