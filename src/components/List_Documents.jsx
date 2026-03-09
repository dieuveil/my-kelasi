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
  Empty
} from "antd";

import {
  FilePdfOutlined,
  DownloadOutlined
} from "@ant-design/icons";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

export default function List_Documents() {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {

    try {

      const q = query(
        collection(db, "documents"),
        orderBy("created_at", "desc")
      );

      const querySnapshot = await getDocs(q);

      const docsArray = [];

      querySnapshot.forEach((doc) => {

        docsArray.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setDocuments(docsArray);

    } catch (error) {

      console.error("Error loading documents:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Download function
  const handleDownload = (url, filename) => {

    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  return (
    <>
      <main>
        <section
          className="hero section"
          style={{ padding: "40px" }}
        >

          <div className="container">

            <h2 style={{ textAlign: "center", marginBottom: 40 }}>
              Documents disponibles
            </h2>

            {loading ? (

              <div style={{ textAlign: "center", marginTop: 100 }}>
                <Spin size="large" />
              </div>

            ) : documents.length === 0 ? (

              <Empty description="Aucun document disponible" />

            ) : (

              <Row gutter={[24, 24]}>

                {documents.map((doc) => (

                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    key={doc.id}
                  >

                    <Card
                      hoverable
                      style={{
                        borderRadius: 10,
                        height: "100%"
                      }}
                      title={doc.file_name}
                    >

                      <p>
                        <strong>Description :</strong>
                        <br />
                        {doc.doc_description}
                      </p>

                      <p>
                        <strong>Statut :</strong>
                        <br />
                        <Tag
                          color={
                            doc.statut === "public"
                              ? "green"
                              : doc.statut === "prive"
                              ? "orange"
                              : "gray"
                          }
                        >
                          {doc.statut}
                        </Tag>
                      </p>

                      <p>
                        <strong>Type :</strong>
                      </p>

                      {(doc.publication_type || []).map((type, index) => (
                        <Tag key={index} color="purple">
                          {type}
                        </Tag>
                      ))}

                      <p style={{ marginTop: 10 }}>
                        <strong>Domaine :</strong>
                      </p>

                      {(doc.domaine || []).map((d, index) => (
                        <Tag key={index} color="blue">
                          {d}
                        </Tag>
                      ))}

                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          gap: "10px"
                        }}
                      >

                        <Button
                          type="primary"
                          icon={<FilePdfOutlined />}
                          href={doc.pdf_url}
                          target="_blank"
                          block
                        >
                          Voir
                        </Button>

                        <Button
                          icon={<DownloadOutlined />}
                          onClick={() =>
                            handleDownload(
                              doc.pdf_url,
                              doc.file_name + ".pdf"
                            )
                          }
                          block
                        >
                          Télécharger
                        </Button>

                      </div>

                    </Card>

                  </Col>

                ))}

              </Row>

            )}

          </div>

        </section>

      </main>
    </>
  );
}