import { useEffect, useState } from "react";
import supabase from "../api/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Dashboard() {
  const [apostas, setApostas] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase.from("apostas").select("*");
    setApostas(data || []);
  }

  // 🔥 MÉTRICAS
  const total = apostas.length;
  const totalInvestido = apostas.reduce((a, b) => a + Number(b.stake), 0);
  const lucro = apostas.reduce((a, b) => a + Number(b.lucro || 0), 0);
  const greens = apostas.filter(a => a.resultado === "GREEN").length;
  const reds = apostas.filter(a => a.resultado === "RED").length;

  const winrate = total > 0 ? (greens / total) * 100 : 0;
  const roi = totalInvestido > 0 ? (lucro / totalInvestido) * 100 : 0;

  // 📈 EVOLUÇÃO BANCA
  let banca = 0;
  const evolucao = apostas.map(a => {
    banca += Number(a.lucro || 0);
    return {
      data: a.data_aposta,
      banca
    };
  });

  // 📊 POR MERCADO
  const mercados = {};
  apostas.forEach(a => {
    if (!mercados[a.mercado]) mercados[a.mercado] = 0;
    mercados[a.mercado]++;
  });

  const dadosMercado = Object.keys(mercados).map(k => ({
    name: k,
    value: mercados[k]
  }));

  // 📊 POR LIGA
  const ligas = {};
  apostas.forEach(a => {
    if (!ligas[a.liga]) ligas[a.liga] = 0;
    ligas[a.liga] += Number(a.lucro || 0);
  });

  const dadosLiga = Object.keys(ligas).map(k => ({
    liga: k,
    lucro: ligas[k]
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>💰 Lucro: R$ {lucro.toFixed(2)}</div>
        <div>📈 ROI: {roi.toFixed(2)}%</div>
        <div>🎯 Winrate: {winrate.toFixed(2)}%</div>
        <div>📊 Apostas: {total}</div>
        <div>💵 Investido: R$ {totalInvestido}</div>
      </div>

      {/* GRÁFICO BANCA */}
      <h3>Evolução da banca</h3>
      <LineChart width={600} height={300} data={evolucao}>
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="banca" />
      </LineChart>

      {/* GRÁFICO LIGA */}
      <h3>Lucro por liga</h3>
      <BarChart width={600} height={300} data={dadosLiga}>
        <XAxis dataKey="liga" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="lucro" />
      </BarChart>

      {/* GRÁFICO MERCADO */}
      <h3>Distribuição por mercado</h3>
      <PieChart width={400} height={300}>
        <Pie data={dadosMercado} dataKey="value" nameKey="name">
          {dadosMercado.map((_, i) => (
            <Cell key={i} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}