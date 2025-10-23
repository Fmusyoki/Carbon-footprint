import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Community from "./pages/Community";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator/>} />
        <Route path="/community" element={<Community/>} />
      </Routes>
    </Router>
  );
}

export default App;
