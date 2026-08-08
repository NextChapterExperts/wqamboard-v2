import type { 
  UseCaseParams, 
  SimulationResult, 
  StepDetail, 
  ArchetypeId, 
  ArchetypeBenchmarkResult,
  CLevelDimensionDetail,
  ExecutiveArgumentationHelper
} from '../types';
import { ARCHETYPE_DEFINITIONS } from '../data/useCases';

export const WAQAM_ENGINE_VERSION = "4.2.0-Zwingmann-CLevelArg";

export function runPcsWaqamSimulation(
  params: UseCaseParams,
  steps: StepDetail[]
): SimulationResult {
  const {
    volume,
    unstructured_ratio,
    data_quality,
    cost_per_error,
    positions_count = 5,
    token_price_per_1m = 5.0,
    sla_latency = 10.0,
    selected_archetype = null
  } = params;

  // Input Sanitization
  const vol_safe = Math.max(1, volume);
  const u_safe = Math.max(0.0, Math.min(1.0, unstructured_ratio));
  const q_safe = Math.max(0.0, Math.min(1.0, data_quality));
  const cost_err_safe = Math.max(0.0, cost_per_error);
  const pos_safe = Math.max(1, positions_count);
  const sla_safe = Math.max(0.5, sla_latency);
  const token_price_safe = Math.max(0.0, token_price_per_1m);

  const active_steps = steps && steps.length > 0 ? steps : [
    { id: "step1", name: "Eingang & Identifikation", desc: "Erfassung", tech: "API", cfo: "Auto", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
    { id: "step2", name: "Extraktion & Parsing", desc: "Extraktion", tech: "LLM", cfo: "AI", implType: "ai_llm_call", apiDepth: 2, agentScale: 1, logicDensity: 3 },
    { id: "step3", name: "Regel- & Stammdaten-Abgleich", desc: "Lookup", tech: "ABAP", cfo: "Auto", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 2 },
    { id: "step4", name: "Ausnahme & Klärung", desc: "Agent", tech: "ReAct", cfo: "Agent", implType: "ai_agent_loop", apiDepth: 3, agentScale: 3, logicDensity: 4 },
    { id: "step5", name: "S/4HANA Buchung", desc: "Verbuchung", tech: "BAPI", cfo: "ERP", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
  ] as StepDetail[];

  // 1. Derive overall Archetype from Step Setup
  let has_llm = false;
  let has_agent = false;
  let max_agent_scale = 1;

  for (const step of active_steps) {
    if (step.implType === 'ai_llm_call') has_llm = true;
    if (step.implType === 'ai_agent_loop') {
      has_agent = true;
      if (step.agentScale > max_agent_scale) max_agent_scale = step.agentScale;
    }
  }

  let derived_archetype_id: ArchetypeId = 'no_ai';
  if (!has_llm && !has_agent) {
    derived_archetype_id = 'no_ai';
  } else if (has_llm && !has_agent) {
    derived_archetype_id = 'automated_ai';
  } else if (has_agent && active_steps.length <= 3 && max_agent_scale <= 4) {
    derived_archetype_id = 'agent_workflow';
  } else if (has_agent && max_agent_scale <= 6) {
    derived_archetype_id = 'agentic_automation';
  } else {
    derived_archetype_id = 'multi_agent';
  }

  // 2. Compute Benchmarks across all 5 Archetypes
  const archetype_ids: ArchetypeId[] = [
    'no_ai',
    'automated_ai',
    'agent_workflow',
    'agentic_automation',
    'multi_agent'
  ];

  const benchmarks: Record<ArchetypeId, ArchetypeBenchmarkResult> = {} as any;

  for (const archId of archetype_ids) {
    let total_latency_sum = 0;
    let total_tokens_sum = 0;
    let overall_pass_rate = 1.0;

    for (const step of active_steps) {
      const S = Math.max(1, Math.min(10, step.apiDepth));
      const A = Math.max(1, Math.min(10, step.agentScale));
      const N = Math.max(1, Math.min(10, step.logicDensity));

      const conf_modifier = Math.max(0.70, 1.0 - (N - 1) * 0.03 - (S - 1) * 0.02);
      const base_conf = Math.max(0.10, Math.min(0.99, ((q_safe * 0.70) + ((1.0 - u_safe) * 0.30)) * conf_modifier));
      const p_fail_base = (1.0 - base_conf) * 0.08;

      let p_fail_step = p_fail_base;
      let step_latency = 0.2 + (S - 1) * 0.1;
      let step_tokens = 0;

      switch (archId) {
        case 'no_ai':
          p_fail_step = u_safe <= 0.10 ? 0.0001 : p_fail_base + (u_safe * 0.45);
          step_latency = 0.1 + (S - 1) * 0.05;
          step_tokens = 0;
          break;

        case 'automated_ai':
          p_fail_step = step.implType === 'deterministic' ? p_fail_base : p_fail_base * 0.85;
          step_latency = step.implType === 'deterministic' ? (0.1 + (S - 1) * 0.05) : (1.5 + u_safe * 1.5 + (S - 1) * 0.3);
          step_tokens = step.implType === 'deterministic' ? 0 : (2200 * (1 + 0.3 * u_safe) * (1 + 0.05 * (pos_safe - 5)));
          break;

        case 'agent_workflow':
          p_fail_step = p_fail_base * 0.60;
          step_latency = (4.0 + (A - 1) * 1.2) + u_safe * 3.5 + (S - 1) * 0.4;
          step_tokens = (5500 * (1 + (A - 1) * 0.35)) * (1 + 0.4 * u_safe);
          break;

        case 'agentic_automation':
          p_fail_step = step.implType === 'deterministic' ? p_fail_base : (p_fail_base * 0.40);
          step_latency = step.implType === 'deterministic' 
            ? (0.1 + (S - 1) * 0.05) 
            : ((5.0 + (A - 1) * 1.5) + u_safe * 4.0 + (S - 1) * 0.5);
          step_tokens = step.implType === 'deterministic' 
            ? 0 
            : ((8000 * (1 + (A - 1) * 0.4)) * (1 + 0.4 * u_safe));
          break;

        case 'multi_agent':
          p_fail_step = p_fail_base * 0.25;
          step_latency = (12.0 + (A - 1) * 2.5) + u_safe * 8.0 + (S - 1) * 0.8;
          step_tokens = (18000 * (1 + (A - 1) * 0.5)) * (1 + 0.5 * u_safe);
          break;
      }

      p_fail_step = Math.max(0.0001, Math.min(0.99, p_fail_step));
      const step_pass_rate = Math.pow(1.0 - p_fail_step, N);

      overall_pass_rate *= step_pass_rate;
      total_latency_sum += step_latency;
      total_tokens_sum += step_tokens;
    }

    const avg_latency_sec = Number(total_latency_sum.toFixed(1));
    const sla_fulfilled = avg_latency_sec <= sla_safe;

    const auto_pass_ratio = Math.max(0.01, Math.min(0.999, overall_pass_rate));
    const monthly_auto_volume = Math.floor(vol_safe * auto_pass_ratio);

    let leakage_rate = 0.001;
    if (archId === 'no_ai') leakage_rate = 0.0001;
    if (archId === 'agentic_automation') leakage_rate = 0.0005;
    if (archId === 'multi_agent') leakage_rate = 0.002;

    const monthly_residual_error_volume = Math.floor(vol_safe * (1.0 - auto_pass_ratio) * leakage_rate);
    const monthly_hitl_volume = Math.max(0, vol_safe - monthly_auto_volume - monthly_residual_error_volume);
    const hitl_rate_pct = Number(((monthly_hitl_volume / vol_safe) * 100).toFixed(1));

    const residual_risk_eur = Math.round(monthly_residual_error_volume * cost_err_safe);
    const monthly_token_cost_eur = Math.round((vol_safe * total_tokens_sum / 1_000_000) * token_price_safe);

    const fte_saved = Number(((monthly_auto_volume * 0.25) / 160).toFixed(1));
    const monthly_manual_labor_saved_eur = Math.round(fte_saved * 5000);

    const hitl_cost_eur = monthly_hitl_volume * 7.8125;
    const total_monthly_cost = monthly_token_cost_eur + residual_risk_eur + hitl_cost_eur;
    const true_cost_per_transaction_eur = Number((total_monthly_cost / vol_safe).toFixed(2));

    let eval_rating: '🟢 OPTIMAL' | '🟡 MÄSSIG' | '🔴 UNWIRTSCHAFTLICH' | '🔴 OVER-ENGINEERED' = '🟢 OPTIMAL';
    let eval_reason = "";
    let executive_summary_why = "";

    if (!sla_fulfilled) {
      eval_rating = '🔴 UNWIRTSCHAFTLICH';
      eval_reason = `Latenz (${avg_latency_sec}s) überschreitet das verlangte SLA (${sla_safe}s).`;
      executive_summary_why = `Der Prozess ist durch lange API-Loops oder Agenten-Iterationen zu langsam (${avg_latency_sec}s vs. SLA ${sla_safe}s). Verträge oder Reaktionszeiten werden gerissen.`;
    } else if (archId === 'no_ai' && u_safe > 0.30) {
      eval_rating = '🔴 UNWIRTSCHAFTLICH';
      eval_reason = `Unstrukturierungsgrad von ${(u_safe * 100).toFixed(0)}% führt bei reinem ABAP-Code zu massiven Abbrüchen.`;
      executive_summary_why = `Reiner Regel-Code kann Freitexte & PDFs nicht ohne KI auslesen. ${(u_safe * 100).toFixed(0)}% der Belege schlagen fehl und erzeugen eine riesige Fiori-Nacharbeits-Welle (${hitl_rate_pct}%).`;
    } else if (archId === 'multi_agent' && (vol_safe < 5000 || u_safe < 0.70)) {
      eval_rating = '🔴 OVER-ENGINEERED';
      eval_reason = `Multi-Agenten-Schwarm ist für Belegvolumen (${vol_safe.toLocaleString('de-DE')}) überdimensioniert.`;
      executive_summary_why = `Ein Multi-Agenten-Schwarm erzeugt extrem hohe Tokenkosten (${monthly_token_cost_eur.toLocaleString('de-DE')} €/Mo.), ohne bei diesem strukturierten Belegtyp Mehrwert zu bringen.`;
    } else if (archId === 'no_ai' && u_safe <= 0.10) {
      eval_rating = '🟢 OPTIMAL';
      eval_reason = `Daten zu 90%+ strukturiert: Rein deterministischer ABAP-Code ist 0.1s schnell und verbraucht 0 € Token.`;
      executive_summary_why = `Da die Daten strukturiert im ERP vorliegen, braucht der Prozess keine KI. ABAP-Code arbeitet in 0,1 Sekunde fehlerfrei für 0 € Tokenkosten.`;
    } else {
      eval_rating = '🟢 OPTIMAL';
      eval_reason = `Ausgewogenes Verhältnis aus SLA-Einhaltung (${avg_latency_sec}s) und Stückkosten (${true_cost_per_transaction_eur} €).`;
      executive_summary_why = `Gute Balance zwischen KI-Extraktion und deterministischer Absicherung. SLA wird eingehalten, Nacharbeit bleibt gering.`;
    }

    // Risk Traffic Lights
    const risk_traffic_lights = {
      sla_risk: (sla_fulfilled ? '🟢 OK' : '🔴 CRITICAL') as '🟢 OK' | '🔴 CRITICAL',
      backlog_risk: (hitl_rate_pct <= 15 ? '🟢 OK' : hitl_rate_pct <= 40 ? '🟡 MODERATE' : '🔴 HIGH') as '🟢 OK' | '🟡 MODERATE' | '🔴 HIGH',
      budget_risk: (monthly_token_cost_eur === 0 ? '🟢 LOW' : monthly_token_cost_eur < 1500 ? '🟡 MEDIUM' : '🔴 HIGH') as '🟢 LOW' | '🟡 MEDIUM' | '🔴 HIGH'
    };

    // Executive Argumentation Helper ("Spickzettel für den Berater im C-Level Vortrag")
    let why_worse_or_better = "";
    let talking_points: string[] = [];

    if (archId === 'no_ai') {
      why_worse_or_better = u_safe > 0.20
        ? `🔴 Schlechterer Weg bei Unstrukturierungsgrad ${(u_safe*100).toFixed(0)}%: Ohne KI scheitert der ABAP-Code an Freitexten/PDFs. Die Fachabteilung versinkt in einer ${hitl_rate_pct}% Nacharbeits-Welle.`
        : `🟢 Optimaler Weg: Da die Daten strukturiert vorliegen, spart reiner ABAP-Code 100% Token-OPEX und läuft in 0.1 Sekunde.`;
      talking_points = [
        "Reiner Regel-Code erzeugt null variable Token-OPEX (0 €/Monat).",
        `Bei ${(u_safe*100).toFixed(0)}% Unstrukturierung landen jedoch ${hitl_rate_pct}% der Belege im manuellen Fiori-Nacharbeitsvorrat.`,
        "Empfehlung: Nur für 100% strukturierte Schnittstellen (EDI/BAPI) nutzen."
      ];
    } else if (archId === 'automated_ai') {
      why_worse_or_better = "🟢 Sehr ausgewogener Weg: KI liest unstrukturierte Freitexte aus, der Prozesspfad bleibt aber starr und deterministisch abgesichert.";
      talking_points = [
        "Extrahiert Freitexte & PDFs zuverlässig in 1.5 bis 3 Sekunden.",
        `Geringe, planbare Tokenkosten (${monthly_token_cost_eur.toLocaleString('de-DE')} €/Monat).`,
        `Entlastet die Fachabteilung um netto +${fte_saved} FTEs bei geringem Risiko.`
      ];
    } else if (archId === 'agent_workflow') {
      why_worse_or_better = "🟡 Moderater Weg: Agenten-Loops bringen Flexibilität bei dynamischen APIs, erhöhen aber Latenz und Token-Verbrauch.";
      talking_points = [
        `Erhöhte Prozess-Latenz (${avg_latency_sec}s) durch autonome Tool-Schleifen.`,
        `Höhere Token-OPEX (${monthly_token_cost_eur.toLocaleString('de-DE')} €/Monat) bei Volumen-Peaks.`,
        "Sinnvoll bei hochflexiblen Recherche-Prozessen (z.B. Lieferanten-Onboarding)."
      ];
    } else if (archId === 'agentic_automation') {
      why_worse_or_better = "🟢 Sehr robuster Weg: Kapselt Agenten in einen deterministischen Workflow-Rahmen. Höchste Governance und Revisionssicherheit.";
      talking_points = [
        "Deterministischer Rahmen schützt vor unkontrollierten Agenten-Schleifen.",
        "Teil-Agenten lösen nur komplexe Ausnahme-Pfade autonom.",
        "Optimal für S/4HANA Reklamationen & Freigabe-Workflows."
      ];
    } else {
      why_worse_or_better = "🔴 Over-Engineered für Standard-Workflows: Multi-Agenten-Schwärme verbrauchen massive Tokens und erzeugen kaskadierende Latenzen.";
      talking_points = [
        `Massive Token-Kosten (${monthly_token_cost_eur.toLocaleString('de-DE')} €/Monat) durch Schwarm-Kommunikation.`,
        `Hohe Latenz (${avg_latency_sec}s) gefährdet vertragliche SLAs.`,
        "Nur für hochkomplexe Strategic Capex- & Legal-Gutachten rechtfertigbar."
      ];
    }

    const argumentation_helper: ExecutiveArgumentationHelper = {
      rating_title: eval_rating,
      rating_status: eval_rating,
      why_worse_or_better,
      talking_points
    };

    // Explicit Plain-Language Rationale
    const c_level_sla: CLevelDimensionDetail = {
      title: "1. Betriebsfähigkeit & SLA-Garantie",
      score: `${avg_latency_sec} Sek.`,
      status: sla_fulfilled ? 'optimal' : 'critical',
      answer: sla_fulfilled 
        ? `🟢 SLA von ${sla_safe}s wird sicher eingehalten.`
        : `🔴 SLA-Überschreitung um ${(avg_latency_sec - sla_safe).toFixed(1)}s!`,
      why: archId === 'no_ai'
        ? "Warum ist das so? Reine kompilierte ABAP/SQL-Ausführung im SAP-Kern ohne Netzwerk-Loops oder LLM-Inferenzzeiten."
        : archId === 'automated_ai'
        ? "Warum ist das so? Gezielter, einmaliger Prompt-Aufruf in festem Workflow-Pfad dauert nur 1,5 bis 3 Sekunden."
        : archId === 'agent_workflow'
        ? "Warum ist das so? Autonome Tool-Schleifen benötigen mehrere Aufrufe (API ➔ Thinking ➔ API), was die Zeit auf 5-15s erhöht."
        : archId === 'agentic_automation'
        ? "Warum ist das so? Deterministische Absicherung hält Standardpfade schnell (0.1s), während Teil-Agenten nur bei Ausnahmen 5-10s benötigen."
        : "Warum ist das so? Mehrere Agenten verhandeln nacheinander im Schwarm. Jeder Sub-Agent erzeugt eigene Denk- & API-Zyklen."
    };

    const c_level_backlog: CLevelDimensionDetail = {
      title: "2. Nacharbeits-Welle (Backlog-Risiko)",
      score: `${hitl_rate_pct}% Fiori HITL`,
      status: hitl_rate_pct <= 15 ? 'optimal' : hitl_rate_pct <= 40 ? 'warning' : 'critical',
      answer: hitl_rate_pct <= 15
        ? `🟢 Geringes Risiko (${hitl_rate_pct}% Fiori HITL).`
        : `🔴 Hohes Risiko (${hitl_rate_pct}% Nacharbeits-Welle überlastet die Fachabteilung).`,
      why: archId === 'no_ai' && u_safe > 0.20
        ? `Warum ist das so? Ohne KI scheitert der ABAP-Code an Unstrukturierungsgrad von ${(u_safe*100).toFixed(0)}%. Belege landen ungeprüft im Arbeitsvorrat.`
        : archId === 'no_ai'
        ? "Warum ist das so? Strukturierte Daten werden vom Regelwerk zu 100% exakt verarbeitet ohne Schatten-Arbeitsvorrat."
        : archId === 'automated_ai'
        ? "Warum ist das so? KI extrahiert Freitexte/PDFs zuverlässig. Nur unleserliche Sonderfälle (ca. 5-10%) gehen in die visuelle Fiori-Prüfung."
        : "Warum ist das so? Agenten korrigieren viele Ausnahmen selbstständig per API-Recherche, bevor ein Mensch eingreifen muss."
    };

    const c_level_workforce: CLevelDimensionDetail = {
      title: "3. Echte Kapazitäts-Entlastung",
      score: `+${fte_saved} FTE`,
      status: fte_saved >= 1.0 ? 'optimal' : 'warning',
      answer: `🟢 Entlastung von netto ${fte_saved} Vollzeit-Arbeitskräften (FTEs).`,
      why: `Warum ist das so? Durch ${monthly_auto_volume.toLocaleString('de-DE')} vollautomatisch dunkelverbuchte Vorgänge entfallen ${Math.round(monthly_auto_volume * 0.25)} Stunden manuelle Erfassungszeit pro Monat.`
    };

    const c_level_budget: CLevelDimensionDetail = {
      title: "4. Budget-Skalierungsrisiko (Token OPEX)",
      score: `${monthly_token_cost_eur.toLocaleString('de-DE')} €/Monat`,
      status: monthly_token_cost_eur === 0 ? 'optimal' : monthly_token_cost_eur < 1500 ? 'warning' : 'critical',
      answer: monthly_token_cost_eur === 0
        ? `🟢 0 € Token-OPEX (Rein deterministischer Code).`
        : `⚠️ Planbare variablen Tokenkosten: ${monthly_token_cost_eur.toLocaleString('de-DE')} €/Mo.`,
      why: archId === 'no_ai'
        ? "Warum ist das so? Es werden keine KI-Modelle aufgerufen. Selbst bei Beleg-Peaks am Jahresschluss fallen 0 € Tokenkosten an."
        : archId === 'automated_ai'
        ? `Warum ist das so? Pro Beleg wird ca. 1 gezielter Prompt (ca. 2.200 Tokens) aufgerufen. Geringe, exakt berechenbare Stückkosten.`
        : `Warum ist das so? Tool-Loops und Sub-Agenten erzeugen pro Vorgang zwischen 8.000 und 20.000 Tokens. Bei Volumen-Peaks steigt das IT-Budget spürbar.`
    };

    const c_level_true_cost: CLevelDimensionDetail = {
      title: "5. True Cost per Transaction",
      score: `${true_cost_per_transaction_eur.toFixed(2)} € / Vorgang`,
      status: true_cost_per_transaction_eur < 2.0 ? 'optimal' : true_cost_per_transaction_eur < 5.0 ? 'warning' : 'critical',
      answer: `End-to-End Stückkosten: ${true_cost_per_transaction_eur.toFixed(2)} € pro abgearbeiteten Fall.`,
      why: `Warum ist das so? Summe aus Token-OPEX (${(monthly_token_cost_eur/vol_safe).toFixed(2)} €) + Restrisiko-Schaden (${(residual_risk_eur/vol_safe).toFixed(2)} €) + Fiori HITL Nacharbeitszeit (${(hitl_cost_eur/vol_safe).toFixed(2)} €).`
    };

    const def = ARCHETYPE_DEFINITIONS[archId];
    benchmarks[archId] = {
      archetype_id: archId,
      archetype_name: def.name,
      icon: def.icon,
      badge_color: def.badge_color,
      avg_latency_sec,
      sla_fulfilled,
      monthly_token_cost_eur,
      monthly_hitl_volume,
      hitl_rate_pct,
      monthly_residual_error_volume,
      residual_risk_eur,
      fte_saved,
      monthly_manual_labor_saved_eur,
      true_cost_per_transaction_eur,
      eval_rating,
      eval_reason,
      executive_summary_why,
      risk_traffic_lights,
      argumentation_helper,
      c_level: {
        sla_guarantee: c_level_sla,
        backlog_risk: c_level_backlog,
        workforce_impact: c_level_workforce,
        budget_risk: c_level_budget,
        true_cost_per_case: c_level_true_cost
      }
    };
  }

  let recommended_archetype_id: ArchetypeId = 'automated_ai';
  if (u_safe <= 0.10) {
    recommended_archetype_id = 'no_ai';
  } else if (u_safe <= 0.50 && sla_safe <= 8.0) {
    recommended_archetype_id = 'automated_ai';
  } else if (u_safe <= 0.75 && active_steps.length <= 4) {
    recommended_archetype_id = 'agent_workflow';
  } else if (u_safe <= 0.90) {
    recommended_archetype_id = 'agentic_automation';
  } else {
    recommended_archetype_id = 'multi_agent';
  }

  const recommendation_reason = benchmarks[recommended_archetype_id]?.eval_reason || "Wirtschaftlich optimaler Sweet Spot.";
  const active_archetype_id = selected_archetype || derived_archetype_id;
  const active_benchmark = benchmarks[active_archetype_id];

  return {
    volume: vol_safe,
    unstructured_ratio: u_safe,
    data_quality: q_safe,
    cost_per_error: cost_err_safe,
    sla_latency: sla_safe,
    derived_archetype_id,
    recommended_archetype_id,
    recommendation_reason,
    active_archetype_id,
    benchmarks,
    active_benchmark
  };
}
