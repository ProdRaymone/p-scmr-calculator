
import { HistoryEntry, RevenueInputs, CostInputs, ThresholdParams } from "./types";
import { calculatePSCMR, calculateKappaPersonal } from "./calculator";
import { DEFAULT_THRESHOLD } from "./constants";

const HEADERS = [
  "日期", "直接收入", "节省时间h", "时薪", "资产增值", "置信度",
  "质量溢价", "协同收益", "Token费", "人工h", "基础设施", "漂移h",
  "机会成本h", "P-SCMR", "评级"
];

export function exportToCSV(entries: HistoryEntry[]): string {
  const rows = entries.map((e) => [
    e.date.slice(0, 10),
    e.revenue.r_direct,
    e.revenue.r_time_hours,
    e.revenue.hourly_rate,
    e.revenue.r_asset,
    e.revenue.delta,
    e.revenue.r_quality,
    e.revenue.r_synergy,
    e.cost.c_token,
    e.cost.c_human_hours,
    e.cost.c_infra,
    e.cost.c_drift_hours,
    e.cost.c_opportunity_hours,
    e.result.pscmr.toFixed(4),
    e.result.rating,
  ]);

  return [HEADERS.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseCSV(text: string): HistoryEntry[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  return lines.slice(1).map((line, i) => {
    const cols = line.split(",");
    if (cols.length < 13) throw new Error(`Row ${i + 2}: expected ≥13 columns, got ${cols.length}`);

    const revenue: RevenueInputs = {
      r_direct: parseFloat(cols[1]) || 0,
      r_time_hours: parseFloat(cols[2]) || 0,
      hourly_rate: parseFloat(cols[3]) || 40,
      r_asset: parseFloat(cols[4]) || 0,
      delta: parseFloat(cols[5]) || 0.3,
      r_quality: parseFloat(cols[6]) || 0,
      r_synergy: parseFloat(cols[7]) || 0,
    };

    const cost: CostInputs = {
      c_token: parseFloat(cols[8]) || 0,
      c_human_hours: parseFloat(cols[9]) || 0,
      c_infra: parseFloat(cols[10]) || 0,
      c_drift_hours: parseFloat(cols[11]) || 0,
      c_opportunity_hours: parseFloat(cols[12]) || 0,
    };

    const threshold = DEFAULT_THRESHOLD;
    const kappa = calculateKappaPersonal(threshold);
    const result = calculatePSCMR(revenue, cost, kappa);

    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) + i,
      date: cols[0] || new Date().toISOString(),
      revenue,
      cost,
      threshold,
      result,
    };
  });
}
