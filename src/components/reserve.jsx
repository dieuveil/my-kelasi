import React from "react";

export default function Feature() {
  return (
    <>
       <main className="main">
            {/* Hero Section */}
            <section id="hero" className="hero section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                    <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
                        <div className="company-badge mb-4">
                        <i className="bi bi-gear-fill me-2" />
                        Working for your success
                        </div>
                        <h1 className="mb-4">
                        Maecenas Vitae <br />
                        Consectetur Led <br />
                        <span className="accent-text">Vestibulum Ante</span>
                        </h1>
                        <p className="mb-4 mb-md-5">
                        Nullam quis ante. Etiam sit amet orci eget eros faucibus
                        tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec
                        sodales sagittis magna.
                        </p>
                        <div className="hero-buttons">
                        <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">
                            Get Started
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                            className="btn btn-link mt-2 mt-sm-0 glightbox"
                        >
                            <i className="bi bi-play-circle me-1" />
                            Play Video
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                        <img
                        src="assets/img/illustration-1.webp"
                        alt="Hero Image"
                        className="img-fluid"
                        />
                        <div className="customers-badge">
                        <div className="customer-avatars">
                            <img
                            src="assets/img/avatar-1.webp"
                            alt="Customer 1"
                            className="avatar"
                            />
                            <img
                            src="assets/img/avatar-2.webp"
                            alt="Customer 2"
                            className="avatar"
                            />
                            <img
                            src="assets/img/avatar-3.webp"
                            alt="Customer 3"
                            className="avatar"
                            />
                            <img
                            src="assets/img/avatar-4.webp"
                            alt="Customer 4"
                            className="avatar"
                            />
                            <img
                            src="assets/img/avatar-5.webp"
                            alt="Customer 5"
                            className="avatar"
                            />
                            <span className="avatar more">12+</span>
                        </div>
                        <p className="mb-0 mt-2">
                            12,000+ lorem ipsum dolor sit amet consectetur adipiscing elit
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div
                    className="row stats-row gy-4 mt-5"
                    data-aos="fade-up"
                    data-aos-delay={500}
                >
                    <div className="col-lg-3 col-md-6">
                    <div className="stat-item">
                        <div className="stat-icon">
                        <i className="bi bi-trophy" />
                        </div>
                        <div className="stat-content">
                        <h4>3x Won Awards</h4>
                        <p className="mb-0">Vestibulum ante ipsum</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="stat-item">
                        <div className="stat-icon">
                        <i className="bi bi-briefcase" />
                        </div>
                        <div className="stat-content">
                        <h4>6.5k Faucibus</h4>
                        <p className="mb-0">Nullam quis ante</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="stat-item">
                        <div className="stat-icon">
                        <i className="bi bi-graph-up" />
                        </div>
                        <div className="stat-content">
                        <h4>80k Mauris</h4>
                        <p className="mb-0">Etiam sit amet orci</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="stat-item">
                        <div className="stat-icon">
                        <i className="bi bi-award" />
                        </div>
                        <div className="stat-content">
                        <h4>6x Phasellus</h4>
                        <p className="mb-0">Vestibulum ante ipsum</p>
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
                <div className="row gy-4 align-items-center justify-content-between">
                    <div className="col-xl-5" data-aos="fade-up" data-aos-delay={200}>
                    <span className="about-meta">MORE ABOUT US</span>
                    <h2 className="about-title">Voluptas enim suscipit temporibus</h2>
                    <p className="about-description">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                    </p>
                    <div className="row feature-list-wrapper">
                        <div className="col-md-6">
                        <ul className="feature-list">
                            <li>
                            <i className="bi bi-check-circle-fill" /> Lorem ipsum dolor
                            sit amet
                            </li>
                            <li>
                            <i className="bi bi-check-circle-fill" /> Consectetur
                            adipiscing elit
                            </li>
                            <li>
                            <i className="bi bi-check-circle-fill" /> Sed do eiusmod
                            tempor
                            </li>
                        </ul>
                        </div>
                        <div className="col-md-6">
                        <ul className="feature-list">
                            <li>
                            <i className="bi bi-check-circle-fill" /> Incididunt ut labore
                            et
                            </li>
                            <li>
                            <i className="bi bi-check-circle-fill" /> Dolore magna aliqua
                            </li>
                            <li>
                            <i className="bi bi-check-circle-fill" /> Ut enim ad minim
                            veniam
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="info-wrapper">
                        <div className="row gy-4">
                        <div className="col-lg-5">
                            <div className="profile d-flex align-items-center gap-3">
                            <img
                                src="assets/img/avatar-1.webp"
                                alt="CEO Profile"
                                className="profile-image"
                            />
                            <div>
                                <h4 className="profile-name">Mario Smith</h4>
                                <p className="profile-position">CEO &amp; Founder</p>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="contact-info d-flex align-items-center gap-2">
                            <i className="bi bi-telephone-fill" />
                            <div>
                                <p className="contact-label">Call us anytime</p>
                                <p className="contact-number">+123 456-789</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-6" data-aos="fade-up" data-aos-delay={300}>
                    <div className="image-wrapper">
                        <div
                        className="images position-relative"
                        data-aos="zoom-out"
                        data-aos-delay={400}
                        >
                        <img
                            src="assets/img/about-5.webp"
                            alt="Business Meeting"
                            className="img-fluid main-image rounded-4"
                        />
                        <img
                            src="assets/img/about-2.webp"
                            alt="Team Discussion"
                            className="img-fluid small-image rounded-4"
                        />
                        </div>
                        <div className="experience-badge floating">
                        <h3>
                            15+ <span>Years</span>
                        </h3>
                        <p>Of experience in business service</p>
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
                <h2>Testimonials</h2>
                <p>
                    Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                    consectetur velit
                </p>
                </div>
                {/* End Section Title */}
                <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                    <div className="testimonial-item">
                        <img
                        src="assets/img/testimonials/testimonials-1.jpg"
                        className="testimonial-img"
                        alt=""
                        />
                        <h3>Saul Goodman</h3>
                        <h4>Ceo &amp; Founder</h4>
                        <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        </div>
                        <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                            Proin iaculis purus consequat sem cure digni ssim donec
                            porttitora entum suscipit rhoncus. Accusantium quam, ultricies
                            eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                        </p>
                    </div>
                    </div>
                    {/* End testimonial item */}
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
                    <div className="testimonial-item">
                        <img
                        src="assets/img/testimonials/testimonials-2.jpg"
                        className="testimonial-img"
                        alt=""
                        />
                        <h3>Sara Wilsson</h3>
                        <h4>Designer</h4>
                        <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        </div>
                        <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                            Export tempor illum tamen malis malis eram quae irure esse
                            labore quem cillum quid cillum eram malis quorum velit fore eram
                            velit sunt aliqua noster fugiat irure amet legam anim culpa.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                        </p>
                    </div>
                    </div>
                    {/* End testimonial item */}
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
                    <div className="testimonial-item">
                        <img
                        src="assets/img/testimonials/testimonials-3.jpg"
                        className="testimonial-img"
                        alt=""
                        />
                        <h3>Jena Karlis</h3>
                        <h4>Store Owner</h4>
                        <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        </div>
                        <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                            Enim nisi quem export duis labore cillum quae magna enim sint
                            quorum nulla quem veniam duis minim tempor labore quem eram duis
                            noster aute amet eram fore quis sint minim.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                        </p>
                    </div>
                    </div>
                    {/* End testimonial item */}
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
                    <div className="testimonial-item">
                        <img
                        src="assets/img/testimonials/testimonials-4.jpg"
                        className="testimonial-img"
                        alt=""
                        />
                        <h3>Matt Brandon</h3>
                        <h4>Freelancer</h4>
                        <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        </div>
                        <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                            multos export minim fugiat minim velit minim dolor enim duis
                            veniam ipsum anim magna sunt elit fore quem dolore labore illum
                            veniam.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                        </p>
                    </div>
                    </div>
                    {/* End testimonial item */}
                </div>
                </div>
            </section>
            {/* /Testimonials Section */}
            {/* Stats Section */}
            <section id="stats" className="stats section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="row gy-4">
                    <div className="col-lg-3 col-md-6">
                    <div className="stats-item text-center w-100 h-100">
                        <span
                        data-purecounter-start={0}
                        data-purecounter-end={232}
                        data-purecounter-duration={1}
                        className="purecounter"
                        />
                        <p>Clients</p>
                    </div>
                    </div>
                    {/* End Stats Item */}
                    <div className="col-lg-3 col-md-6">
                    <div className="stats-item text-center w-100 h-100">
                        <span
                        data-purecounter-start={0}
                        data-purecounter-end={521}
                        data-purecounter-duration={1}
                        className="purecounter"
                        />
                        <p>Projects</p>
                    </div>
                    </div>
                    {/* End Stats Item */}
                    <div className="col-lg-3 col-md-6">
                    <div className="stats-item text-center w-100 h-100">
                        <span
                        data-purecounter-start={0}
                        data-purecounter-end={1453}
                        data-purecounter-duration={1}
                        className="purecounter"
                        />
                        <p>Hours Of Support</p>
                    </div>
                    </div>
                    {/* End Stats Item */}
                    <div className="col-lg-3 col-md-6">
                    <div className="stats-item text-center w-100 h-100">
                        <span
                        data-purecounter-start={0}
                        data-purecounter-end={32}
                        data-purecounter-duration={1}
                        className="purecounter"
                        />
                        <p>Workers</p>
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