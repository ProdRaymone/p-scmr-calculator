
import { Rating, RevenueInputs, CostInputs, ThresholdParams } from "./types";

export const DEFAULT_REVENUE: RevenueInputs = {
  r_direct: 0,
  r_time_hours: 0,
  hourly_rate: 40,
  r_asset: 0,
  delta: 0.3,
  r_quality: 0,
  r_synergy: 0,
};

export const DEFAULT_COST: CostInputs = {
  c_token: 0,
  c_human_hours: 0,
  c_infra: 0,
  c_drift_hours: 0,
  c_opportunity_hours: 0,
};

export const DEFAULT_THRESHOLD: ThresholdParams = {
  kappa_base: 1.5,
  inflation_rate: 0.03,
  lifecycle_factor: 0.9,
  runway_factor: 1.0,
};

export interface RatingConfig {
  label: string;
  labelEn: string;
  min: number;
  color: string;
  bgColor: string;
  description: string;
}

export const RATING_CONFIG: Record<Rating, RatingConfig> = {
  S: { label: "硅碳共振", labelEn: "Resonance",    min: 5.0, color: "#7170ff", bgColor: "rgba(113,112,255,0.15)", description: "每$1投入产出≥$5可量化收益" },
  A: { label: "净正共生", labelEn: "Net Positive",  min: 3.0, color: "#27a644", bgColor: "rgba(39,166,68,0.15)",   description: "健康的投资回报" },
  B: { label: "临界平衡", labelEn: "Threshold",     min: 1.5, color: "#f59e0b", bgColor: "rgba(245,158,11,0.15)", description: "仅覆盖显性成本" },
  C: { label: "警戒区",   labelEn: "Warning",       min: 1.0, color: "#f97316", bgColor: "rgba(249,115,22,0.15)", description: "投入产出接近1:1" },
  D: { label: "寄生态",   labelEn: "Parasitic",     min: 0,   color: "#ef4444", bgColor: "rgba(239,68,68,0.15)",  description: "AI系统在消耗你的资源" },
};

export const REVENUE_LABELS: Record<keyof RevenueInputs, { label: string; unit: string; tooltip: string }> = {
  r_direct:      { label: "直接变现收入",     unit: "$",   tooltip: "AI直接产出的变现收入，如AI生成的beat出售收入" },
  r_time_hours:  { label: "节省时间",         unit: "h",   tooltip: "AI替你完成任务节省的时间" },
  hourly_rate:   { label: "机会成本时薪",     unit: "$/h", tooltip: "你的时间价值——用最近3个月总收入/总工作小时估算" },
  r_asset:       { label: "资产增值",         unit: "$",   tooltip: "代码库、品牌、SOP体系等资产的估值增量" },
  delta:         { label: "资产变现置信度",   unit: "",    tooltip: "资产变现的确定性：已有买家=0.9，纯内部使用=0.2" },
  r_quality:     { label: "质量溢价",         unit: "$",   tooltip: "因AI提升质量而产生的额外收入差额" },
  r_synergy:     { label: "交叉协同收益",     unit: "$",   tooltip: "品牌提升带来的客户增量×客单价等交叉效应" },
};

export const COST_LABELS: Record<keyof CostInputs, { label: string; unit: string; tooltip: string }> = {
  c_token:            { label: "API Token费用", unit: "$", tooltip: "直接API账单费用" },
  c_human_hours:      { label: "人工投入时间", unit: "h", tooltip: "prompt工程+筛选+修正的时间" },
  c_infra:            { label: "基础设施成本", unit: "$", tooltip: "订阅、服务器、工具链等固定成本" },
  c_drift_hours:      { label: "漂移时间",     unit: "h", tooltip: "无效输出的筛选+重跑消耗的时间" },
  c_opportunity_hours:{ label: "机会成本时间", unit: "h", tooltip: "本可用于碳基核心技能的时间被AI占用" },
};
