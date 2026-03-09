import React, { useEffect, useState } from "react";
import { Button, Card, Typography, message, Spin } from "antd";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check email verification status every 5 seconds
    const interval = setInterval(async () => {
      await user.reload(); // reload user data
      if (user.emailVerified) {
        setVerified(true);
        clearInterval(interval);
        message.success("Email vérifié avec succès !");
        setTimeout(() => navigate("/home"), 1500); // auto redirect after 1.5s
      }
      setChecking(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleResend = async () => {
    try {
      setLoading(true);
      await sendEmailVerification(user);
      message.success("Email de vérification renvoyé !");
    } catch (error) {
      console.error(error);
      message.error("Erreur lors de l'envoi de l'email");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        title="Vérification de l'email"
        style={{ maxWidth: 500, width: "100%", textAlign: "center", borderRadius: 10 }}
      >
        <Title level={4}>Merci de vérifier votre email !</Title>
        <Text>
          Un email de vérification a été envoyé à : <br />
          <b>{user.email}</b>
        </Text>

        <div style={{ margin: "20px 0" }}>
          {checking && !verified ? (
            <Spin tip="Vérification en cours..." />
          ) : verified ? (
            <Text type="success">Email vérifié avec succès ! Redirection...</Text>
          ) : (
            <Text type="secondary">Cliquez ci-dessous si vous n'avez pas reçu l'email.</Text>
          )}
        </div>

        <Button
          type="primary"
          onClick={handleResend}
          loading={loading}
          style={{ marginTop: 10 }}
        >
          Renvoyer l'email de vérification
        </Button>
      </Card>
    </div>
  );
}