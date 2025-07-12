import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import OfferLetter from "./pages/OfferLetter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview/:company" element={<Interview />} />
        <Route path="/offer-letter" element={<OfferLetter />} />
      </Routes>
    </Router>
  );
};

export default App;






