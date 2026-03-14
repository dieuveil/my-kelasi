import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header_Home2 from "../components/Header_Home2";

import {
  Card,
  Row,
  Col,
  Spin,
  Button,
  Tag,
  Empty,
  Select,
  InputNumber,
  Space,
  Avatar,
  Typography
} from "antd";

import { FilePdfOutlined, DownloadOutlined, UserOutlined } from "@ant-design/icons";

import { db } from "../firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const { Option } = Select;
const { Text, Paragraph } = Typography;

export default function List_Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersMap, setUsersMap] = useState({});

  // filtres
  const [filterType, setFilterType] = useState([]);
  const [filterDomain, setFilterDomain] = useState([]);
  const [filterPriceMin, setFilterPriceMin] = useState(null);
  const [filterPriceMax, setFilterPriceMax] = useState(null);

  // Récupérer tous les utilisateurs pour associer nom, téléphone et email
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const map = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        map[data.id] = {
          name: data.name,
          phone: data.phone,
          email: data.email
        };
      });
      setUsersMap(map);
    } catch (err) {
      console.error("Erreur chargement utilisateurs:", err);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(
        query(collection(db, "documents"), orderBy("created_at", "desc"))
      );

      let docsArray = [];
      snapshot.forEach((doc) => docsArray.push({ id: doc.id, ...doc.data() }));

      // Appliquer les filtres côté client (multi-critères)
      if (filterType.length > 0) {
        docsArray = docsArray.filter((d) =>
          d.publication_type?.some((t) => filterType.includes(t))
        );
      }
      if (filterDomain.length > 0) {
        docsArray = docsArray.filter((d) =>
          d.domaine?.some((dom) => filterDomain.includes(dom))
        );
      }
      if (filterPriceMin != null) {
        docsArray = docsArray.filter((d) => Number(d.price) >= filterPriceMin);
      }
      if (filterPriceMax != null) {
        docsArray = docsArray.filter((d) => Number(d.price) <= filterPriceMax);
      }

      setDocuments(docsArray);
    } catch (err) {
      console.error("Erreur chargement documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [filterType, filterDomain, filterPriceMin, filterPriceMax]);

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allDomains = [
    "IT / Informatique",
    "Santé",
    "Agriculture",
    "Climat / Environnement",
    "Élevage / Animaux",
    "Finance / Banque",
    "Éducation / Formation",
    "Énergie / Énergies renouvelables",
    "Transport / Logistique",
    "Construction / BTP",
    "Commerce / Distribution",
    "Tourisme / Hôtellerie",
    "Arts / Culture",
    "Recherche / Développement",
    "Communication / Marketing",
    "Juridique / Droit",
    "Industrie / Manufacture",
    "Services / Administration"
  ];

  return (
    <>
      <main>
        <section className="hero section" style={{ padding: "40px" }}>
          <div className="container">
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Documents disponibles
            </h2>

            {/* FILTRES */}
            <Space direction="vertical" size="middle" style={{ width: "100%", marginBottom: 30, textAlign: "center" }}>
              <Select
                mode="multiple"
                placeholder="Filtrer par type de publication"
                style={{ width: 300 }}
                allowClear
                onChange={setFilterType}
              >
                <Option value="article">Article</Option>
                <Option value="rapport">Rapport</Option>
                <Option value="memoire">Mémoire</Option>
                <Option value="these">Thèse</Option>
                <Option value="projet">Projet</Option>
              </Select>

              <Select
                mode="multiple"
                placeholder="Filtrer par domaine"
                style={{ width: 300 }}
                allowClear
                onChange={setFilterDomain}
              >
                {allDomains.map((d, i) => (
                  <Option key={i} value={d}>{d}</Option>
                ))}
              </Select>

              <Space>
                <InputNumber
                  placeholder="Prix min"
                  onChange={setFilterPriceMin}
                  min={0}
                />
                <InputNumber
                  placeholder="Prix max"
                  onChange={setFilterPriceMax}
                  min={0}
                />
              </Space>
            </Space>

            {loading ? (
              <div style={{ textAlign: "center", marginTop: 100 }}>
                <Spin size="large" />
              </div>
            ) : documents.length === 0 ? (
              <Empty description="Aucun document disponible" />
            ) : (
              <Row gutter={[24, 24]}>
                {documents.map((doc) => {
                  const owner = usersMap[doc.userid] || { name: "Inconnu", phone: "-", email: "-" };
                  return (
                    <Col xs={24} sm={24} md={24} lg={24} key={doc.id}>
                      <Card
                        hoverable
                        style={{
                          borderRadius: 10,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          padding: 20,
                          overflow: "hidden",
                        }}
                      >
                        {/* Avatar */}
                        <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 20 }} />

                        {/* Info Document */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: 0 }}>{doc.file_name}</h3>
                          <Paragraph
                            ellipsis={{ rows: 3, expandable: true, symbol: "Voir plus" }}
                            style={{ border: "1px solid #d9d9d9", padding: "8px", borderRadius: 5 }}
                          >
                            {doc.description}
                          </Paragraph>
                          <p><strong>Prix :</strong> {doc.price || "Non spécifié"}</p>

                          <p>
                            <strong>Propriétaire :</strong> <span style={{ color: "blue" }}>{owner.name}</span><br />
                            <strong>Email :</strong> <span style={{ color: "red" }}>{owner.email}</span><br />
                            <strong>Téléphone :</strong> {owner.phone}
                          </p>

                          <div style={{ marginTop: 10 }}>
                            {(doc.publication_type || []).map((type, i) => (
                              <Tag key={i} color="purple">{type}</Tag>
                            ))}
                          </div>

                          <div style={{ marginTop: 10 }}>
                            {(doc.domaine || []).map((d, i) => (
                              <Tag key={i} color="blue">{d}</Tag>
                            ))}
                          </div>

                          <Space style={{ marginTop: 10 }}>
                            <Button
                              type="primary"
                              icon={<FilePdfOutlined />}
                              href={doc.link_pdf}
                              target="_blank"
                            >
                              Voir
                            </Button>

                            <Button
                              icon={<DownloadOutlined />}
                              onClick={() => handleDownload(doc.link_pdf, doc.file_name + ".pdf")}
                            >
                              Télécharger
                            </Button>
                          </Space>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}