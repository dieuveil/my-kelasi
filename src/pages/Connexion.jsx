import React, { useState } from "react";
import Footer from "../components/Footer";
import Header_Connect from "../components/Header_Connect";

import { Form, Input, Button, message as antdMessage, Card } from "antd";
import { login } from "../authService"; // adjust the path if necessary
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    setLoading(true);

    try {
      console.log("Attempting login for:", email);

      const result = await login(email, password);
      console.log("Login result:", result);

      if (result && result.success) {
        antdMessage.success(`Welcome ${result.user.email}`);
        navigate("/"); // ✅ Redirect after successful login
      } else {
        const errorMsg = result?.error || "Email ou mot de passe incorrect";
        antdMessage.error(errorMsg);
      }
    } catch (error) {
      console.error("Login catch error:", error);
      antdMessage.error(error.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false); // ensures loading stops
    }
  };

  return (
    <>
      <Header_Connect />

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
                    title="Connexion"
                    style={{
                      maxWidth: 420,
                      margin: "auto",
                      borderRadius: "10px"
                    }}
                  >
                    <Form layout="vertical" onFinish={onFinish}>
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
                        label="Mot de passe"
                        name="password"
                        rules={[
                          { required: true, message: "Veuillez entrer votre mot de passe" }
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
                          Se connecter
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