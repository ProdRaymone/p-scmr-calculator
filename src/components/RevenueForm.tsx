
"use client";
import { RevenueInputs } from "@/lib/types";
import { REVENUE_LABELS } from "@/lib/constants";
import InputField from "./InputField";
import { TrendingUp } from "lucide-react";

interface Props {
  data: RevenueInputs;
  onChange: (data: RevenueInputs) => void;
}

export default function RevenueForm({ data, onChange }: Props) {
  const update = (key: keyof RevenueInputs, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="rounded-xl border border-border-primary bg-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-[rgba(39,166,68,0.15)]">
          <TrendingUp size={16} className="text-success" />
        </div>
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">收益端 Revenue</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(REVENUE_LABELS) as (keyof RevenueInputs)[]).map((key) => {
          const cfg = REVENUE_LABELS[key];
          return (
            <InputField
              key={key}
              label={cfg.label}
              value={data[key]}
              onChange={(v) => update(key, v)}
              unit={cfg.unit}
              tooltip={cfg.tooltip}
              min={key === "delta" ? 0 : undefined}
              max={key === "delta" ? 1 : undefined}
              step={key === "delta" ? 0.05 : key === "hourly_rate" ? 1 : 0.01}
            />
          );
        })}
      </div>
    </div>
  );
}
