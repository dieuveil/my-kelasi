// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a spinner while checking auth
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuth) {
    // Redirect unauthenticated users
    return <Navigate to="/" replace />;
  }

  // Render the protected page
  return children;
}