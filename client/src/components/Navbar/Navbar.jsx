import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <h1>OldAgeHome</h1>
      <div className="navbar-links">
        <Link className="link" to={'/home'}>Home</Link>
        <Link className="link" to={'/patients'}>Patients</Link>
        <Link className="link" to={'/doctors'}>Doctors</Link>
        <Link className="link" to={'/medicines'}>Medicines</Link>
        <Link className="link" to={'/visitors'}>Visitors</Link>
      </div>
    </nav>
  );
};

export default Navbar;
