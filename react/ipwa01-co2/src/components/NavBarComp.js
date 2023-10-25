import react, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from './images/logo7.png';
import { Link } from "react-router-dom"; 
import './NavBar.css';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRTL: false
    };
  }

  componentDidMount() {
    // Ermittle die bevorzugte Sprache des Besuchers
    const userLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
    const firstUserLanguage = userLanguages[0];

    // Überprüfe die bevorzugte Sprache des Besuchers, um auf die Schriftkultur hinzuweisen
    if (firstUserLanguage.startsWith('ar') || firstUserLanguage.startsWith('he')) {
      // Rechts-nach-links-Schriftkultur (z. B. Arabisch oder Hebräisch)
      this.setState({ isRTL: true });
    }
  }

  render() {

    const { isRTL } = this.state;

    return (
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">
            <div className={`logo ${isRTL ? 'logo-right' : 'logo-left'}`}>
                <img src={logo} alt="logo" width="100" height="70" className="img-fluid d-block" />
            </div>
            </Navbar.Brand>
            <Nav className={isRTL ? 'navbar-rtl' : 'navbar-ltr'}>
              <Nav.Link as={Link} to="/">Startseite</Nav.Link>
              <Nav.Link as={Link} to="/länder">Länder</Nav.Link>
              <Nav.Link as={Link} to="/unternehmen">Unternehmen</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </div>
    )
  }
}