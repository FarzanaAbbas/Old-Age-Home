import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Senior.css';

const Senior = () => {
  const [contactRef, contactInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [testimonialRef, testimonialInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className="container">
      <div ref={contactRef} className={contactInView ? 'contact-banner visible' : 'contact-banner'}>
          <img src="/patient-1.avif" alt="Elderly couple smiling"/>
          <div className="contact-info">
              <h1>About Us</h1>
              <p>Our team consists of skilled and compassionate professionals who are passionate about providing exceptional care for seniors. From caregivers and nurses to administrative staff and volunteers, everyone at Old Age Home Name works together to create a warm, welcoming, and safe environment for our residents.</p>
          </div>
      </div>
      <div ref={contentRef} className={contentInView ? 'content visible' : 'content'}>
          <div className="why-choose-us">
              <h2>Make Your Old Days Happier.</h2>
              <p></p>
          </div>
          <div className="details">
              <div ref={missionRef} className={missionInView ? 'mission visible' : 'mission'}>
                  <h3>Our Mission</h3>
                  <p> our mission is to provide compassionate care and support for elderly individuals in their golden years. We strive to create a nurturing environment where seniors can thrive physically, emotionally, and socially.</p>
              </div>
              <div className="vision">
                  <h3>Our Vision</h3>
                  <p>Our vision is to be a leading provider of elderly care services, recognized for our commitment to excellence, dignity, and respect for each resident. We aim to enhance the quality of life for every individual under our care, promoting independence, wellness, and happiness.</p>
              </div>
          </div>
          {/* <div ref={testimonialRef} className={testimonialInView ? 'testimonial visible' : 'testimonial'}>
              <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."</blockquote>
              <p>— John Doe, Designer</p>
          </div> */}
      </div>
    </div>
  );
}

export default Senior;
