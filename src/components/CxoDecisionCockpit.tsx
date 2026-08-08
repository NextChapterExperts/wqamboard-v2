import React, { useState } from 'react';
import type { SimulationResult, ArchetypeId } from '../types';
import { ARCHETYPE_DEFINITIONS } from '../data/useCases';
import { ZwingmannWorkflowGraph } from './ZwingmannWorkflowGraph';
import { Sparkles, ChevronDown, ChevronUp, HelpCircle, Mic, Layers, Info } from 'lucide-react';

interface CxoDecisionCockpitProps {
  simResult: SimulationResult;
  onSelectArchetype?: (archId: ArchetypeId) => void;
}

export const CxoDecisionCockpit: React.FC<CxoDecisionCockpitProps> = ({
  simResult,
  onSelectArchetype
}) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showArgHelper, setShowArgHelper] = useState(true);
  const [showDerivedArchetype, setShowDerivedArchetype] = useState(false);
  const [activeValueTooltip, setActiveValueTooltip] = useState<string | null>(null);

  const derivedDef = ARCHETYPE_DEFINITIONS[simResult.derived_archetype_id];
  const activeBench = simResult.active_benchmark;
  const argHelper = activeBench.argumentation_helper;
  const traffic = activeBench.risk_traffic_lights;

  return (
    <div className="space-y-6 sticky top-24">
      
      {/* 1. TOP PRIMARY SECTION: C-LEVEL AUSWERTUNG & BEGRÜNDUNGEN (WITH INTEGRATED RATING & RISK TRAFFIC LIGHTS) */}
      <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-sm space-y-5">
        
        {/* HEADER WITH OVERALL RATING CHIP & TITLE */}
        <div className="border-b border-slate-200 pb-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">C-Level Auswertung &amp; Beweggründe</h2>
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full shadow-xs">
              Bewertung: {activeBench.eval_rating}
            </span>
          </div>

          {/* INTEGRATED RISK TRAFFIC LIGHTS BAR */}
          <div className="grid grid-cols-3 gap-2 text-xs text-center font-bold pt-1">
            <div className={`p-2 rounded-xl border ${
              traffic.sla_risk === '🟢 OK'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">SLA / Latenz</span>
              <span className="text-xs font-black">{traffic.sla_risk}</span>
            </div>

            <div className={`p-2 rounded-xl border ${
              traffic.backlog_risk === '🟢 OK'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : traffic.backlog_risk === '🟡 MODERATE'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Backlog-Welle</span>
              <span className="text-xs font-black">{traffic.backlog_risk}</span>
            </div>

            <div className={`p-2 rounded-xl border ${
              traffic.budget_risk === '🟢 LOW'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : traffic.budget_risk === '🟡 MEDIUM'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Token-OPEX</span>
              <span className="text-xs font-black">{traffic.budget_risk}</span>
            </div>
          </div>
        </div>

        {/* 5 EXECUTIVE C-LEVEL KPI CARDS WITH EXPLICIT WHY RATIONALE & VALUE (i) POPOVERS */}
        <div className="space-y-3">
          
          {/* KPI 1: LATENCY */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">⏱️ 1. Betriebsfähigkeit &amp; SLA</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 font-mono">{activeBench.c_level.sla_guarantee.score}</span>
                <button
                  onClick={() => setActiveValueTooltip(activeValueTooltip === 'sla_val' ? null : 'sla_val')}
                  className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                  title="Formel-Details"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {activeValueTooltip === 'sla_val' && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-20 animate-fadeIn">
                <div className="font-bold text-blue-400">💡 Formel &amp; Token-Inferenz: Latenz</div>
                <p>
                  Summe aller Step-Latenzen = <strong>Base (0,1s) + (S_i - 1)*0,1s + (A_i - 1)*1,2s + Inferenzzeit</strong>. Prüft, ob die Ausführung das vertragliche SLA von {simResult.sla_latency}s unterschreitet.
                </p>
              </div>
            )}

            <p className="text-xs text-slate-800 font-bold">{activeBench.c_level.sla_guarantee.answer}</p>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-medium">
              💡 {activeBench.c_level.sla_guarantee.why}
            </div>
          </div>

          {/* KPI 2: BACKLOG */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">🌊 2. Nacharbeits-Welle</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 font-mono">{activeBench.c_level.backlog_risk.score}</span>
                <button
                  onClick={() => setActiveValueTooltip(activeValueTooltip === 'hitl_val' ? null : 'hitl_val')}
                  className="text-amber-600 hover:text-amber-800 p-0.5 rounded-full hover:bg-amber-100 transition-colors cursor-pointer"
                  title="Formel-Details"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {activeValueTooltip === 'hitl_val' && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-20 animate-fadeIn">
                <div className="font-bold text-amber-400">💡 Formel: Fiori HITL Nacharbeit</div>
                <p>
                  Berechnung: <strong>(Fehlschlagquote * Unstrukturierungsgrad) * Monatsvolumen</strong>. Belege, die vom Code oder der KI nicht dunkelverbucht werden können, landen als Nacharbeits-Fall in Fiori.
                </p>
              </div>
            )}

            <p className="text-xs text-slate-800 font-bold">{activeBench.c_level.backlog_risk.answer}</p>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-medium">
              💡 {activeBench.c_level.backlog_risk.why}
            </div>
          </div>

          {/* KPI 3: WORKFORCE */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">👥 3. Kapazitäts-Entlastung</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-emerald-700 font-mono">{activeBench.c_level.workforce_impact.score}</span>
                <button
                  onClick={() => setActiveValueTooltip(activeValueTooltip === 'fte_val' ? null : 'fte_val')}
                  className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                  title="Formel-Details"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {activeValueTooltip === 'fte_val' && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-20 animate-fadeIn">
                <div className="font-bold text-emerald-400">💡 Formel: Echte FTE-Entlastung</div>
                <p>
                  Berechnung: <strong>(Dunkelverbuchte Monatsbelege * 15 Min. manuelle Erfassung) / 160 Monatsarbeitsstunden</strong>. Gibt die netto freigesetzten Vollzeit-Arbeitskräfte an.
                </p>
              </div>
            )}

            <p className="text-xs text-slate-800 font-bold">{activeBench.c_level.workforce_impact.answer}</p>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-medium">
              💡 {activeBench.c_level.workforce_impact.why}
            </div>
          </div>

          {/* KPI 4: BUDGET OPEX */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">💸 4. Token-OPEX Budget</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 font-mono">{activeBench.c_level.budget_risk.score}</span>
                <button
                  onClick={() => setActiveValueTooltip(activeValueTooltip === 'token_val' ? null : 'token_val')}
                  className="text-purple-600 hover:text-purple-800 p-0.5 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                  title="Formel-Details"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {activeValueTooltip === 'token_val' && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-20 animate-fadeIn">
                <div className="font-bold text-purple-400">💡 Token-Berechnung &amp; OPEX-Formel</div>
                <p>
                  Berechnung: <strong>(Monatsbelege * Tokens_per_Step / 1.000.000) * 5,00 €/1M Tokens</strong>.<br />
                  • ⚙️ <em>No-AI:</em> 0 Tokens = 0 €.<br />
                  • ⚡ <em>Automated AI:</em> ~2.200 Tokens/Beleg.<br />
                  • 🎯 <em>Agent Loop:</em> ~8.000 bis 18.000 Tokens/Beleg.
                </p>
              </div>
            )}

            <p className="text-xs text-slate-800 font-bold">{activeBench.c_level.budget_risk.answer}</p>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-medium">
              💡 {activeBench.c_level.budget_risk.why}
            </div>
          </div>

          {/* KPI 5: TRUE COST */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-2xl border border-emerald-300 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">💰 5. True Cost / Vorgang</span>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono">{activeBench.c_level.true_cost_per_case.score}</span>
                <button
                  onClick={() => setActiveValueTooltip(activeValueTooltip === 'true_cost_val' ? null : 'true_cost_val')}
                  className="text-emerald-700 hover:text-emerald-900 p-0.5 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                  title="Formel-Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {activeValueTooltip === 'true_cost_val' && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-20 animate-fadeIn">
                <div className="font-bold text-emerald-400">💡 Stückkosten-Formel: True Cost per Case</div>
                <p>
                  Berechnung: <strong>(Token-OPEX + Restrisiko-Schaden + Fiori HITL Nacharbeitszeit @ 62,50 €/Std) / Monatsvolumen</strong>. Zeigt die echten kaufmännischen End-to-End Stückkosten.
                </p>
              </div>
            )}

            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-[11px] text-slate-700 leading-relaxed font-medium">
              💡 {activeBench.c_level.true_cost_per_case.why}
            </div>
          </div>

        </div>
      </div>

      {/* 2. MIDDLE SECTION: C-LEVEL CONSULTANT ARGUMENTATION HELPER CARD */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Berater-Spickzettel für den C-Level Vortrag
            </h3>
          </div>

          <button
            onClick={() => setShowArgHelper(!showArgHelper)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
          >
            <span>{showArgHelper ? "Ausblenden" : "Einblenden"}</span>
            {showArgHelper ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showArgHelper && (
          <div className="space-y-3 text-xs leading-relaxed">
            {/* WHY BETTER OR WORSE */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 font-semibold text-slate-200">
              {argHelper.why_worse_or_better}
            </div>

            {/* 3 TALKING POINTS */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Die 3 stärksten Argumente für das CIO-Gespräch:
              </span>
              <ul className="space-y-1.5 pl-1">
                {argHelper.talking_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 font-medium">
                    <span className="text-amber-400 font-bold font-mono">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 3. LOWER SECTION: DERIVED ARCHETYPE CARD & GRAPH (COLLAPSIBLE / TOGGLEABLE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Ergebnis: Abgeleiteter Archetyp &amp; Prozess-Graph
            </h3>
          </div>

          <button
            onClick={() => setShowDerivedArchetype(!showDerivedArchetype)}
            className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
          >
            <span>{showDerivedArchetype ? "Ausblenden" : "Einblenden"}</span>
            {showDerivedArchetype ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showDerivedArchetype && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-4 pt-1">
              <div className="text-4xl p-3 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
                {derivedDef.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 font-mono">{derivedDef.short_name}</span>
                <h2 className="text-lg font-black text-slate-900">{derivedDef.name}</h2>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{derivedDef.description}</p>
              </div>
            </div>

            {/* VISUAL ARCHITECTURE WORKFLOW GRAPH DIAGRAM */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Visuelle Zwingmann-Struktur (Prozess-Graph):
              </span>
              <ZwingmannWorkflowGraph archetypeId={simResult.derived_archetype_id} compact={true} />
            </div>

            {/* WHY RATIONALE EXECUTIVE SUMMARY BOX */}
            <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200 text-xs text-blue-950 font-medium space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-900">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Warum ist das so? (CIO-Fazit)</span>
              </div>
              <p className="text-[11px] leading-relaxed text-blue-900/90 font-normal">
                {activeBench.executive_summary_why}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. BOTTOM MOST SECTION: 5-ARCHETYPE BENCHMARK MATRIX (TOGGLEABLE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">5-Archetypen Vergleichs-Matrix</h3>
          </div>

          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
          >
            <span>{showMatrix ? "Ausblenden" : "Einblenden"}</span>
            {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showMatrix && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase">
                  <th className="py-2.5 px-2">Archetyp</th>
                  <th className="py-2.5 px-2">Latenz</th>
                  <th className="py-2.5 px-2">Tokens</th>
                  <th className="py-2.5 px-2 text-right">True Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {(Object.keys(simResult.benchmarks) as ArchetypeId[]).map((archId) => {
                  const bench = simResult.benchmarks[archId];
                  const isDerived = simResult.derived_archetype_id === archId;

                  return (
                    <tr
                      key={archId}
                      onClick={() => onSelectArchetype && onSelectArchetype(archId)}
                      className={`cursor-pointer transition-all ${
                        isDerived
                          ? 'bg-blue-50 font-bold text-blue-950 border-l-4 border-l-blue-600'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <td className="py-3 px-2 flex items-center gap-1.5 truncate">
                        <span>{bench.icon}</span>
                        <span className="truncate font-bold">{bench.archetype_name.split('.')[1]?.trim() || bench.archetype_name}</span>
                      </td>
                      <td className="py-3 px-2 font-mono font-bold text-slate-800">{bench.avg_latency_sec}s</td>
                      <td className="py-3 px-2 font-mono font-bold text-slate-800">{bench.monthly_token_cost_eur} €</td>
                      <td className="py-3 px-2 text-right font-mono font-black text-emerald-700">
                        {bench.true_cost_per_transaction_eur.toFixed(2)} €
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
