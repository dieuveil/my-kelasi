import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home from "../components/Header_Home";

import { Card, Typography, Button, message as antdMessage, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { db } from "../firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const { Text } = Typography;

export default function products() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocumentsWithUsers = async () => {
      setLoading(true);
      try {
        // 1️⃣ Récupérer tous les documents
        const docsSnapshot = await getDocs(collection(db, "documents"));
        const docsData = docsSnapshot.docs.map((doc) => doc.data());

        // 2️⃣ Pour chaque document, récupérer les infos de l'utilisateur
        const docsWithUser = await Promise.all(
          docsData.map(async (docItem) => {
            let userData = { name: "Utilisateur inconnu", email: "-" };
            if (docItem.userid) {
              const userRef = doc(db, "users", docItem.userid);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                userData = userSnap.data();
              }
            }
            return { ...docItem, userName: userData.name, userEmail: userData.email };
          })
        );

        setDocuments(docsWithUser);
      } catch (error) {
        console.error(error);
        antdMessage.error("Erreur lors du chargement des documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentsWithUsers();
  }, []);

  return (
    <>
      <Header_Home />

      <main className="main" style={{ marginRight: "60px", marginLeft: "60px" }}>
        <section
          id="documents"
          className="section"
          style={{ paddingRight: "50px", paddingLeft: "30px" }}
        >
          <div className="container">
            {documents.length === 0 && <p>Aucun document disponible</p>}

            <Row gutter={[16, 16]}>
              {documents.map((docItem, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    title={docItem.file_name}
                    bordered
                    hoverable
                    actions={[
                      <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => window.open(docItem.pdf_url, "_blank")}
                      >
                        Télécharger
                      </Button>,
                    ]}
                  >
                    <p><strong>Publié par:</strong> {docItem.userName}</p>
                    <p><strong>Email:</strong> {docItem.userEmail}</p>
                    <p><strong>Type:</strong> {Array.isArray(docItem.publication_type) ? docItem.publication_type.join(", ") : docItem.publication_type}</p>
                    <p><strong>Statut:</strong> {docItem.statut}</p>
                    <p><strong>Domaine:</strong> {Array.isArray(docItem.domaine) ? docItem.domaine.join(", ") : docItem.domaine}</p>
                    <p><strong>Description:</strong> {docItem.doc_description}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}