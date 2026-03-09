import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer id="footer" className="footer" style={{backgroundColor: "#f3f9ff"}}>
        <div className="container footer-top">
          <div className="row gy-4" id="contact">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">Kelasi-Tech</span>
              </a>
              
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+242 069076369</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>kelasitech@gmail.com</span>
                </p>
            
              <div className="social-links d-flex mt-4">
                <a href="">
                  <i className="bi bi-twitter-x" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="">
                  <i className="bi bi-instagram" />
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Liens Utils</h4>
              <ul>
                <li>
                  <Link to="/connexion">Connexion</Link>
                </li>
                <li>
                  <Link to="/enregistrement">Enregistrement</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Tags</h4>
              <ul>
                <li>
                  <a href="#">Connaissances</a>
                </li>
                <li>
                  <a href="#">Rencontres</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Revolution</h4>
              <ul>
                <li>
                  <a href="#">Transfert Technologique</a>
                </li>
                <li>
                  <a href="#">Echange de connaissance</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
               <img
                    src="/img/kel_c .png"
                    alt="Hero Image"
                    className="img-fluid"
                  />
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">kelasi-tech</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            {/* All the links in the footer should remain intact. */}
            {/* You can delete the links only if you've purchased the pro version. */}
            {/* Licensing information: https://bootstrapmade.com/license/ */}
            {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
            Designed by <a href="https://bootstrapmade.com/">Dieuveil MABIROU</a>{" "}
            Distributed By <a href="https://themewagon.com">kelasi-tech</a>
          </div>
        </div>
      </footer>
    </>
  )
}