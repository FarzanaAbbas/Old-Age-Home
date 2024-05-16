import React from 'react';
import './Homepage.css';
import Navbar from '../../components/Navbar/Navbar';
import { useInView } from 'react-intersection-observer';
import Banner from '../../components/Banner/Banner';
import Senior from '../../components/Senior/Senior';

export default function Homepage() {
  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [servicesRef, servicesInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [footerRef, footerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <>
      <Navbar />
      <div>
        <header ref={headerRef} className={headerInView ? 'visible' : 'hidden'}>
          <h1>Type of Care</h1>
          <p className='para'>Our Services - Solution for Quality Elderly Care.</p>
        </header>
        <Senior/>
        <h1 className='ourServices'><strong>Our services</strong></h1>
        <div ref={servicesRef} className={`services ${servicesInView ? 'visible' : 'hidden'}`}>
          <div className="service">
            <img src="/dcotor-1.avif" alt="Pediatric Dentistry" />
            <h3>Pediatric Dentistry</h3>
            <p>Passionate care aligned with the latest in pediatric dental health.</p>
          </div>
  
          <div className="service">
            <img src="/doctor-5.avif" alt="Teeth Whitening" />
            <h3>Teeth Whitening</h3>
            <p>Advanced treatments to bring out the best in your smile.</p>
          </div>
          <div className="service">
            <img src="/doctor-6.avif" alt="Orthodontics" />
            <h3>Orthodontics</h3>
            <p>Modern and traditional orthodontic services for all ages.</p>
          </div>
          <div className="service">
            <img src="/image-3.jpg" alt="Free Consultation" />
            <h3>Free Consultation</h3>
            <p>Discuss your dental needs and get a free treatment plan.</p>
          </div>
        </div>
       
        <Banner />
        <footer ref={footerRef} className={footerInView ? 'visible' : 'hidden'}>
        <div className="footer-content">
        <div className="contact-info">
        <p>
            Make Your Old Days Happier. Clarify Your Question, Call us Now: (123) 234</p>
          <h2>Contact Us</h2>
          <p>
            Address: 123 Old Age Home Street, City, Country<br />
            Phone: (123) 234-5678<br />
            Email: info@oldagehome.com
          </p>
        </div>
        <div className="social-links1">
          <h2>Follow Us</h2>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Old Age Home. All rights reserved.
      </p>
    </footer>
      
      </div>
    </>
  )
}
