
"use client";

import { useState, useEffect, useCallback } from "react";
import { RevenueInputs, CostInputs, ThresholdParams, PSCMRResult, HistoryEntry } from "@/lib/types";
import { DEFAULT_REVENUE, DEFAULT_COST, DEFAULT_THRESHOLD } from "@/lib/constants";
import { calculatePSCMR, calculateKappaPersonal } from "@/lib/calculator";
import { loadHistory, saveEntry, deleteEntry } from "@/lib/storage";
import RevenueForm from "@/components/RevenueForm";
import CostForm from "@/components/CostForm";
import ThresholdConfig from "@/components/ThresholdConfig";
import RatingBadge from "@/components/RatingBadge";
import Breakdown from "@/components/Breakdown";
import HistoryChart from "@/components/HistoryChart";
import HistoryTable from "@/components/HistoryTable";
import CSVPanel from "@/components/CSVPanel";
import { Calculator, Save, RotateCcw, Zap } from "lucide-react";

export default function Home() {
  const [revenue, setRevenue] = useState<RevenueInputs>(DEFAULT_REVENUE);
  const [cost, setCost] = useState<CostInputs>(DEFAULT_COST);
  const [threshold, setThreshold] = useState<ThresholdParams>(DEFAULT_THRESHOLD);
  const [result, setResult] = useState<PSCMRResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const kappa = calculateKappaPersonal(threshold);

  const handleCalculate = useCallback(() => {
    const r = calculatePSCMR(revenue, cost, kappa);
    setResult(r);
    setShowResult(true);
  }, [revenue, cost, kappa]);

  const handleSave = () => {
    if (!result) return;
    const entry: HistoryEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toISOString(),
      revenue,
      cost,
      threshold,
      result,
    };
    saveEntry(entry);
    setHistory(loadHistory());
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setHistory(loadHistory());
  };

  const handleImport = (entries: HistoryEntry[]) => {
    entries.forEach(saveEntry);
    setHistory(loadHistory());
  };

  const handleReset = () => {
    setRevenue(DEFAULT_REVENUE);
    setCost(DEFAULT_COST);
    setThreshold(DEFAULT_THRESHOLD);
    setResult(null);
    setShowResult(false);
  };

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <header className="border-b border-border-primary bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/10 border border-accent/20">
              <Zap size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">P-SCMR 计算器</h1>
              <p className="text-[10px] text-text-dim tracking-widest uppercase">Personal Silicon-Carbon Metabolic Rate</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CSVPanel history={history} onImport={handleImport} />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RevenueForm data={revenue} onChange={setRevenue} />
          <CostForm data={cost} onChange={setCost} />
        </div>

        {/* Threshold Config */}
        <ThresholdConfig data={threshold} onChange={setThreshold} kappa={kappa} />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCalculate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-bright
              text-white font-semibold text-sm transition-all duration-200
              shadow-[0_0_20px_rgba(113,112,255,0.25)] hover:shadow-[0_0_30px_rgba(113,112,255,0.4)]"
          >
            <Calculator size={16} />
            计算 P-SCMR
          </button>

          {result && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-success/30
                bg-success/10 hover:bg-success/20 text-success font-medium text-sm transition-all"
            >
              <Save size={14} />
              保存记录
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-primary
              bg-surface hover:bg-elevated text-text-muted text-sm transition-all"
          >
            <RotateCcw size={14} />
            重置
          </button>
        </div>

        {/* Results */}
        {showResult && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-xl border border-border-primary bg-surface p-5">
              <RatingBadge
                rating={result.rating}
                pscmr={result.pscmr}
                kappa={kappa}
                isHealthy={result.isHealthy}
              />
              <div className="mt-6 border-t border-border-primary pt-5">
                <Breakdown
                  revenue={result.revenueBreakdown}
                  cost={result.costBreakdown}
                  rTotal={result.totalRevenue}
                  cTotal={result.totalCost}
                />
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        <HistoryChart history={history} kappa={kappa} />
        <HistoryTable history={history} onDelete={handleDelete} />

        {/* Footer */}
        <footer className="text-center text-xs text-text-dim py-8 border-t border-border-primary/50">
          <p>P-SCMR · Raymone Huang × MINJI · {new Date().getFullYear()}</p>
          <p className="mt-1">个人硅碳代谢率 — 量化你与 AI 的共生效率</p>
        </footer>
      </div>
    </main>
  );
}
