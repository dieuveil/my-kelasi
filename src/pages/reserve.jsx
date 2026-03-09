import React, { useState } from "react";
import Footer from "../components/Footer";
import Header_Home from "../components/Header_Home";

import { Card, Avatar, Typography, Button, message as antdMessage, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function Connexion() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Example user (replace with your real auth user)
  const user = {
    email: "user@example.com",
    name: "Utilisateur",
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Clear auth if needed
      localStorage.removeItem("token");

      antdMessage.success("Déconnexion réussie");
      navigate("/connexion");
    } catch (error) {
      antdMessage.error("Erreur lors de la déconnexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Home />

      <main className="main" style={{ marginRight: "60px", marginLeft: "60px" }}>
        <section
          id="hero"
          className="hero section"
          style={{ paddingRight: "50px", paddingLeft: "30px" }}
        >
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center justify-content-center">

              {/* LEFT COLUMN : USER CARD */}
              <div className="col-lg-6">
                <div data-aos="fade-up" data-aos-delay={200}>
                  <Card
                    title="Informations utilisateur"
                    style={{
                      maxWidth: 420,
                      margin: "auto",
                      borderRadius: "10px",
                      textAlign: "center"
                    }}
                  >
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      
                      <Avatar size={80} icon={<UserOutlined />} />

                      <Text strong style={{ fontSize: 18 }}>
                        {user.name}
                      </Text>

                      <Text type="secondary">
                        {user.email}
                      </Text>

                      <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        block
                        loading={loading}
                        onClick={handleLogout}
                      >
                        Se déconnecter
                      </Button>

                    </Space>
                  </Card>
                </div>
              </div>

              {/* RIGHT COLUMN : IMAGE */}
              <div className="col-lg-6">
                <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
                  <img
                    src="/img/edu.png"
                    alt="Hero Image"
                    className="img-fluid"
                  />
                  <div className="customers-badge">
                    <div className="customer-avatars">
                      <img src="img/know.avif" alt="Customer 1" className="avatar" />
                      <img src="img/education.jpg" alt="Customer 2" className="avatar" />
                      <img src="img/know2.jpg" alt="Customer 3" className="avatar" />
                      <span className="avatar more">12+</span>
                    </div>
                    <p className="mb-0 mt-2 text-center">
                      IT, Santé, Agriculture, Elevage, Climat, etc...
                    </p>
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}