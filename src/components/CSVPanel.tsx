
"use client";
import { HistoryEntry } from "@/lib/types";
import { exportToCSV, downloadCSV, parseCSV } from "@/lib/csv";
import { Download, Upload, FileSpreadsheet } from "lucide-react";
import { useRef } from "react";

interface Props {
  history: HistoryEntry[];
  onImport: (entries: HistoryEntry[]) => void;
}

export default function CSVPanel({ history, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (history.length === 0) return;
    const csv = exportToCSV(history);
    downloadCSV(csv, `pscmr-export-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const entries = parseCSV(text);
        onImport(entries);
      } catch (err) {
        alert("CSV 解析失败: " + (err instanceof Error ? err.message : "未知错误"));
      }
    };
    reader.readAsText(file);
    // reset input so same file can be re-imported
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        disabled={history.length === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-primary
          bg-surface hover:bg-elevated text-text-muted hover:text-text-primary transition-all
          disabled:opacity-40 disabled:pointer-events-none"
      >
        <Download size={13} />
        导出CSV
      </button>

      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-primary
          bg-surface hover:bg-elevated text-text-muted hover:text-text-primary transition-all"
      >
        <Upload size={13} />
        导入CSV
      </button>

      <input ref={fileRef} type="file" accept=".csv" onChange={handleImport} className="hidden" />

      {history.length > 0 && (
        <span className="text-xs text-text-dim flex items-center gap-1 ml-1">
          <FileSpreadsheet size={12} />
          {history.length} 条记录
        </span>
      )}
    </div>
  );
}
