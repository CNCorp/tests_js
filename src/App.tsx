import "./App.css";
import '../dist/output.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Exo1 from "./components/Exo_1/index";
import Exo2 from "./components/Exo_2/index";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul className="nav">
            <li>
              <Link to="/exo1">Exo 1 : Compagnie et Bureaux</Link>
            </li>
            <li>
              <Link to="/exo2">Exo 2 : Tickets de caisse</Link>
            </li>
            <li></li>
            <li></li>
          </ul>
        </nav>
        <hr></hr>
      </div>
      <Routes>
        <Route path="/exo1" element={<Exo1 />} />
        <Route path="/exo2" element={<Exo2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;