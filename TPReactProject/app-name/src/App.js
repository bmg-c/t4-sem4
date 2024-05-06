import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogPage from "./CatalogPage";
import ProductDetails from "./ProductDetails";
import CatalogPageAuth from "./CatalogAuth";
import Auth from "./Auth";
import Percacc from "./PersAcc"
import ProductDetailsAuth from "./ProductDetailsAuth";
//import RegistrationForm from "./FullRegistr";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/catalog" element={<CatalogPageAuth />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/percacc" element={<Percacc/>} />
        <Route path="/productauth/:id" element={<ProductDetailsAuth/>}/>
      </Routes>
    </Router>
  );
}
