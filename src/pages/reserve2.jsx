import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home from "../components/Header_Home";

import { Card, Avatar, Typography, Button, message as antdMessage, Space, Row, Col } from "antd";
import { UserOutlined, LogoutOutlined, DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const { Text } = Typography;

export default function Connexion() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

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

  // Fetch documents from Firestore
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        const docs = querySnapshot.docs.map((doc) => doc.data());
        setDocuments(docs);
      } catch (error) {
        console.error(error);
        antdMessage.error("Erreur lors du chargement des documents");
      }
    };

    fetchDocuments();
  }, []);

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

                      <Text type="secondary">{user.email}</Text>

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
                  <img src="/img/edu.png" alt="Hero Image" className="img-fluid" />
                </div>
              </div>

              {/* DOCUMENTS */}
              <div id="products" className="row mt-5">
                {documents.length === 0 && <p>Aucun document disponible</p>}

                {documents.map((doc, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6} className="mb-4">
                    <Card
                      title={doc.file_name}
                      bordered={true}
                      hoverable
                      actions={[
                        <Button
                          type="link"
                          icon={<DownloadOutlined />}
                          onClick={() => window.open(doc.pdf_url, "_blank")}
                        >
                          Télécharger
                        </Button>,
                      ]}
                    >
                      <p><strong>Type:</strong> {Array.isArray(doc.publication_type) ? doc.publication_type.join(", ") : doc.publication_type}</p>
                      <p><strong>Statut:</strong> {doc.statut}</p>
                      <p><strong>Domaine:</strong> {Array.isArray(doc.domaine) ? doc.domaine.join(", ") : doc.domaine}</p>
                      <p><strong>Description:</strong> {doc.doc_description}</p>
                    </Card>
                  </Col>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
