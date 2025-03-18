
// import { Routes, Route, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanBarcodeTable from "./pages/ScanBarcodeTable";
import ShoppingCart from "./pages/ShoppingCart";
import NotFound from "./pages/NotFound";



function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/scan-barcode-table" element={<ScanBarcodeTable auth={{
          user: undefined
        }} />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  );
}

export default App;
