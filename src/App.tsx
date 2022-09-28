import "./App.css";
import "../dist/output.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Exo1 from "./components/Exo_1/index";
import Exo2 from "./components/Exo_2/index";
import Exo3 from "./components/Exo_3/index";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul className="nav">
            <li className="mb-3">
              <Link to="/exo1">Ex 1 : Company & Offices</Link>
            </li>
            <li className="mb-3">
              <Link to="/exo2">Ex 2 : Receipts CRUD</Link>
            </li>
            <li>
              <Link to="/exo3">Ex 3 : Read Article</Link>
            </li>
          </ul>
        </nav>
        <hr className="my-8"></hr>
      </div>
      <Routes>
        <Route path="/exo1" element={<Exo1 />} />
        <Route path="/exo2" element={<Exo2 />} />
        <Route path="/exo3" element={<Exo3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
