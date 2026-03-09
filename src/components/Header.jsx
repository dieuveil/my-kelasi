import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1 className="sitename">Kelasi-Tech</h1>
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link to="/" className="active">
                  Accueil
                </Link>
              </li>
              <li>
                <a href="#about">A Propos</a>
              </li>
              <li>
                <a href="#features">Services</a>
              </li>
              <li>
                <a href="#services">Fonctionnement</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>

            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>
          <Link className="btn-getstarted" to="/connexion">
            Se Connecter
          </Link>
        </div>
      </header>

    </>
  );
}