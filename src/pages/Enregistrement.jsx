import React, { useState } from "react";
import Footer from "../components/Footer";
import Header_Registre from "../components/Header_Registre";

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
      password,
      location
    } = values;

    setLoading(true);

    try {
       const result = await signup(email, password);
       console.log("Signup result:", result);

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
           location: location || "",
           description: description || "",
           createdAt: new Date()
       });

       message.success("Compte créé avec succès !");
       navigate("/verify-email");
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
                      maxWidth: 500,
                      margin: "auto",
                      borderRadius: "10px"
                    }}
                  >

                    <Form layout="vertical" onFinish={onFinish}>

                      {/* Nom */}
                      <Form.Item
                        label="Nom"
                        name="name"
                        rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
                      >
                        <Input placeholder="Votre nom" />
                      </Form.Item>

                      {/* Email */}
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

                      {/* Téléphone */}
                      <Form.Item
                        label="Téléphone"
                        name="phone"
                        rules={[{ required: true, message: "Veuillez entrer votre téléphone" }]}
                      >
                        <Input placeholder="Votre téléphone" />
                      </Form.Item>

                      {/* Statut */}
                      <Form.Item
                        label="Statut"
                        name="statut"
                      >
                        <Select mode="multiple" placeholder="Choisir statut">
                          <Option value="Étudiant">Étudiant</Option>
                          <Option value="Professionnel">Professionnel</Option>
                          <Option value="Entrepreneur">Entrepreneur</Option>
                          <Option value="Enseignant Chercheur">Enseignant Chercheur</Option>
                        </Select>
                      </Form.Item>

                      {/* Intérêts */}
                     <Form.Item
                        label="Intérêt"
                        name="interet"
                      >
                        <Select mode="multiple" placeholder="Choisir intérêt">
                          
                          {/* Collaboration académique */}
                          <Select.OptGroup label="Collaboration académique">
                            <Option value="Mentorat">Mentorat</Option>
                            <Option value="Projets et stages">Projets et stages</Option>
                            <Option value="Compétitions">Compétitions / Concours</Option>
                            <Option value="Recherche académique">Recherche académique</Option>
                            <Option value="Publication scientifique">Publication scientifique</Option>
                            <Option value="Pédagogie">Pédagogie</Option>
                            <Option value="Échanges académiques">Échanges académiques</Option>
                            <Option value="Workshops pratiques">Workshops pratiques</Option>
                            <Option value="Supervision de projets étudiants">Supervision de projets étudiants</Option>
                          </Select.OptGroup>

                          {/* Innovation et technologie */}
                          <Select.OptGroup label="Innovation et technologie">
                            <Option value="Innovation">Innovation</Option>
                            <Option value="Technologie">Technologie</Option>
                            <Option value="Transformation digitale">Transformation digitale</Option>
                            <Option value="Intelligence artificielle / Data science">Intelligence artificielle / Data science</Option>
                            <Option value="Développement durable">Développement durable</Option>
                            <Option value="Veille technologique">Veille technologique</Option>
                            <Option value="Open innovation / R&D collaborative">Open innovation / R&D collaborative</Option>
                            <Option value="Innovation disruptive">Innovation disruptive</Option>
                          </Select.OptGroup>

                          {/* Entrepreneuriat et business */}
                          <Select.OptGroup label="Entrepreneuriat et business">
                            <Option value="Startups">Startups / Création d’entreprise</Option>
                            <Option value="Levée de fonds">Levée de fonds</Option>
                            <Option value="Management">Management / Leadership</Option>
                            <Option value="Business development">Business development</Option>
                            <Option value="Networking">Networking / Réseautage</Option>
                            <Option value="Marketing & Ventes">Marketing & Ventes</Option>
                            <Option value="Investissement">Investissement</Option>
                            <Option value="Partenariat">Partenariat</Option>
                          </Select.OptGroup>

                          {/* Formation et développement personnel */}
                          <Select.OptGroup label="Formation et développement">
                            <Option value="Formation">Formation</Option>
                          </Select.OptGroup>

                        </Select>
                      </Form.Item>

                      {/* Domaine */}
                      <Form.Item
                        label="Domaine"
                        name="domaine"
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

                      {/* Localisation Afrique Centrale */}
                      <Form.Item
                        label="Localisation"
                        name="location"
                        rules={[{ required: true, message: "Veuillez choisir votre localisation" }]}
                      >
                        <Select placeholder="Choisir pays et ville">

                          {/* Congo Brazzaville */}
                          <Option value="congo-brazzaville-brazzaville">Congo Brazzaville - Brazzaville</Option>
                          <Option value="congo-brazzaville-pointe-noire">Congo Brazzaville - Pointe-Noire</Option>

                          {/* Gabon */}
                          <Option value="gabon-librevillle">Gabon - Libreville</Option>
                          <Option value="gabon-port-gentil">Gabon - Port-Gentil</Option>

                          {/* Tchad */}
                          <Option value="tchad-n-djamena">Tchad - N’Djamena</Option>
                          <Option value="tchad-moundou">Tchad - Moundou</Option>

                          {/* Cameroun */}
                          <Option value="cameroun-yaounde">Cameroun - Yaoundé</Option>
                          <Option value="cameroun-douala">Cameroun - Douala</Option>

                          {/* République Démocratique du Congo */}
                          <Option value="rdc-kinshasa">RDC - Kinshasa</Option>
                          <Option value="rdc-lubumbashi">RDC - Lubumbashi</Option>

                          {/* Centrafrique */}
                          <Option value="centrafrique-bangui">Centrafrique - Bangui</Option>
                          <Option value="centrafrique-bimbo">Centrafrique - Bimbo</Option>

                          {/* Guinée équatoriale */}
                          <Option value="guinee-equatoriale-malabo">Guinée Équatoriale - Malabo</Option>
                          <Option value="guinee-equatoriale-bata">Guinée Équatoriale - Bata</Option>
                        </Select>
                      </Form.Item>

                      {/* Description */}
                      <Form.Item
                        label="Description"
                        name="description"
                      >
                        <TextArea
                          rows={4}
                          placeholder="Parlez un peu de vous, vos intérêts ou votre activité..."
                        />
                      </Form.Item>

                      {/* Mot de passe */}
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

                      {/* Bouton */}
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



