import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center p-4">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Co² Footprint</p>
        <p>
          <a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutzerklärung</a> | <a href="/nutzungsbedingungen">Nutzungsbedingungen</a>
        </p>
        <p>Cookie-Hinweis: Diese Website verwendet Cookies zur Verbesserung der Nutzererfahrung. <a href="/cookie-richtlinie">Cookie-Richtlinie</a></p>
        <p>Alle Rechte vorbehalten. <a href="/urheberrechtsvermerk">Urheberrechtsvermerk</a></p>
      </div>
    </footer>
  );
}

export default Footer;