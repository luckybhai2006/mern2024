import { useState } from "react";
import '../styles/register.css';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Register = () => {
   const [user, setUser] = useState({
      username: "",
      email: "",
      phone: "",
      password: "",
   })

   // after filling register form it will redirect to login form---->
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

   const handelRegister = async (e) => {
      e.preventDefault();
      console.log(user);
    
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
    
        const data = await response.json(); // Parse the JSON from the response
    
      //   console.log(data);
    
        if (response.ok) {
         toast.success("Regestriation Succesfull")
          setUser({ username: "", email: "", phone: "", password: "" });
          // navigate to login page
          navigate("/login");
        } else {
          toast(data.extraDetails ? data.extraDetails : data.msg);
        }
      } catch (error) {
        console.log("register error:", error);
      }
    };
   return (
      <>
         <section>
            <main>
               <div className="section-registration">
                  <div className="container grid grid-two-cols">
                     <div className="registration-image">
                        <img src="/images/register.png" alt="trying to fill registration" width="400" height="500" />
                     </div>

                     {/* REGISTRATION FORM */}
                     <div className="registration-form">
                        <h1 className="main-heading">Registration Form</h1>
                        <form onSubmit={handelRegister}>
                           <div>
                              <label htmlFor="username">Username</label>
                              <input
                                 type="text"
                                 name="username"
                                 placeholder="Username"
                                 id="username"
                                 required
                                 autoComplete="off"
                                 value={user.username}
                                 onChange={handelInput}
                              />
                           </div>
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
                              <label htmlFor="phone">Phone</label>
                              <input
                                 type="phone"
                                 name="phone"
                                 placeholder=" Enter Your Phone no."
                                 id="Phone"
                                 required
                                 autoComplete="off"
                                 value={user.phone}
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
                           <button type="submit" className="btn-submit">Register</button>

                        </form>
                     </div>
                  </div>
               </div>
            </main>
         </section>
         {/* <Footer/> */}
      </>
   );
};
export default Register;
