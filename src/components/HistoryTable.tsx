
"use client";
import { HistoryEntry } from "@/lib/types";
import { RATING_CONFIG } from "@/lib/constants";
import { Trash2 } from "lucide-react";

interface Props {
  history: HistoryEntry[];
  onDelete: (id: string) => void;
}

export default function HistoryTable({ history, onDelete }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="rounded-xl border border-border-primary bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border-primary bg-elevated/50">
              <th className="px-3 py-2 text-left text-text-dim font-medium">日期</th>
              <th className="px-3 py-2 text-right text-text-dim font-medium">P-SCMR</th>
              <th className="px-3 py-2 text-center text-text-dim font-medium">评级</th>
              <th className="px-3 py-2 text-right text-text-dim font-medium">收益</th>
              <th className="px-3 py-2 text-right text-text-dim font-medium">成本</th>
              <th className="px-3 py-2 text-center text-text-dim font-medium">健康</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((entry) => {
              const cfg = RATING_CONFIG[entry.result.rating];
              const d = new Date(entry.date);
              return (
                <tr key={entry.id} className="border-b border-border-primary/50 hover:bg-elevated/30 transition-colors">
                  <td className="px-3 py-2 text-text-muted font-mono">
                    {d.getFullYear()}-{String(d.getMonth()+1).padStart(2,"0")}-{String(d.getDate()).padStart(2,"0")}
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-semibold" style={{ color: cfg.color }}>
                    {entry.result.pscmr.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                      style={{ color: cfg.color, backgroundColor: cfg.bgColor }}
                    >
                      {entry.result.rating}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-success">
                    ${entry.result.totalRevenue.toFixed(0)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-danger">
                    ${entry.result.totalCost.toFixed(0)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {entry.result.isHealthy ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <span className="text-danger">✗</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-text-dim hover:text-danger transition-colors p-1"
                      title="删除"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
