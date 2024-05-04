import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BigCard from "./ShowCard";
import CatalogPage from "./CatalogPage";
//import Registr from "./Registr";
//import Auth from "./Auth";
//import Percacc from "./PersAcc"
//import RegistrationForm from "./FullRegistr";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<BigCard />} /> 
      </Routes>
    </Router>
  );
}
