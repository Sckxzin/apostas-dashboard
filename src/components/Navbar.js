import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#111", color: "#fff" }}>
      
      <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
      <Link to="/apostas" style={{ color: "#fff" }}>Apostas</Link>
      <Link to="/nova" style={{ color: "#fff" }}>Nova Aposta</Link>
      <Link to="/relatorio" style={{ color: "#fff"}}>Relatorios</Link>      

    </div>
  );
}