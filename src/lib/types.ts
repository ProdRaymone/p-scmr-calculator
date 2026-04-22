
export interface RevenueInputs {
  r_direct: number;       // AI直接产出变现收入 ($)
  r_time_hours: number;   // AI节省的时间 (hours)
  hourly_rate: number;    // 机会成本时薪 ($/h)
  r_asset: number;        // 资产增值估值 ($)
  delta: number;          // 资产变现置信度 [0,1]
  r_quality: number;      // 质量溢价收入 ($)
  r_synergy: number;      // 交叉协同收益 ($)
}

export interface CostInputs {
  c_token: number;         // API token费用 ($)
  c_human_hours: number;   // 人工投入时间 (hours)
  c_infra: number;         // 基础设施成本 ($)
  c_drift_hours: number;   // 无效输出筛选时间 (hours)
  c_opportunity_hours: number; // 碳基技能机会成本时间 (hours)
}

export interface DiscountParams {
  gamma: number;           // 时间贴现因子 (default 0.95)
  period: number;          // 当前期数 t
}

export interface ThresholdParams {
  kappa_base: number;      // 基础临界值 (default 1.5)
  inflation_rate: number;  // 通胀率
  lifecycle_factor: number; // 人生阶段系数
  runway_factor: number;   // 财务跑道系数
}

export type Rating = 'S' | 'A' | 'B' | 'C' | 'D';

export interface RevenueBreakdown {
  r_direct: number;
  r_time: number;
  r_asset: number;
  r_quality: number;
  r_synergy: number;
}

export interface CostBreakdown {
  c_token: number;
  c_human: number;
  c_infra: number;
  c_drift: number;
  c_opportunity: number;
}

export interface PSCMRResult {
  pscmr: number;
  rating: Rating;
  totalRevenue: number;
  totalCost: number;
  revenueBreakdown: RevenueBreakdown;
  costBreakdown: CostBreakdown;
  kappa: number;
  isHealthy: boolean;
}

export interface HistoryEntry {
  id: string;
  date: string;
  revenue: RevenueInputs;
  cost: CostInputs;
  threshold: ThresholdParams;
  result: PSCMRResult;
}
