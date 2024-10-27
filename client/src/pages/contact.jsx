import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const defaultContactForm = {
  username: '',
  email: '',
  message: ''
};


const Contact = () => {
  const token = localStorage.getItem('token');

  const [contact, setContact] = useState(defaultContactForm);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // we use IP adress insted of local storage 
        const response = await fetch("https://mern2024-2095.onrender.com/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("user_data", data.userData);
          setUser(data.userData)
        } else {
          console.log('Failed to fetch user data');
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: ""
    })
    setUserData(false)
  }






  const navigate = useNavigate();
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);

    try {
      const response = await fetch(`https://mern2024-2095.onrender.com/api/auth/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });

      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setContact(defaultContactForm);
          // console.log(data);
          toast.success('Message sent successfully');
          navigate("/");
        } else {
          toast.error("Server Response:", data);
          toast.error(data.message || "Invalid Credentials");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.log("Message not sent due to error:", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img src="/images/design.png" alt="Contact Us" width="400" height="500" />
            </div>

            {/* CONTACT FORM */}
            <div className="registration-form">
              <h1 className="main-heading">Contact Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    id="username"
                    required
                    autoComplete="off"
                    value={contact.username} // Automatically filled from state
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    id="email"
                    required
                    autoComplete="off"
                    value={contact.email} // Automatically filled from state
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={contact.message} // Handled by state
                    onChange={handleChange}
                    required
                    rows="5"
                  />
                </div>
                <br />
                <button type="submit" className="btn-submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Contact;
