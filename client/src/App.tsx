import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import AISummary from "./pages/AISummary";
import MentorshipProgram from "./pages/MentorshipProgram";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

function Layout({ token, setToken }: any) {

  const location = useLocation();

  const hideNavbarRoutes = ["/", "/signup"];

  const showNavbar = token && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/ai-summary" element={<AISummary />} />
        <Route path="/mentorship-program" element={<MentorshipProgram />} />
      </Routes>
    </>
  );
}

function App() {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      <Layout token={token} setToken={setToken} />
    </BrowserRouter>
  );
}

export default App;