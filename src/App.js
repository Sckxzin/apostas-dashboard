import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NovaAposta from "./pages/Novaaposta";
import Apostas from "./pages/Apostas";
import Relatorios from "./pages/Relatorios"
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apostas" element={<Apostas />} />
        <Route path="/nova" element={<NovaAposta />} />
        <Route path="/relatorio" element={<Relatorios />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;