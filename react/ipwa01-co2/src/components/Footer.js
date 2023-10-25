import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center p-4">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Co² Footprint</p>
      </div>
    </footer>
  );
}

export default Footer;