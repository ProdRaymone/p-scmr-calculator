
"use client";
import { useState } from "react";

interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function InputField({ label, value, onChange, unit, tooltip, min = 0, max, step = 0.01 }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group relative">
      {tooltip && (
        <div className="absolute -top-8 left-0 right-0 z-10 hidden group-hover:block">
          <div className="bg-elevated border border-border-secondary text-text-muted text-xs px-2 py-1 rounded-md shadow-lg">
            {tooltip}
          </div>
        </div>
      )}
      <label className="block text-xs text-text-muted mb-1 font-medium tracking-wide">
        {label}
        {unit && <span className="ml-1 text-text-dim">({unit})</span>}
      </label>
      <div className={`relative rounded-lg border transition-all duration-200 ${
        focused ? "border-accent-bright shadow-[0_0_0_1px_rgba(113,112,255,0.3)]" : "border-border-primary hover:border-border-secondary"
      }`}>
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          min={min}
          max={max}
          step={step}
          placeholder="0"
          className="w-full bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-dim outline-none font-mono"
        />
      </div>
    </div>
  );
}
