import React, { useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Header_Registre from "../components/Header_Registre";
import Feature from "../components/Feature";

import { Form, Input, Button, message, Card, Select } from "antd";
import { signup } from "../authService";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

export default function Enregistrement() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {

    const {
      name,
      email,
      phone,
      statut,
      interet,
      domaine,
      description,
      password
    } = values;

    setLoading(true);

    try {

       const result = await signup(email, password);
        console.log("Signup result:", result); // 🔍 log to debug

        if (!result.success || !result.user) {
            throw new Error(result.error || "Signup failed");
        }

        const uid = result.user.uid;
        console.log("User UID:", uid);

        await setDoc(doc(db, "users", uid), {
            id: uid,
            name,
            email,
            phone,
            statut: statut || [],
            interet: interet || [],
            domaine: domaine || [],
            description: description || "",
            createdAt: new Date()
        });

        message.success("Compte créé avec succès !");
        navigate("/");
    } catch (error) {
        console.error("Signup error details:", error);
        message.error(`Erreur lors de la création du compte: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <>
      <Header_Registre />

      <main className="main" style={{ marginRight: "60px", marginLeft: "60px" }}>
        <section
          id="hero"
          className="hero section"
          style={{ paddingRight: "20px", paddingLeft: "20px" }}
        >
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center justify-content-center">

              {/* LEFT COLUMN : FORM */}
              <div className="col-lg-6">
                <div data-aos="fade-up" data-aos-delay={200}>

                  <Card
                    title="Créer un compte"
                    style={{
                      maxWidth: 420,
                      margin: "auto",
                      borderRadius: "10px"
                    }}
                  >

                    <Form layout="vertical" onFinish={onFinish}>

                      <Form.Item
                        label="Nom"
                        name="name"
                        rules={[
                          { required: true, message: "Veuillez entrer votre nom" }
                        ]}
                      >
                        <Input placeholder="Votre nom" />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Veuillez entrer votre email" },
                          { type: "email", message: "Email invalide" }
                        ]}
                      >
                        <Input placeholder="Votre email" />
                      </Form.Item>

                      <Form.Item
                        label="Téléphone"
                        name="phone"
                        rules={[
                          { required: true, message: "Veuillez entrer votre téléphone" }
                        ]}
                      >
                        <Input placeholder="Votre téléphone" />
                      </Form.Item>

                      <Form.Item
                        label="Statut"
                        name="statut"
                      >
                        <Select mode="multiple" placeholder="Choisir statut">
                          <Option value="etudiant">Étudiant</Option>
                          <Option value="professionnel">Professionnel</Option>
                          <Option value="entrepreneur">Entrepreneur</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Intérêt"
                        name="interet"
                      >
                        <Select mode="multiple" placeholder="Choisir intérêt">
                          <Option value="innovation">Innovation</Option>
                          <Option value="technologie">Technologie</Option>
                          <Option value="formation">Formation</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Domaine"
                        name="domaine"
                      >
                        <Select mode="multiple" placeholder="Choisir domaine">
                          <Option value="it">IT</Option>
                          <Option value="sante">Santé</Option>
                          <Option value="agriculture">Agriculture</Option>
                          <Option value="climat">Climat</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        name="description"
                      >
                        <TextArea
                          rows={4}
                          placeholder="Parlez un peu de vous, vos intérêts ou votre activité..."
                        />
                      </Form.Item>

                      <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[
                          { required: true, message: "Veuillez entrer votre mot de passe" },
                          { min: 6, message: "Minimum 6 caractères" }
                        ]}
                      >
                        <Input.Password placeholder="Votre mot de passe" />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={loading}
                        >
                          Créer un compte
                        </Button>
                      </Form.Item>

                    </Form>

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

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



