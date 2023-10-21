import "./NavBar.css";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/sdworx_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate("/auth")
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <div>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
            <span>
              <span>Debug</span>
              <span>Thugs</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="/home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              {isLoggedIn && (
                <>
             <Nav.Link
             href="/car-pooling"
             className={
               activeLink === "car-pooling" ? "active navbar-link" : "navbar-link"
             }
             onClick={() => onUpdateActiveLink("car-pooling")}
           >
            Car-Pooling
           </Nav.Link>
            <Nav.Link
            href="/trips"
            className={
              activeLink === "trips" ? "active navbar-link" : "navbar-link"
            }
            onClick={() => onUpdateActiveLink("trips")}
          >
          Trips
          </Nav.Link>
          </>
            )}
              
            </Nav>

            {isLoggedIn && (
              <span className="navbar-text">
              <Nav.Link>
                <button onClick={() => handleLogout()} className="vvd">
                  <span>Sign Out</span>
                </button>
              </Nav.Link>
            </span>
            )}

            {!isLoggedIn && (
              <span className="navbar-text">
              <Nav.Link as={Link} to={"/auth"}>
                <button className="vvd">
                  <span>Sign In</span>
                </button>
              </Nav.Link>
            </span>
            )}
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
