import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home2 from "../components/Header_Home2";

import {
  Form,
  Input,
  Button,
  message as antdMessage,
  Card,
  Select
} from "antd";

import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header_Home from "../components/Header_Home";

const { Option } = Select;
const { TextArea } = Input;

export default function Administration() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const onFinish = async (values) => {
    if (!user) {
      antdMessage.error("Utilisateur non connecté");
      return;
    }

    setLoading(true);

    try {
      const docId = Date.now().toString();

      await addDoc(collection(db, "competition"), {
        docId: docId,
        userid: user.uid,
        file_name: values.file_name,
        publication_type: values.publication_type,
        price: values.price,
        domaine: values.domaine,
        link_pdf: values.link_pdf,
        description: values.description,
        created_at: new Date()
      });

      antdMessage.success("Document ajouté avec succès");
      navigate("/administration");

    } catch (error) {
      console.error("Erreur ajout document:", error);
      antdMessage.error(error.message || "Erreur lors de l'ajout du document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Home />
      <main>
        <section className="hero section" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6">
                <Card
                  title="Ajouter un document"
                  style={{ maxWidth: 500, margin: "auto", borderRadius: "10px" }}
                >
                  <Form layout="vertical" onFinish={onFinish}>

                    <Form.Item
                      label="Nom du fichier"
                      name="file_name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nom du document" />
                    </Form.Item>

                    <Form.Item
                      label="Type de publication"
                      name="publication_type"
                      rules={[{ required: true }]}
                    >
                      <Select mode="multiple">
                        <Option value="article">Article</Option>
                        <Option value="rapport">Rapport</Option>
                        <Option value="memoire">Mémoire</Option>
                        <Option value="these">Thèse</Option>
                        <Option value="projet">Projet</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Prix"
                      name="price"
                      rules={[{ required: true, message: "Veuillez entrer le prix" }]}
                    >
                      <Input placeholder="Prix du document" />
                    </Form.Item>

                    <Form.Item
                      label="Lien PDF"
                      name="link_pdf"
                      rules={[{ required: true, message: "Veuillez entrer le lien du PDF" }]}
                    >
                      <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item
                      label="Domaine"
                      name="domaine"
                      rules={[{ required: true }]}
                    >
                      <Select mode="multiple" placeholder="Choisir domaine">
                        <Option value="it">IT / Informatique</Option>
                        <Option value="sante">Santé</Option>
                        <Option value="agriculture">Agriculture</Option>
                        <Option value="climat">Climat / Environnement</Option>
                        <Option value="elevage">Élevage / Animaux</Option>
                        <Option value="finance">Finance / Banque</Option>
                        <Option value="education">Éducation / Formation</Option>
                        <Option value="energie">Énergie / Énergies renouvelables</Option>
                        <Option value="transport">Transport / Logistique</Option>
                        <Option value="construction">Construction / BTP</Option>
                        <Option value="commerce">Commerce / Distribution</Option>
                        <Option value="tourisme">Tourisme / Hôtellerie</Option>
                        <Option value="arts">Arts / Culture</Option>
                        <Option value="recherche">Recherche / Développement</Option>
                        <Option value="communication">Communication / Marketing</Option>
                        <Option value="juridique">Juridique / Droit</Option>
                        <Option value="manufacture">Industrie / Manufacture</Option>
                        <Option value="services">Services / Administration</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[{ required: true }]}
                    >
                      <TextArea rows={4} maxLength={500} showCount placeholder="Description du document" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" block loading={loading}>
                        Ajouter le document
                      </Button>
                    </Form.Item>

                  </Form>
                </Card>
              </div>

              <div className="col-lg-6">
                <img src="/img/edu.png" alt="Hero" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}