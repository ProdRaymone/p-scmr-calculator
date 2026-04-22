
import {
  RevenueInputs,
  CostInputs,
  ThresholdParams,
  PSCMRResult,
  Rating,
  RevenueBreakdown,
  CostBreakdown,
} from "./types";
import { RATING_CONFIG, DEFAULT_THRESHOLD } from "./constants";

export function calculateRevenueBreakdown(inputs: RevenueInputs): RevenueBreakdown {
  return {
    r_direct:  inputs.r_direct,
    r_time:    inputs.r_time_hours * inputs.hourly_rate,
    r_asset:   inputs.r_asset * inputs.delta,
    r_quality: inputs.r_quality,
    r_synergy: inputs.r_synergy,
  };
}

export function calculateCostBreakdown(inputs: CostInputs, hourlyRate: number): CostBreakdown {
  return {
    c_token:       inputs.c_token,
    c_human:       inputs.c_human_hours * hourlyRate,
    c_infra:       inputs.c_infra,
    c_drift:       inputs.c_drift_hours * hourlyRate,
    c_opportunity: inputs.c_opportunity_hours * hourlyRate,
  };
}

export function getRating(pscmr: number): Rating {
  if (pscmr >= RATING_CONFIG.S.min) return "S";
  if (pscmr >= RATING_CONFIG.A.min) return "A";
  if (pscmr >= RATING_CONFIG.B.min) return "B";
  if (pscmr >= RATING_CONFIG.C.min) return "C";
  return "D";
}

export function calculateKappaPersonal(params?: ThresholdParams): number {
  const p = params ?? DEFAULT_THRESHOLD;
  return p.kappa_base * (1 + p.inflation_rate) * p.lifecycle_factor * p.runway_factor;
}

export function calculatePSCMR(
  revenue: RevenueInputs,
  cost: CostInputs,
  kappa: number
): PSCMRResult {
  const revenueBreakdown = calculateRevenueBreakdown(revenue);
  const costBreakdown = calculateCostBreakdown(cost, revenue.hourly_rate);

  const totalRevenue = Object.values(revenueBreakdown).reduce((a, b) => a + b, 0);
  const totalCost = Object.values(costBreakdown).reduce((a, b) => a + b, 0);

  const pscmr = totalCost > 0 ? totalRevenue / totalCost : 0;
  const rating = getRating(pscmr);

  return {
    pscmr,
    rating,
    totalRevenue,
    totalCost,
    revenueBreakdown,
    costBreakdown,
    kappa,
    isHealthy: pscmr >= kappa,
  };
}
