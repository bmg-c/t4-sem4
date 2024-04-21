import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./CatalogPage";
import BlueRectangle2 from "./ShowCard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/show" element={<BlueRectangle2 />} />
      </Routes>
    </Router>
  );
}