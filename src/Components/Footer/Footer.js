import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer mt-5  ">
        <div className="footer__addr">
          <h1 className="footer__logo">UGoOnTravel</h1>

          <h2>Contact</h2>

          <address>
            115/1 Arambag ,Moulvibazar
            <br />
            <a className="footer__btn" href="mailto:rahmanmahi02@gmail.com">
              Email Us
            </a>
          </address>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Packages</h2>

            <ul className="nav__ul">
              <li>
                <HashLink to="/home#packages">
                  Best Western Cedars Hotel
                </HashLink>
              </li>
              <li>
                <HashLink to="/home#packages">
                  Bell by Greene King Inns
                </HashLink>
              </li>

              <li>
                <HashLink to="/home#packages">
                  Half Moon, Sherborne by Marston's Inns
                </HashLink>
              </li>

              <li>
                <HashLink to="/home#packages">
                  Holiday Inn Express Ramsgate – Minster, an IHG Hotel
                </HashLink>
              </li>
              <li>
                <HashLink to="/home#packages">
                  The Windmill Family & Commercial Hotel
                </HashLink>
              </li>
              <li>
                <HashLink to="/home#packages">Amalfi Coast</HashLink>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Status</h2>
            <span style={{ color: "#CFDDDD" }}>
              We are open from 8 AM to 10 PM
            </span>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Address</h2>

            <ul className="nav__ul">
              <li>
                <Link to="/home">UGoOnTravel</Link>
              </li>

              <li>
                <span style={{ color: "#CFDDDD" }}>
                  115/1 North Kalimabad,Moulvibazar
                </span>
              </li>

              <li>
                <span style={{ color: "#CFDDDD" }}>phone: 01731248533</span>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>

            <ul className="nav__ul">
              <li>
                <span style={{ color: "#CFDDDD" }}>Privacy Policy</span>
              </li>

              <li>
                <span style={{ color: "#CFDDDD" }}>Terms of Use</span>
              </li>

              <li>
                <span style={{ color: "#CFDDDD" }}>Sitemap</span>
              </li>
            </ul>
          </li>
        </ul>

        <div className="legal">
          <p>&copy; 2021 UGpOnTravel. All rights reserved.</p>

          <div className="legal__links">
            <span>
              Made with <span className="heart">♥</span> remotely from
              Bangladesh
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
