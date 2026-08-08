export type ArchetypeId = 
  | 'no_ai'               // 1. Workflow Automation (No AI)
  | 'automated_ai'        // 2. Automated AI Workflow
  | 'agent_workflow'      // 3. AI Agent Workflow
  | 'agentic_automation'  // 4. Agentic Workflow Automation
  | 'multi_agent';        // 5. Multi-Agent System (MAS)

export type StepImplType = 
  | 'deterministic'  // ⚙️ Deterministic Step (No AI)
  | 'ai_llm_call'    // ⚡ AI Step (LLM Call)
  | 'ai_agent_loop'; // 🎯 AI Agent Step (Tool Loop)

export interface ArchetypeDefinition {
  id: ArchetypeId;
  name: string;
  short_name: string;
  icon: string;
  badge_color: string;
  description: string;
  latency_range: string;
  cost_tier: string;
  error_risk: string;
  governance_score: string;
  ideal_for: string;
}

export interface StepDetail {
  id: string;
  name: string;
  desc: string;
  tech: string;
  cfo: string;
  implType: StepImplType;
  
  // 3 Step Complexity Form Factors
  apiDepth: number;     // S_i: 1-10 (Schnittstellentiefe & API Calls)
  agentScale: number;   // A_i: 1-10 (Sub-Agenten & Rekursions-Tiefe)
  logicDensity: number; // N_i: 1-10 (Regel- & Datendichte)
}

export interface UseCaseParams {
  volume: number;
  unstructured_ratio: number; // 0.0 to 1.0
  data_quality: number; // 0.0 to 1.0
  cost_per_error: number;
  sla_latency: number; // in seconds
  positions_count?: number;
  token_price_per_1m?: number;
  selected_archetype?: ArchetypeId | null;
}

export interface UseCase {
  id: string;
  name: string;
  module: string;
  fte: string;
  short_desc: string;
  sender: string;
  receiver: string;
  status_quo: string;
  ai_delta: string;
  sap_entities: string;
  sweet_spot_archetype: ArchetypeId;
  sweet_spot_reason: string;
  steps: StepDetail[];
  params: UseCaseParams;
}

export interface CLevelDimensionDetail {
  title: string;
  score: string;
  status: 'optimal' | 'warning' | 'critical';
  answer: string;
  why: string;
}

export interface ExecutiveArgumentationHelper {
  rating_title: string;
  rating_status: '🟢 OPTIMAL' | '🟡 MÄSSIG' | '🔴 UNWIRTSCHAFTLICH' | '🔴 OVER-ENGINEERED';
  why_worse_or_better: string; // Warum dieser Weg besser oder schlechter als der Sweet Spot ist
  talking_points: string[];   // 3 schlagkräftige Vorstands-Argumente für den Berater
}

export interface ArchetypeBenchmarkResult {
  archetype_id: ArchetypeId;
  archetype_name: string;
  icon: string;
  badge_color: string;
  avg_latency_sec: number;
  sla_fulfilled: boolean;
  monthly_token_cost_eur: number;
  monthly_hitl_volume: number;
  hitl_rate_pct: number;
  monthly_residual_error_volume: number;
  residual_risk_eur: number;
  fte_saved: number;
  monthly_manual_labor_saved_eur: number;
  true_cost_per_transaction_eur: number;
  eval_rating: '🟢 OPTIMAL' | '🟡 MÄSSIG' | '🔴 UNWIRTSCHAFTLICH' | '🔴 OVER-ENGINEERED';
  eval_reason: string;
  executive_summary_why: string;
  
  // Risk Ampeln
  risk_traffic_lights: {
    sla_risk: '🟢 OK' | '🔴 CRITICAL';
    backlog_risk: '🟢 OK' | '🟡 MODERATE' | '🔴 HIGH';
    budget_risk: '🟢 LOW' | '🟡 MEDIUM' | '🔴 HIGH';
  };

  // C-Level Berater Argumentationshilfe
  argumentation_helper: ExecutiveArgumentationHelper;

  // 5 C-Level Reporting Dimensions
  c_level: {
    sla_guarantee: CLevelDimensionDetail;
    backlog_risk: CLevelDimensionDetail;
    workforce_impact: CLevelDimensionDetail;
    budget_risk: CLevelDimensionDetail;
    true_cost_per_case: CLevelDimensionDetail;
  };
}

export interface SimulationResult {
  volume: number;
  unstructured_ratio: number;
  data_quality: number;
  cost_per_error: number;
  sla_latency: number;
  
  // Derived Workflow Archetype from Step Setup
  derived_archetype_id: ArchetypeId;
  recommended_archetype_id: ArchetypeId;
  recommendation_reason: string;
  
  // Active Archetype
  active_archetype_id: ArchetypeId;
  
  // Benchmark Results across all 5 Archetypes
  benchmarks: Record<ArchetypeId, ArchetypeBenchmarkResult>;
  
  // Details for active selection
  active_benchmark: ArchetypeBenchmarkResult;
}
