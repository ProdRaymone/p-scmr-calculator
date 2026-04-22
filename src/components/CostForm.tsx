
"use client";
import { CostInputs } from "@/lib/types";
import { COST_LABELS } from "@/lib/constants";
import InputField from "./InputField";
import { TrendingDown } from "lucide-react";

interface Props {
  data: CostInputs;
  onChange: (data: CostInputs) => void;
}

export default function CostForm({ data, onChange }: Props) {
  const update = (key: keyof CostInputs, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="rounded-xl border border-border-primary bg-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-[rgba(239,68,68,0.15)]">
          <TrendingDown size={16} className="text-danger" />
        </div>
        <h2 className="text-sm font-semibold text-text-primary tracking-wide">成本端 Cost</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(COST_LABELS) as (keyof CostInputs)[]).map((key) => {
          const cfg = COST_LABELS[key];
          return (
            <InputField
              key={key}
              label={cfg.label}
              value={data[key]}
              onChange={(v) => update(key, v)}
              unit={cfg.unit}
              tooltip={cfg.tooltip}
              step={key === "c_token" ? 0.01 : 0.5}
            />
          );
        })}
      </div>
    </div>
  );
}
