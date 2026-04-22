
"use client";
import { ThresholdParams } from "@/lib/types";
import InputField from "./InputField";
import { Settings } from "lucide-react";
import { useState } from "react";

interface Props {
  data: ThresholdParams;
  onChange: (data: ThresholdParams) => void;
  kappa: number;
}

export default function ThresholdConfig({ data, onChange, kappa }: Props) {
  const [open, setOpen] = useState(false);
  const update = (key: keyof ThresholdParams, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="rounded-xl border border-border-primary bg-surface">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-elevated/50 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-2">
          <Settings size={14} className="text-text-dim" />
          <span className="text-text-muted font-medium">动态临界点参数</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-warning text-sm">κ = {kappa.toFixed(2)}</span>
          <span className="text-text-dim text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 border-t border-border-primary">
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputField label="基础临界值 κ_base" value={data.kappa_base} onChange={(v) => update("kappa_base", v)} step={0.1} />
            <InputField label="通胀率" value={data.inflation_rate} onChange={(v) => update("inflation_rate", v)} step={0.01} />
            <InputField label="生命周期系数" value={data.lifecycle_factor} onChange={(v) => update("lifecycle_factor", v)} step={0.1} />
            <InputField label="财务跑道系数" value={data.runway_factor} onChange={(v) => update("runway_factor", v)} step={0.1} />
          </div>
          <p className="text-xs text-text-dim mt-3">κ = κ_base × (1 + 通胀率) × 生命周期 × 跑道</p>
        </div>
      )}
    </div>
  );
}
