import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom"
import VerifyEmail from "./pages/VerifyEmail";

import Accueil from './pages/Accueil'
import Home from './pages/Home'
import Home2 from './pages/Home2'
import Home_Ajout from './pages/Home_Ajout'
import Connexion from './pages/Connexion'
import Enregistrement from './pages/Enregistrement'
import ProtectedRoute from "./components/ProtectedRoute";
import Home_Users from './pages/Home_Users'
import ResetPassword from "./pages/ResetPassword";
import Administration from "./pages/Administration";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/enregistrement" element={<Enregistrement />} />
        <Route path="/homeinsertion" element={<Home_Ajout />} />
        <Route path="/homeusers" element={<Home_Users />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/administration" element={<Administration />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home2 />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
