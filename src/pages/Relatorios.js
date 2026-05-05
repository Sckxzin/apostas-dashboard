import { useEffect, useState } from "react";
import supabase from "../api/supabase";

export default function Relatorios() {
  const [mercados, setMercados] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .rpc("mercado_lucro"); // vamos criar depois

    setMercados(data || []);
  }

  return (
    <div>
      <h1>Relatórios</h1>

      {mercados.map((m, i) => (
        <div key={i}>
          {m.mercado} → R$ {m.lucro}
        </div>
      ))}
    </div>
  );
}