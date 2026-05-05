import { useState } from "react";
import supabase from "../api/supabase";

export default function NovaAposta() {
  const [form, setForm] = useState({
    esporte: "",
    liga: "",
    jogo: "",
    mercado: "",
    selecao: "",
    odd: "",
    stake: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

 async function salvar() {
  const { error } = await supabase.from("apostas").insert([
    {
      esporte: form.esporte,
      liga: form.liga,
      jogo: form.jogo,
      mercado: form.mercado,
      selecao: form.selecao,
      odd: Number(form.odd),
      stake: Number(form.stake),
      resultado: "PENDENTE",
      data_aposta: new Date().toISOString().split("T")[0]
    }
  ]);

  if (error) {
    console.log(error);
    alert("Erro ao salvar");
  } else {
    alert("Aposta salva!");
  }
}
  return (
    <div>
      <h1>Nova Aposta</h1>

      <input name="esporte" placeholder="Esporte" onChange={handleChange} />
      <input name="liga" placeholder="Liga" onChange={handleChange} />
      <input name="jogo" placeholder="Jogo" onChange={handleChange} />
      <input name="mercado" placeholder="Mercado" onChange={handleChange} />
      <input name="selecao" placeholder="Seleção" onChange={handleChange} />
      <input name="odd" placeholder="Odd" onChange={handleChange} />
      <input name="stake" placeholder="Stake" onChange={handleChange} />

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}