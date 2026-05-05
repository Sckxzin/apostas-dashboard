import { useEffect, useState } from "react";
import supabase from "../api/supabase";

export default function Apostas() {
  const [apostas, setApostas] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  async function buscar() {
    const { data } = await supabase
      .from("apostas")
      .select("*")
      .order("created_at", { ascending: false });

    setApostas(data || []);
  }

  async function atualizar(id, resultado) {
    await supabase
      .from("apostas")
      .update({ resultado })
      .eq("id", id);

    buscar();
  }

  return (
    <div>
      <h1>Apostas</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Jogo</th>
            <th>Mercado</th>
            <th>Odd</th>
            <th>Stake</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {apostas.map((a) => (
            <tr key={a.id}>
              <td>{a.jogo}</td>
              <td>{a.mercado}</td>
              <td>{a.odd}</td>
              <td>{a.stake}</td>
              <td>{a.resultado}</td>

              <td>
                <button onClick={() => atualizar(a.id, "GREEN")}>
                  GREEN
                </button>

                <button onClick={() => atualizar(a.id, "RED")}>
                  RED
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}