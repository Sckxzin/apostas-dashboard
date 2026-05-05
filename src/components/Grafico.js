import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function Grafico({ data }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="data_aposta" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="banca" />
    </LineChart>
  );
}