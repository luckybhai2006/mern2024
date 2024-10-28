// import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "../styles/home.css";
const Home = () => {
   return <>

      {/* 1st SECTION */}
      
         <section className="section-hero">
            <div className="container grid grid-two-cols">
               <div className="hero-content">
                  <h1>𝕎𝔼 𝔸ℝ𝔼 𝕋ℍ𝔼 𝕎𝕆ℝ𝕃𝔻 𝔹𝔼𝕊𝕋 𝕀𝕋 ℂ𝕆𝕄ℙ𝔸ℕ𝕐.</h1>
                  <h3>Welcome to TECHNICAL BOYS.</h3>
                  <p>
                     are you redy to take your business to thanest level with cutting-edge IT solutions? Look no further! At thenical boys, we specalize in providing inovative IT services and solutions tailored to meet your unique needs.
                  </p>
                  <div className="btn btn-group">
                     <a href="#/contact"><button className="btn" style={{ background: "#61dafb", color: "black", fontWeight: "700" }}>Contact Now</button></a>
                     <a href="#/services"><button className="btn secondary-btn" style={{ background: "#61dafb", color: "black", fontWeight: "700" }}>Learn More</button></a>
                  </div>
               </div>
               {/* Hero Section */}
               <div className="hero-image">
                  <img src="/images/home.png" alt="coding to gether" width="400" height="500"></img>
               </div>
            </div>
         </section>
      
      {/* 2nd SECTION */}
      <section className="section-analytics">
         {/* <div className="container grid grid-four-cols"> */}
            <div className="div1">
               <h2>50+</h2>
               <p>Registered Companies</p>
            </div>
            <div className="div1">
               <h2>100,00+</h2>
               <p>Happy Clients</p>
            </div>
            <div className="div1">
               <h2>100,00+</h2>
               <p>Well Knowns Developer</p>
            </div>
            <div className="div1">
               <h2>24*7</h2>
               <p>Service</p>
            </div>
         {/* </div> */}
      </section>
      {/* 3rd Section */}
      <section className="section-hero">
         <div className="container grid grid-two-cols">
            {/* Hero Section */}
            <div className="hero-image">
               <img src="/images/design.png" alt="coding to gether" width="400" height="500"></img>
            </div>
            {/* ------------------------------------------- */}
            <div className="hero-content">
               <h1 style={{ color: "White" }}>𝕎𝔼 𝔸ℝ𝔼 𝕋ℍ𝔼 𝕎𝕆ℝ𝕃𝔻 𝔹𝔼𝕊𝕋 𝕀𝕋 ℂ𝕆𝕄ℙ𝔸ℕ𝕐.</h1>
               <h3>Our Key Services</h3>
         <ul>
            <li><strong>Custom Web Development:</strong> Create powerful websites tailored to your business needs.</li>
            <li><strong>Mobile App Solutions:</strong> Build cross-platform apps that engage users on the go.</li>
            <li><strong>Cloud Integration:</strong> Efficient and secure cloud solutions for seamless access anywhere.</li>
            <li><strong>24/7 Support:</strong> Get round-the-clock support to ensure your systems run smoothly.</li>
         </ul>
               <div className="btn btn-group">
               <a href="/#services"><button className="btn" style={{ background: "#61dafb", color: "black", fontWeight: "700" }}>Explore Services</button></a>
               <a href="/#about"><button className="btn secondary-btn" style={{ background: "#61dafb", color: "black", fontWeight: "700" }}>About Us</button></a>
               </div>
            </div>
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
      {/* <Footer/> */}
   </>
};
export default Home;