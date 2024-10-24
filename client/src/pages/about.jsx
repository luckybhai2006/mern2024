import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import "../styles/home.css";
const styles = {
  head: {
    fontSize: '2rem',
    // backgroundColor: '#282c34',
    // color: '#ffffff',
    padding: '1rem 0',
    // textAlign: 'center',
    // marginTop: '3.8rem',
    width: 'auto',
    border: '2px solid red',
    borderRadius:'20px', 
    color:'white',
    textAlign:'center', 
    marginTop:"80px"
  },
  container: {
    backgroundColor: "black",
    color: "white",
    width: '95%',
    margin: '0 auto',
  },
  sectionAbout: {
    padding: '2rem 0',
  },
  aboutContent: {
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  subHeading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#61dafb',
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  list: {
    marginBottom: '1rem',
    paddingLeft: '1rem',
  },
};

const About = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null); // Initial state is null

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.1.41:5000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("user_data", data.userData);
          setUser(data.userData); // Set the user data
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
  },[token]); // Empty dependency array means this runs once

  return (
    <>
      {/* <p style={styles.head}>
        About Us
      </p> */}
      <h1 style={styles.head}>Welcome, {user ? `${user.username} to our Website` : `to our Website`}</h1> {/* Display the username here */}
      <div style={styles.container}>
        <section style={styles.sectionAbout}>
          <div style={styles.aboutContent}>
            <h1 style={styles.subHeading}><u>About Us</u></h1>
            <p style={styles.paragraph}>
              Welcome to IT Company, where technology meets innovation. Since our inception in [Year], we have been at the forefront of delivering cutting-edge IT solutions that drive business success. Our team of dedicated professionals is committed to providing top-notch services that exceed our clients' expectations.
            </p>

            <h2 style={styles.subHeading}><u>Our Mission</u></h2>
            <p style={styles.paragraph}>
              Our mission is to empower businesses through innovative technology solutions. We strive to deliver unparalleled service and support, helping our clients navigate the ever-evolving digital landscape.
            </p>

            <h2 style={styles.subHeading}><u>Our Values</u></h2>
            <ul style={styles.list}>
              <li><strong>Innovation:</strong> We embrace creativity and strive to lead in technological advancements.</li>
              <li><strong>Integrity:</strong> We conduct our business with the highest ethical standards.</li>
              <li><strong>Customer Focus:</strong> Our clients' success is our top priority.</li>
              <li><strong>Collaboration:</strong> We believe in the power of teamwork to achieve common goals.</li>
            </ul>

            <h2 style={styles.subHeading}><u>Our Team</u></h2>
            <p style={styles.paragraph}>
              At IT Company, our team is our greatest asset. We bring together experts from diverse backgrounds, all working together to deliver exceptional results. Our collaborative culture fosters innovation, ensuring that we stay ahead of industry trends.
            </p>

            <h2 style={styles.subHeading}><u>Our Services</u></h2>
            <p style={styles.paragraph}>
              We offer a wide range of IT services tailored to meet the unique needs of each client, including:
            </p>
            <ul style={styles.list}>
              <li>Custom Software Development</li>
              <li>IT Consulting</li>
              <li>Cloud Solutions</li>
              <li>Cybersecurity</li>
              <li>Managed IT Services</li>
            </ul>

            <h2 style={styles.subHeading}><u>Why Choose Us?</u></h2>
            <p style={styles.paragraph}>
              We are committed to excellence in every project we undertake. Our client-centric approach ensures that we deliver solutions that not only meet but exceed expectations. By choosing IT Company, you are partnering with a team that is dedicated to your success.
            </p>

            <h2 style={styles.subHeading}><u>Contact Us</u></h2>
            <p style={styles.paragraph}>
              Ready to take your business to the next level? <a href="/contact" style={{color:'skyblue'}}>Contact us</a> today to learn how we can help you achieve your goals through innovative IT solutions.
            </p>
          </div>
        </section>
       {/* FOOTER */}
      <div className="footer">
         <div className="container">
            <div className="footer-content">
               <div className="footer-section about">
                  <h2>About Us</h2>
                  <p>We are a leading IT company providing top-notch solutions to our clients worldwide.</p>
               </div>
               <div className="footer-section links">
                  <h2>Quick Links</h2>
                  <ul>
                     <li><a href="/services">Services</a></li>
                     <li><a href="/about">About</a></li>
                     <li><a href="/contact">Contact</a></li>
                     <li><a href="/register">Careers</a></li>
                  </ul>
               </div>
               <div className="footer-section contact">
                  <h2>Contact Us</h2>
                  <p>Email: info@itcompany.com</p>
                  <p>Phone: +91 989-973-3670</p>
                  <div className="socials">
                     <a href="#"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                     <a href="#"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                     <a href="#"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                     <a href="#"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>
    </>
  );
};

export default About;
