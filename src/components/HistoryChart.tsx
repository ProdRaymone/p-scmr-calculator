
"use client";
import { HistoryEntry } from "@/lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  history: HistoryEntry[];
  kappa: number;
}

export default function HistoryChart({ history, kappa }: Props) {
  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-border-primary bg-surface p-8 text-center">
        <BarChart3 size={32} className="mx-auto text-text-dim mb-2" />
        <p className="text-sm text-text-muted">暂无历史数据</p>
        <p className="text-xs text-text-dim mt-1">计算一次结果并保存后，趋势图将在这里出现</p>
      </div>
    );
  }

  const labels = history.map((h) => {
    const d = new Date(h.date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "P-SCMR",
        data: history.map((h) => h.result.pscmr),
        borderColor: "#7170ff",
        backgroundColor: "rgba(113,112,255,0.1)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#7170ff",
        pointBorderColor: "#0d0d11",
        pointBorderWidth: 2,
      },
      {
        label: "κ 临界线",
        data: history.map(() => kappa),
        borderColor: "#f0b429",
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#8b8fa3", font: { size: 11 } },
      },
      tooltip: {
        backgroundColor: "#1a1a24",
        titleColor: "#e2e4f0",
        bodyColor: "#a0a3bd",
        borderColor: "#2a2a3a",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#4a4a6a" },
        grid: { color: "rgba(74,74,106,0.15)" },
      },
      y: {
        ticks: { color: "#4a4a6a" },
        grid: { color: "rgba(74,74,106,0.15)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="rounded-xl border border-border-primary bg-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={16} className="text-accent" />
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">趋势追踪</h2>
        <span className="text-xs text-text-dim ml-auto">{history.length} 条记录</span>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
