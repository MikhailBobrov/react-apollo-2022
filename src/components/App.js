import { Routes, Route, Link } from "react-router-dom";
import { Details } from "../routes/Details";
import { Home } from "../routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
