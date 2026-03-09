import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header_Home2 from "../components/Header_Home2";

import {
  Form,
  Input,
  Button,
  message as antdMessage,
  Card,
  Select,
  Upload
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const { Option } = Select;
const { TextArea } = Input;

export default function Add_Documents() {

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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

    if (!file) {
      antdMessage.error("Veuillez sélectionner un fichier PDF");
      return;
    }

    if (!user) {
      antdMessage.error("Utilisateur non connecté");
      return;
    }

    setLoading(true);

    try {

      const docId = Date.now().toString();

      // Upload PDF
      // In your onFinish:
      const storageRef = ref(storage, `documents/${docId}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save Firestore metadata
      await addDoc(collection(db, "documents"), {
        docId: docId,
        userid: user.uid,
        file_name: values.file_name,
        publication_type: values.publication_type,
        statut: values.statut,
        doc_description: values.doc_description,
        domaine: values.domaine,
        pdf_url: downloadURL,
        created_at: new Date()
      });

      antdMessage.success("Document ajouté avec succès");

      navigate("/");

    } catch (error) {

      console.error("Upload error:", error);

      antdMessage.error(error.message || "Erreur lors de l'ajout du document");

    } finally {

      setLoading(false);

    }
  };

  const uploadProps = {
    beforeUpload: (file) => {

      if (file.type !== "application/pdf") {
        antdMessage.error("Seulement les fichiers PDF sont autorisés");
        return Upload.LIST_IGNORE;
      }

      setFile(file);
      return false;
    },
    maxCount: 1
  };

  return (
    <>
      <main>
        <section
          className="hero section"
          style={{ paddingRight: "20px", paddingLeft: "20px" }}
        >

          <div className="container">

            <div className="row align-items-center justify-content-center">

              <div className="col-lg-6">

                <Card
                  title="Ajouter un document"
                  style={{
                    maxWidth: 500,
                    margin: "auto",
                    borderRadius: "10px"
                  }}
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
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Statut"
                      name="statut"
                      rules={[{ required: true }]}
                    >
                      <Select>
                        <Option value="public">Public</Option>
                        <Option value="prive">Privé</Option>
                        <Option value="archive">Archivé</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Domaine"
                      name="domaine"
                      rules={[{ required: true }]}
                    >
                      <Select mode="multiple">
                        <Option value="it">IT</Option>
                        <Option value="sante">Santé</Option>
                        <Option value="agriculture">Agriculture</Option>
                        <Option value="climat">Climat</Option>
                        <Option value="elevage">Elevage</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Description"
                      name="doc_description"
                      rules={[{ required: true }]}
                    >
                      <TextArea rows={4} maxLength={300} showCount />
                    </Form.Item>

                    <Form.Item label="Fichier PDF">

                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>
                          Sélectionner un PDF
                        </Button>
                      </Upload>

                    </Form.Item>

                    <Form.Item>

                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                      >
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