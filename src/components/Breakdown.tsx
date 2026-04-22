
"use client";
import { RevenueBreakdown, CostBreakdown } from "@/lib/types";

interface BarItem {
  label: string;
  value: number;
  color: string;
}

function BreakdownBar({ items, total, title }: { items: BarItem[]; total: number; title: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-xs font-semibold text-text-muted tracking-wide uppercase">{title}</h3>
        <span className="text-sm font-mono text-text-primary">${total.toFixed(2)}</span>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-text-muted">{item.label}</span>
                <span className="font-mono text-text-secondary">${item.value.toFixed(2)}</span>
              </div>
              <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  revenue: RevenueBreakdown;
  cost: CostBreakdown;
  rTotal: number;
  cTotal: number;
}

export default function Breakdown({ revenue, cost, rTotal, cTotal }: Props) {
  const revenueItems: BarItem[] = [
    { label: "直接收入", value: revenue.r_direct, color: "#27a644" },
    { label: "时间节省", value: revenue.r_time, color: "#34d058" },
    { label: "资产增值", value: revenue.r_asset, color: "#4ae168" },
    { label: "质量溢价", value: revenue.r_quality, color: "#85e89d" },
    { label: "协同收益", value: revenue.r_synergy, color: "#a8f0b8" },
  ];

  const costItems: BarItem[] = [
    { label: "Token费用", value: cost.c_token, color: "#ef4444" },
    { label: "人工成本", value: cost.c_human, color: "#f97316" },
    { label: "基础设施", value: cost.c_infra, color: "#f59e0b" },
    { label: "漂移成本", value: cost.c_drift, color: "#fb923c" },
    { label: "机会成本", value: cost.c_opportunity, color: "#fbbf24" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      <BreakdownBar items={revenueItems} total={rTotal} title="收益分解" />
      <BreakdownBar items={costItems} total={cTotal} title="成本分解" />
    </div>
  );
}
