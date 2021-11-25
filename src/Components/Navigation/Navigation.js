import React from "react";
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import useAuth from "../../hooks/useAuth";
import "./Navigation.css";

const Navigation = () => {
  const history = useHistory();
  const {
    currentUser: { displayName, photoURL, email },
    handleLogout,
    admin,
  } = useAuth();
  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: "rgb(17 24 39)" }}
      expand="lg"
    >
      <div className="container-fluid">
        <NavLink style={{ width: "15%" }} className="nav-link logo" to="/">
          <Navbar.Brand className="d-flex align-items-center fw-bold w-25">
            <img className="logo me-1 img-fluid " src={logo} alt="logoImg" />
            <span className="fs-5">UGoOnTravel</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex align-items-center "
            navbarScroll
          >
            <NavLink className="nav-link  me-2 " to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link  me-2 " to="/tour-packages">
              Tour Packages
            </NavLink>
            <NavLink className="nav-link me-2 " to="/about-us">
              About Us
            </NavLink>
            <NavLink className="nav-link  me-2 " to="/contact-us">
              Contact Us
            </NavLink>

            {admin && (
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/addPackage">
                    Add Package
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/manageAllPackage">
                    Manage All Package
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/makeAdmin">
                    Make Admin
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {email && (
              <NavLink
                className="nav-link  me-2 "
                to="/registeredBooking/myBookings"
              >
                My Packages
              </NavLink>
            )}

            {photoURL && (
              <div>
                <img
                  referrerPolicy="no-referrer"
                  style={{ width: "40px", borderRadius: "50%" }}
                  src={photoURL}
                  loading="lazy"
                  alt="img"
                />
              </div>
            )}
            {(displayName || email) && (
              <span className=" me-2 px-1 py-2 ms-2">
                {displayName || email}
              </span>
            )}
            {!(displayName || email) ? (
              <Link to="/login">
                <Button className="shadow-none " variant="primary">
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                className="shadow-none"
                variant="primary"
                onClick={() => [handleLogout(), history.push("/")]}
              >
                Log out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
