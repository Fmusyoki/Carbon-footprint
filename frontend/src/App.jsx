import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Community from "./pages/Community";
import ActionPlan from "./pages/ActionPlan";
import EcoCenter from "./pages/EcoCenter";
import LogIn from "./Auth/LogIn";
import SignUp from "./Auth/SignUp";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/ecocenter" element={<EcoCenter/>} />
          <Route path="/actionplan" element={<ActionPlan/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
    </Router>
  );
}

export default App;
