import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home from "../components/Header_Home";

import { Card, Avatar, Typography, Button, message as antdMessage, Row, Col, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const { Text } = Typography;

export default function List_Users() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Exemple utilisateur courant
  const currentUser = {
    name: "Utilisateur",
    email: "user@example.com",
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      antdMessage.success("Déconnexion réussie");
      navigate("/connexion");
    } catch (error) {
      antdMessage.error("Erreur lors de la déconnexion");
    } finally {
      setLoading(false);
    }
  };

  // Récupération des utilisateurs depuis Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error(error);
        antdMessage.error("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <main>
        <section
          id="hero"
          className="hero section"
          style={{ paddingRight: "50px", paddingLeft: "30px" }}
        >
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center justify-content-center">
               
                {/* LEFT COLUMN : USER CARD */}
              <div className="col-lg-6">
                Etudiants, Professionels, Enseignants chercheurs
              </div>

              {/* RIGHT COLUMN : IMAGE */}
              <div className="col-lg-6">
                
              </div>

              {/* USERS */}
              <div id="products" className="mt-5">
                {users.length === 0 && <p>Aucun utilisateur disponible</p>}

                <Row gutter={[16, 16]}>
                  {users.map((user, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <Card
                        title={user.name || "Nom indisponible"}
                        bordered
                        hoverable
                      >
                        <p><strong>Email:</strong> {user.email || "-"}</p>
                        <p><strong>Téléphone:</strong> {user.phone || "-"}</p>
                        <p><strong>Statut:</strong> {user.statut || "-"}</p>
                        <p><strong>Intérêt:</strong> {Array.isArray(user.interet) ? user.interet.join(", ") : user.interet || "-"}</p>
                        <p><strong>Domaine:</strong> {Array.isArray(user.domaine) ? user.domaine.join(", ") : user.domaine || "-"}</p>
                        <p><strong>Description:</strong> {user.description || "-"}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}