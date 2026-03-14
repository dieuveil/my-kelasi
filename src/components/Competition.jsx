import React, { useState, useEffect } from "react";
import { Card, Button, Avatar, Typography, Row, Col, message, Spin, Tag, Space } from "antd";
import { UserOutlined, LikeOutlined, DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { db } from "../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const { Paragraph, Text } = Typography;

export default function Competition() {

  const [projects, setProjects] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState({});

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      try {

        // documents
        const querySnapshot = await getDocs(collection(db, "competition"));
        const allDocs = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        const projectsDocs = allDocs.filter((d) => d.publication_type?.includes("projet"));

        const processedProjects = projectsDocs.map((p) => ({
          ...p,
          votes: p.votes || [],
        }));

        setProjects(processedProjects);

        // users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const map = {};

        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          map[data.id] = {
            name: data.name,
            email: data.email,
            phone: data.phone
          };
        });

        setUsersMap(map);

      } catch (error) {

        console.error(error);
        message.error("Erreur lors du chargement des projets");

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const handleDownload = (url, filename) => {

    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  const handleVote = async (projectId) => {

    if (!currentUser) {
      message.error("Vous devez être connecté pour voter");
      return;
    }

    setVoting((prev) => ({ ...prev, [projectId]: true }));

    try {

      const project = projects.find((p) => p.id === projectId);

      if (project.votes.includes(currentUser.uid)) {
        message.warning("Vous avez déjà voté pour ce projet !");
        setVoting((prev) => ({ ...prev, [projectId]: false }));
        return;
      }

      const projectRef = doc(db, "competition", projectId);
      const updatedVotes = [...project.votes, currentUser.uid];

      await updateDoc(projectRef, { votes: updatedVotes });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, votes: updatedVotes } : p
        )
      );

      message.success("Vote enregistré !");

    } catch (error) {

      console.error(error);
      message.error("Erreur lors du vote");

    } finally {

      setVoting((prev) => ({ ...prev, [projectId]: false }));

    }

  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        Aucun projet disponible
      </p>
    );
  }

  return (

    <Row gutter={[16, 16]} style={{ padding: 20, justifyContent: "center" }}>

      {projects.map((project) => {

        const owner = usersMap[project.userid] || {
          name: "Inconnu",
          email: "-",
          phone: "-"
        };

        return (

          <Col key={project.id} xs={24} sm={12} md={8}>

            <Card
              hoverable
              style={{ borderRadius: 10, textAlign: "center" }}
              title={project.file_name}
            >

              <Avatar
                size={70}
                icon={<UserOutlined />}
                style={{ marginBottom: 10 }}
              />

              <div style={{ marginBottom: 10 }}>

                <Text style={{ color: "blue", fontWeight: "bold" }}>
                  {owner.name}
                </Text>

                <br />

                <Text style={{ color: "red" }}>
                  {owner.email}
                </Text>

                <br />

                <Text>
                  {owner.phone}
                </Text>

              </div>

              <Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: "Voir plus" }}
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "8px",
                  borderRadius: 5
                }}
              >
                {project.description || "-"}
              </Paragraph>

              <p>
                <strong>Prix :</strong> {project.price || "Non spécifié"}
              </p>

              <div style={{ marginTop: 8 }}>
                {project.publication_type?.map((t, i) => (
                  <Tag key={i} color="purple">{t}</Tag>
                ))}
              </div>

              <div style={{ marginTop: 8 }}>
                {project.domaine?.map((d, index) => (
                  <Tag key={index} color="blue">{d}</Tag>
                ))}
              </div>

              <Space style={{ marginTop: 15 }}>

                <Button
                  type="primary"
                  icon={<FilePdfOutlined />}
                  href={project.link_pdf}
                  target="_blank"
                >
                  Voir
                </Button>

                <Button
                  icon={<DownloadOutlined />}
                  onClick={() =>
                    handleDownload(project.link_pdf, project.file_name + ".pdf")
                  }
                >
                  Télécharger
                </Button>

              </Space>

              <Button
                type="primary"
                icon={<LikeOutlined />}
                onClick={() => handleVote(project.id)}
                disabled={voting[project.id] || project.votes?.includes(currentUser?.uid)}
                block
                style={{ marginTop: 15 }}
              >
                Voter ({project.votes?.length || 0})
              </Button>

            </Card>

          </Col>

        );

      })}

    </Row>

  );

}