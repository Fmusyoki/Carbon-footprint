// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Community from "./pages/Community";
import ActionPlan from "./pages/ActionPlan";
import EcoCenter from "./pages/EcoCenter";
import LogIn from "./Auth/LogIn";
import SignUp from "./Auth/SignUp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/calculator" element={
            <ProtectedRoute>
              <Calculator />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/ecocenter" element={
            <ProtectedRoute>
              <EcoCenter />
            </ProtectedRoute>
          } />
          <Route path="/actionplan" element={
            <ProtectedRoute>
              <ActionPlan />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;