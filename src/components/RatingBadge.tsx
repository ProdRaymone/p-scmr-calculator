
"use client";
import { Rating } from "@/lib/types";
import { RATING_CONFIG } from "@/lib/constants";

interface Props {
  rating: Rating;
  pscmr: number;
  kappa: number;
  isHealthy: boolean;
}

export default function RatingBadge({ rating, pscmr, kappa, isHealthy }: Props) {
  const cfg = RATING_CONFIG[rating];

  return (
    <div className="flex flex-col items-center gap-3 py-6">
      {/* Big rating letter */}
      <div
        className="relative flex items-center justify-center w-28 h-28 rounded-2xl border-2 transition-all duration-500"
        style={{
          borderColor: cfg.color,
          background: cfg.bgColor,
          boxShadow: `0 0 40px ${cfg.bgColor}, 0 0 80px ${cfg.bgColor}`,
        }}
      >
        <span className="text-6xl font-bold" style={{ color: cfg.color }}>
          {rating}
        </span>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-lg font-semibold text-text-primary">{cfg.label}</div>
        <div className="text-xs text-text-muted">{cfg.labelEn}</div>
      </div>

      {/* P-SCMR value */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold font-mono" style={{ color: cfg.color }}>
          {pscmr.toFixed(2)}
        </span>
        <span className="text-sm text-text-muted">×</span>
      </div>

      {/* Threshold bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-text-dim mb-1">
          <span>0</span>
          <span>κ = {kappa.toFixed(2)}</span>
          <span>5+</span>
        </div>
        <div className="h-2 bg-elevated rounded-full overflow-hidden relative">
          {/* Kappa marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-warning z-10"
            style={{ left: `${Math.min((kappa / 6) * 100, 100)}%` }}
          />
          {/* Value bar */}
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min((pscmr / 6) * 100, 100)}%`,
              background: `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`,
            }}
          />
        </div>
        <div className="mt-1 text-center">
          <span className={`text-xs font-medium ${isHealthy ? "text-success" : "text-danger"}`}>
            {isHealthy ? "✓ 超过安全线" : "⚠ 低于安全线 κ"}
          </span>
        </div>
      </div>
    </div>
  );
}
