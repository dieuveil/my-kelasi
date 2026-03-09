import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Feature() {
  return (
    <>
      <main className="main" style={{ marginRight: "20px", marginLeft: "20px"}}>
        {/* Hero Section */}
        <section id="hero" className="hero section" style={{ paddingRight: "20px", paddingLeft: "20px"}}>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6">
                <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
                  <div className="company-badge mb-4">
                    <i className="bi bi-gear-fill me-2" />
                     Vendez ou Partagez Vos connaissances en toute simplicité
                  </div>
                  <h1 className="mb-4 text-center">
                    Concus Par Les Africains <br />
                    <span className="accent-text">Pour Les Africains</span>
                  </h1>
                  <p className="mb-4 mb-md-5 text-center">
                    Livres, Tutoriels, Projets, Cours, Exercices avec ou sans Solutions, Resultats de recherche
                  </p>
                  <div className="hero-buttons text-center">
                    <Link to="/" className="btn btn-primary me-0 me-sm-2 mx-1">
                      Se Connecter
                    </Link>
                    <a
                      href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                      className="btn btn-link mt-2 mt-sm-0 glightbox"
                    >
                      <i className="bi bi-play-circle me-1" />
                       Liste De Documents
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                  <img
                    src="/img/edu.png"
                    alt="Hero Image"
                    className="img-fluid"
                  />
                  <div className="customers-badge">
                    <div className="customer-avatars">
                      <img
                        src="img/know.avif"
                        alt="Customer 1"
                        className="avatar"
                      />
                      <img
                        src="img/education.jpg"
                        alt="Customer 2"
                        className="avatar"
                      />
                      <img
                        src="img/know2.jpg"
                        alt="Customer 3"
                        className="avatar"
                      />

                      <span className="avatar more">12+</span>
                    </div>
                    <p className="mb-0 mt-2 text-center">
                      IT, Santé, Agriculture, Elevage, Climat, etc...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay={500}>
              {/* Centering stats items */}
              <div className="col-lg-3 col-md-6">
                <div className="stat-item text-center">
                  <div className="stat-icon">
                    <i className="bi bi-trophy" />
                  </div>
                  <div className="stat-content">
                    <h4>Echange de connaissance</h4>
                    <p className="mb-0"></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item text-center">
                  <div className="stat-icon">
                    <i className="bi bi-briefcase" />
                  </div>
                  <div className="stat-content">
                    <h4 className="mb-0">Rencontre</h4>
                    <p className="mb-0"></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item text-center">
                  <div className="stat-icon">
                    <i className="bi bi-graph-up" />
                  </div>
                  <div className="stat-content">
                    <h4>Montorat</h4>
                    <p className="mb-0"></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stat-item text-center">
                  <div className="stat-icon">
                    <i className="bi bi-award" />
                  </div>
                  <div className="stat-content">
                    <h4>Collaboration</h4>
                    <p className="mb-0"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Hero Section */}

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 align-items-center justify-content-center">
              <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
                <span className="about-meta" style={{fontSize: "25px", color: "blue"}}>A Propos</span>
                <h2 className="about-title text-center">De Kelasi-Tech</h2>
                <p className="about-description " style={{textAlign: "justify"}}>
                  La plateforme Kelasi-Tech vous permet de vendre, de partager, de télécharger et d'acheter des
                  des livres, des tutoriels, des cours et toutes autres sorte de support de connaissance.
                  A travers le profile de chaque utilisateur, cette plateforme vous permet aussi de rencontrer et de collaborer avec d'autres professionels, enseignants chercheurs et étudiants.<br/><br/>
                   <p
                    style={{
                      textDecorationLine: "underline",
                      textDecorationThickness: "0.12em",
                      textUnderlineOffset: "0.15em",
                      textDecorationColor: "blue",
                      lineHeight: "1.5", // pour avoir de l'espace entre les lignes
                    }}
                  >
                  Kelasi-Tech Academy étant le premier diffuseur de cours sur cette plateforme,
                  elle propose des formations avec accompagnement pour la réalisation de projets academique ou professionel dans les domaines suivants:</p> 
                </p>
                <div className="row feature-list-wrapper">
                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li>
                        <i className="bi bi-check-circle-fill" /> Développement Web
                      </li>
                      <li>
                        <i className="bi bi-check-circle-fill" /> Data science
                      </li>

                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li>
                        <i className="bi bi-check-circle-fill" /> Intelligence artificielle
                      </li>
                      <li>
                        <i className="bi bi-check-circle-fill" /> Big Data
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="info-wrapper">
                  <div className="row gy-4">
                    <div className="col-lg-5">
                      <div className="profile d-flex align-items-center gap-3">
                        <img
                          src="img/veil.jpg"
                          alt="CEO Profile"
                          className="profile-image"
                        />
                        <div>
                          <h4 className="profile-name text-center">Dieuveil MABIROU</h4>
                          <p className="profile-position text-center">Founder</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="contact-info d-flex align-items-center gap-2">
                        <i className="bi bi-telephone-fill" />
                        <div>
                          <p className="contact-label">Whatsapp</p>
                          <p className="contact-number">+242 069076369</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6" data-aos="fade-up" data-aos-delay={300}>
                <div className="image-wrapper">
                  <div className="images position-relative" data-aos="zoom-out" data-aos-delay={400}>
                    <img
                      src="img/education.jpg"
                      alt="Business Meeting"
                      className="img-fluid main-image rounded-4"
                    />
                    
                  </div>
                  <div className="experience-badge floating text-center">
                    <p>dd   IA Générative AI</p>
                    <img
                      src="img/big_data.webp "
                      alt="Team Discussion"
                      className="img-fluid small-image rounded-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */}

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials section light-background">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2 className="text-center">Services</h2>
            <p className="text-center">
            
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row g-5 justify-content-center">
              {/* Testimonial Item */}
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                <div className="testimonial-item text-center">
                     <ul
                        style={{
                          textAlign: "justify",
                          color: "#333",
                          fontSize: "1.1em",
                        }}
                      >
                        <li>Vente/Échange de documents PDF</li>
                        <li>Formation</li>
                        <li>
                          Accompagnement pour la réalisation des projets académiques (soutenance) et
                          professionnels innovants à travers des prototypes
                        </li>
                      </ul>
                </div>
              </div>
              {/* More testimonials... */}
            </div>
          </div>
        </section>
        {/* /Testimonials Section */}

        {/* Stats Section */}
        <section id="stats" className="stats section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 justify-content-center">
              <span className="about-meta" style={{fontSize: "25px", color: "blue"}}>Fonctionnement</span>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="stats-item w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={232}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Création de compte</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6 text-center">
                <div className="stats-item w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={521}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Ajouter Un Document</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6 text-center">
                <div className="stats-item w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={1453}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Consulter la liste de documents</p>
                </div>
              </div>
              {/* End Stats Item */}
              <div className="col-lg-3 col-md-6 text-center">
                <div className="stats-item w-100 h-100">
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={32}
                    data-purecounter-duration={1}
                    className="purecounter"
                  />
                  <p>Visiter le profil d'autres Utilisateurs</p>
                </div>
              </div>
              {/* End Stats Item */}
            </div>
          </div>
        </section>
        {/* /Stats Section */}
      </main>
    </>
  );
}