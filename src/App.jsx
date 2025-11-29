import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SelectInterview from "./pages/SelectInterview";
import ReviewPage from "./pages/ReviewPage";


export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* Navbar appears only when logged in */}
      {<Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Interview page */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-interview"
          element={
            <ProtectedRoute>
              <SelectInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
