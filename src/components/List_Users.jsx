import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home from "../components/Header_Home";

import { Card, Avatar, Typography, Row, Col, Select, Spin, message as antdMessage } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const { Text, Paragraph } = Typography;
const { Option } = Select;

export default function List_Users() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    statut: [],
    domaine: [],
    interet: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error(error);
        antdMessage.error("Erreur lors du chargement des utilisateurs");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchStatut =
        filters.statut.length === 0 || (user.statut && filters.statut.includes(user.statut));
      const matchDomaine =
        filters.domaine.length === 0 ||
        (user.domaine && user.domaine.some((d) => filters.domaine.includes(d)));
      const matchInteret =
        filters.interet.length === 0 ||
        (user.interet && user.interet.some((i) => filters.interet.includes(i)));
      return matchStatut && matchDomaine && matchInteret;
    });
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <>
      <main>
        <section className="hero section" style={{ paddingRight: "50px", paddingLeft: "30px" }}>
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center justify-content-center">
              
              <h2 style={{ textAlign: "center", marginBottom: 20 }}>Liste des utilisateurs</h2>

              {/* FILTRES */}
              <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
                <Col xs={24} sm={8}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Filtrer par statut"
                    style={{ width: "100%" }}
                    onChange={(value) => handleFilterChange("statut", value)}
                  >
                    <Option value="Étudiant">Étudiant</Option>
                    <Option value="Professionnel">Professionnel</Option>
                    <Option value="Entrepreneur">Entrepreneur</Option>
                    <Option value="Enseignant Chercheur">Enseignant Chercheur</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Filtrer par domaine"
                    style={{ width: "100%" }}
                    onChange={(value) => handleFilterChange("domaine", value)}
                  >
                    <Option value="IT / Informatique">IT / Informatique</Option>
                    <Option value="Santé">Santé</Option>
                    <Option value="Agriculture">Agriculture</Option>
                    <Option value="Climat / Environnement">Climat / Environnement</Option>
                    <Option value="Élevage / Animaux">Élevage / Animaux</Option>
                    <Option value="Finance / Banque">Finance / Banque</Option>
                    <Option value="Éducation / Formation">Éducation / Formation</Option>
                    <Option value="Énergie / Énergies renouvelables">Énergie / Énergies renouvelables</Option>
                    <Option value="Transport / Logistique">Transport / Logistique</Option>
                    <Option value="Construction / BTP">Construction / BTP</Option>
                    <Option value="Commerce / Distribution">Commerce / Distribution</Option>
                    <Option value="Tourisme / Hôtellerie">Tourisme / Hôtellerie</Option>
                    <Option value="Arts / Culture">Arts / Culture</Option>
                    <Option value="Recherche / Développement">Recherche / Développement</Option>
                    <Option value="Communication / Marketing">Communication / Marketing</Option>
                    <Option value="Juridique / Droit">Juridique / Droit</Option>
                    <Option value="Industrie / Manufacture">Industrie / Manufacture</Option>
                    <Option value="Services / Administration">Services / Administration</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Filtrer par intérêt"
                    style={{ width: "100%" }}
                    onChange={(value) => handleFilterChange("interet", value)}
                  >
                    <Option value="Innovation">Innovation</Option>
                    <Option value="Technologie">Technologie</Option>
                    <Option value="Formation">Formation</Option>
                    <Option value="Projets et stages">Projets et stages</Option>
                    <Option value="Compétitions">Compétitions / Concours</Option>
                    <Option value="Mentorat">Mentorat</Option>
                    <Option value="Recherche académique">Recherche académique</Option>
                    <Option value="Publication scientifique">Publication scientifique</Option>
                    <Option value="Pédagogie">Pédagogie</Option>
                    <Option value="Management">Management / Leadership</Option>
                    <Option value="Business development">Business development</Option>
                    <Option value="Networking">Networking / Réseautage</Option>
                    <Option value="Startups">Startups / Création d’entreprise</Option>
                    <Option value="Levée de fonds">Levée de fonds</Option>
                    <Option value="Innovation disruptive">Innovation disruptive</Option>
                    <Option value="Marketing & Ventes">Marketing & Ventes</Option>
                    <Option value="Regroupement">Regroupement</Option>
                    <Option value="Investissement">Investissement</Option>
                    <Option value="Partenariat">Partenariat</Option>
                  </Select>
                </Col>
              </Row>

              {loading ? (
                <div style={{ textAlign: "center", marginTop: 100 }}>
                  <Spin size="large" />
                </div>
              ) : filteredUsers.length === 0 ? (
                <p>Aucun utilisateur disponible</p>
              ) : (
                <Row gutter={[16, 16]}>
                  {filteredUsers.map((user, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <Card bordered hoverable style={{ textAlign: "center" }}>
                        <Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: 10 }} />
                        <div>
                          <Text style={{ color: "blue", fontWeight: "bold", fontSize: 16 }}>
                            {user.name || "Nom indisponible"}
                          </Text>
                          <br />
                          <Text style={{ color: "red" }}>{user.email || "Email indisponible"}</Text>
                        </div>
                        <p><strong>Téléphone:</strong> {user.phone || "-"}</p>
                        <p><strong>Statut:</strong> {user.statut || "-"}</p>
                        <p><strong>Intérêt:</strong> {Array.isArray(user.interet) ? user.interet.join(", ") : user.interet || "-"}</p>
                        <p><strong>Domaine:</strong> {Array.isArray(user.domaine) ? user.domaine.join(", ") : user.domaine || "-"}</p>
                        <Paragraph
                          ellipsis={{ rows: 3, expandable: true, symbol: "Voir plus" }}
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "8px",
                            borderRadius: "5px",
                            marginTop: "10px",
                          }}
                        >
                          {user.description || "-"}
                        </Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}