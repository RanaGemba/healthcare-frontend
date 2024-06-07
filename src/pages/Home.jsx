import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <img src="https://e7.pngegg.com/pngimages/879/648/png-clipart-dr-ruparelia-s-sushrusha-ayurved-multispeciality-hospital-hospital-of-the-holy-spirit-apollo-hospital-indraprastha-logo-raj-designs-hospital-miscellaneous-leaf.png" alt="Hospital Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      
      <header className="banner">
        <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDM3NTl8MHwxfGFsbHwyfHx8fHx8fHwxNjg3NTc1MjAw&ixlib=rb-4.0.3&q=80&w=1080" alt="Hospital Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Hospital</h1>
          <p>Your health is our priority</p>
        </div>
      </header>
      
      <main className="content">
        <section id="about" className="section about-section">
          <h2>About Us</h2>
          <p>We are dedicated to providing the best healthcare services to our community.</p>
          <img src="https://hhphospital.com/wp-content/uploads/2022/04/132271849067790530about.jpg" alt="About Us" className="about-image" />
        </section>
        
        <section id="services" className="section services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <img src="https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDM3NTl8MHwxfGFsbHwzfHx8fHx8fHwxNjg3NTc1MjAw&ixlib=rb-4.0.3&q=80&w=1080" alt="Service 1" className="service-image" />
              <h3>Service 1</h3>
              <p>Description of Service 1</p>
            </div>
            <div className="service-item">
              <img src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/2022-03/Patient-Care-Mobile_0.png?VersionId=SsHjTBH.9Mkh2LvRAaqmetRVa9RbWoJb" alt="Service 2" className="service-image" />
              <h3>Service 2</h3>
              <p>Description of Service 2</p>
            </div>
            <div className="service-item">
              <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDM3NTl8MHwxfGFsbHw1fHx8fHx8fHwxNjg3NTc1MjAw&ixlib=rb-4.0.3&q=80&w=1080" alt="Service 3" className="service-image" />
              <h3>Service 3</h3>
              <p>Description of Service 3</p>
            </div>
          </div>
        </section>
        
        <section id="contact" className="section contact-section">
          <h2>Contact Us</h2>
          <p>Reach out to us for any inquiries or appointments.</p>
          <form className="contact-form">
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Message:
              <textarea name="message"></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 Hospital Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
