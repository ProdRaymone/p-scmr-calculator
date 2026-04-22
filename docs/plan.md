# P-SCMR Calculator — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a Next.js single-page app that calculates Personal Silicon-Carbon Metabolic Rate (P-SCMR), with interactive form input, real-time calculation, gauge/rating visualization, and CSV import/export.

**Architecture:** Single-page app with client-side calculation. No backend needed — all computation runs in the browser. State managed via React hooks + localStorage for persistence. Chart.js for visualizations.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Chart.js (via react-chartjs-2), Framer Motion for animations. Design: Linear-inspired dark theme.

---

## Task 1: Project Scaffolding

**Objective:** Initialize Next.js project with all dependencies and base config.

**Steps:**
1. Create Next.js 14 app with TypeScript + Tailwind + App Router
2. Install dependencies: react-chartjs-2, chart.js, framer-motion, lucide-react
3. Set up tailwind.config.ts with Linear-inspired color tokens
4. Create base layout with dark theme global styles

**Files:**
- `package.json`
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx` (placeholder)

---

## Task 2: Type Definitions & Core Calculation Engine

**Objective:** Implement all P-SCMR types and the pure calculation functions.

**Files:**
- Create: `lib/types.ts`
- Create: `lib/calculator.ts`
- Create: `lib/constants.ts`

**Type definitions (lib/types.ts):**
```typescript
export interface RevenueInputs {
  r_direct: number;      // AI直接产出变现收入
  r_time_hours: number;  // AI节省的时间（小时）
  hourly_rate: number;   // 机会成本时薪
  r_asset_count: number; // 产出的可复用资产数量
  asset_value: number;   // 单资产估值
  delta: number;         // 资产变现置信度 [0,1]
  r_quality: number;     // 质量溢价收入
  r_synergy: number;     // 交叉协同收益
}

export interface CostInputs {
  c_token: number;       // API token费用
  c_human_hours: number; // 人工投入时间（小时）
  c_infra: number;       // 基础设施成本
  c_drift_hours: number; // 无效输出筛选时间（小时）
  c_opportunity_hours: number; // 碳基技能机会成本时间（小时）
}

export interface DiscountParams {
  gamma: number;         // 时间贴现因子 (default 0.95)
  period: number;        // 当前期数 t
}

export interface ThresholdParams {
  kappa_base: number;    // 基础临界值 (default 1.5)
  inflation_rate: number; // 通胀率
  lifecycle_factor: number; // 人生阶段系数
  runway_factor: number; // 财务跑道系数
}

export type Rating = 'S' | 'A' | 'B' | 'C' | 'D';

export interface CalculationResult {
  r_total: number;
  r_breakdown: {
    r_direct: number;
    r_time: number;
    r_asset: number;
    r_quality: number;
    r_synergy: number;
  };
  c_total: number;
  c_breakdown: {
    c_token: number;
    c_human: number;
    c_infra: number;
    c_drift: number;
    c_opportunity: number;
  };
  pscmr: number;
  rating: Rating;
  kappa_personal: number;
  is_healthy: boolean;
}

export interface HistoryEntry {
  id: string;
  date: string;          // ISO date
  label: string;         // e.g. "Week 16, 2026"
  revenue: RevenueInputs;
  cost: CostInputs;
  result: CalculationResult;
}
```

**Calculator (lib/calculator.ts):**
- `calculateRevenue(inputs: RevenueInputs, discount?: DiscountParams): { total: number, breakdown: ... }`
- `calculateCost(inputs: CostInputs, hourlyRate: number): { total: number, breakdown: ... }`
- `calculatePSCMR(revenue: RevenueInputs, cost: CostInputs, discount?: DiscountParams): CalculationResult`
- `getRating(pscmr: number): Rating`
- `calculateKappaPersonal(params: ThresholdParams): number`

**Constants (lib/constants.ts):**
- Default values for all params
- Rating thresholds: S≥5, A≥3, B≥1.5, C≥1.0, D<1.0
- Rating colors and labels (CN + EN)

---

## Task 3: UI Components — Input Forms

**Objective:** Build the revenue and cost input form sections.

**Files:**
- Create: `components/RevenueForm.tsx`
- Create: `components/CostForm.tsx`
- Create: `components/ThresholdForm.tsx`
- Create: `components/NumberInput.tsx` (reusable styled input)
- Create: `components/SliderInput.tsx` (for delta, gamma, etc.)
- Create: `components/Tooltip.tsx` (info tooltips for each variable)

**Design specs (Linear-inspired dark theme):**
- Background: `#08090a` page, `#0f1011` cards
- Text: `#f7f8f8` primary, `#8a8f98` secondary
- Accent: `#5e6ad2` for interactive elements
- Inputs: `rgba(255,255,255,0.02)` bg, `rgba(255,255,255,0.08)` border, 6px radius
- Font: Inter, weight 400/510/590

**Each input has:**
- Chinese label (primary) + English variable name (secondary, monospace)
- Info tooltip explaining the variable
- Unit suffix ($, h, etc.)
- Real-time value display

---

## Task 4: Results Dashboard — Gauge, Rating Badge, Breakdown

**Objective:** Build the results visualization section.

**Files:**
- Create: `components/PSCMRGauge.tsx` (main score display with animated gauge)
- Create: `components/RatingBadge.tsx` (S/A/B/C/D badge with color)
- Create: `components/BreakdownChart.tsx` (horizontal stacked bar for R and C)
- Create: `components/MetricCard.tsx` (reusable stat card)
- Create: `components/FormulaDisplay.tsx` (renders the formula with live values)

**Gauge design:**
- Semi-circular gauge from 0 to 10 (or dynamic max)
- Color gradient: red (D) → orange (C) → yellow (B) → green (A) → blue (S)
- Large number in center showing P-SCMR value
- Rating badge below
- κ_personal threshold marker on gauge

**Breakdown:**
- Two horizontal stacked bars (Revenue / Cost)
- Each segment colored and labeled
- Percentage tooltips

---

## Task 5: History & Trend Chart

**Objective:** Implement localStorage-based history tracking and trend visualization.

**Files:**
- Create: `components/HistoryTable.tsx`
- Create: `components/TrendChart.tsx` (line chart showing P-SCMR over time)
- Create: `lib/storage.ts` (localStorage helpers)

**Features:**
- Save current calculation as a history entry (with date + label)
- Display history in a compact table with rating badges
- Line chart showing P-SCMR trend with κ_personal threshold line
- Delete individual entries

---

## Task 6: CSV Import/Export

**Objective:** Allow users to import historical data and export their tracking data.

**Files:**
- Create: `lib/csv.ts` (parse/generate CSV)
- Create: `components/ImportExport.tsx`

**CSV format:**
```csv
date,label,r_direct,r_time_hours,hourly_rate,r_asset_count,asset_value,delta,r_quality,r_synergy,c_token,c_human_hours,c_infra,c_drift_hours,c_opportunity_hours
2026-04-22,Week 16,500,10,50,3,100,0.3,200,100,25,8,30,2,3
```

**Features:**
- Export button downloads CSV
- Import button accepts CSV file, parses, and adds to history
- Validation with error messages for malformed data

---

## Task 7: Main Page Assembly & Responsive Layout

**Objective:** Assemble all components into the main page with responsive layout.

**Files:**
- Modify: `app/page.tsx` (main assembly)
- Create: `components/Header.tsx` (title + description)
- Create: `components/Footer.tsx` (credits, link to research doc)

**Layout:**
- Top: Header with P-SCMR title and brief description
- Section 1: Input forms (Revenue | Cost | Threshold) — 3-column on desktop, stacked on mobile
- Section 2: Results dashboard — Gauge + Breakdown side by side
- Section 3: Formula display with live values
- Section 4: History table + Trend chart
- Section 5: Import/Export controls
- Footer

**Responsive:**
- Desktop: 3-column inputs, 2-column results
- Tablet: 2-column inputs, stacked results
- Mobile: single column throughout

---

## Task 8: Polish, Animations & Metadata

**Objective:** Add finishing touches — animations, SEO, smooth transitions.

**Files:**
- Modify: `app/layout.tsx` (metadata, OG tags)
- Modify various components (add Framer Motion)
- Create: `public/og-image.png` (or SVG) — optional

**Animations:**
- Gauge needle animation on calculation
- Number counters that animate to new values
- Smooth section transitions
- Rating badge color transition

**Metadata:**
- Title: "P-SCMR Calculator — 个人硅碳代谢率计算器"
- Description in CN + EN
- Favicon

---
