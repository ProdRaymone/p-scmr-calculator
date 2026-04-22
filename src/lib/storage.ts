
import { HistoryEntry } from "./types";

const STORAGE_KEY = "pscmr-history";

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: HistoryEntry): void {
  const history = loadHistory();
  // Avoid duplicate IDs
  const idx = history.findIndex((h) => h.id === entry.id);
  if (idx >= 0) {
    history[idx] = entry;
  } else {
    history.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function deleteEntry(id: string): void {
  const history = loadHistory().filter((h) => h.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
