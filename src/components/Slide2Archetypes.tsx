import React, { useState } from 'react';
import { ARCHETYPE_DEFINITIONS } from '../data/useCases';
import type { ArchetypeId, UseCase } from '../types';
import { ArrowRight, Cpu, Target, Layers, Network, CheckCircle2, Sparkles } from 'lucide-react';

interface Slide2Props {
  useCase: UseCase;
  onNext: () => void;
}

export const Slide2Archetypes: React.FC<Slide2Props> = ({ useCase, onNext }) => {
  const [activeArchetype, setActiveArchetype] = useState<ArchetypeId>(useCase.sweet_spot_archetype);

  const archetypeIds: ArchetypeId[] = ['no_ai', 'automated_ai', 'agent_workflow', 'agentic_automation', 'multi_agent'];
  const currentDef = ARCHETYPE_DEFINITIONS[activeArchetype];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER TITLE CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            AI Architecture Blueprint Guide (Tobias Zwingmann Taxonomie)
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Entscheidungshilfe gegen Über-Engineering im S/4HANA-Umfeld
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
          Die 5 AI-Workflow-Archetypen im Vergleich
        </h1>
        <p className="text-slate-300 max-w-4xl text-sm leading-relaxed">
          Wählen Sie einen Archetypen aus, um das visuelle Prozess-Flussdiagramm, das Risikoprofil, die Latenzen und die Governance-Auditierbarkeit zu analysieren.
        </p>

        {/* ARCHETYPE SELECTION TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-6">
          {archetypeIds.map((id) => {
            const def = ARCHETYPE_DEFINITIONS[id];
            const isActive = activeArchetype === id;
            const isRecommended = useCase.sweet_spot_archetype === id;

            return (
              <button
                key={id}
                onClick={() => setActiveArchetype(id)}
                className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-blue-900/40 border-blue-500 text-white shadow-xl shadow-blue-500/20 scale-105'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full border border-emerald-300 shadow-md">
                    SWEET SPOT
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{def.icon}</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{def.short_name}</span>
                </div>
                <div className="text-xs font-black truncate">{def.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED ARCHETYPE DETAIL VIEW */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="text-4xl p-3 bg-slate-950 rounded-2xl border border-slate-800">{currentDef.icon}</div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Ausgewählter Archetyp</div>
              <h2 className="text-2xl font-black text-white">{currentDef.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentDef.badge_color}`}>
              {currentDef.short_name}
            </span>
            {useCase.sweet_spot_archetype === activeArchetype && (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Optimal für {useCase.id}</span>
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-200 text-base leading-relaxed font-medium">
          {currentDef.description}
        </p>

        {/* VISUAL FLOW DIAGRAM SCHEMATIC */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Visuelles Prozess-Flussdiagramm (Architektur-Schema)</span>
          </div>

          {activeArchetype === 'no_ai' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">Eingang (EDI/DB)</div>
              <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-blue-950 border border-blue-600 rounded-lg font-mono text-center text-blue-300 font-bold w-full sm:w-auto">100% ABAP Logic Engine</div>
              <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-lg font-mono text-center text-emerald-300 font-bold w-full sm:w-auto">S/4HANA BAPI Booking (0.1s)</div>
            </div>
          )}

          {activeArchetype === 'automated_ai' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">PDF/Mail Input</div>
              <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-blue-900/50 border border-blue-500 rounded-lg font-mono text-center text-blue-200 font-bold w-full sm:w-auto">Prompt Chain / Router Call</div>
              <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">ABAP Check</div>
              <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-lg font-mono text-center text-emerald-300 font-bold w-full sm:w-auto">S/4HANA Verbuchung</div>
            </div>
          )}

          {activeArchetype === 'agent_workflow' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">Unvollständiger Input</div>
              <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border-2 border-emerald-500 rounded-lg font-mono text-center text-emerald-200 font-bold w-full sm:w-auto flex items-center gap-2 justify-center">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Single ReAct Agent (Tool Loops)</span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-lg font-mono text-center text-emerald-300 font-bold w-full sm:w-auto">S/4HANA BP/ERP API</div>
            </div>
          )}

          {activeArchetype === 'agentic_automation' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">Kunden-Reklamation</div>
              <ArrowRight className="w-5 h-5 text-purple-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-purple-950 border border-purple-500 rounded-lg font-mono text-center text-purple-300 font-bold w-full sm:w-auto">Starrer Workflow-Rahmen</div>
              <ArrowRight className="w-5 h-5 text-purple-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-purple-900/60 border border-purple-400 rounded-lg font-mono text-center text-purple-200 font-bold w-full sm:w-auto">Teil-Agenten an Ausnahmen</div>
              <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-lg font-mono text-center text-emerald-300 font-bold w-full sm:w-auto">S/4HANA Gutschrift</div>
            </div>
          )}

          {activeArchetype === 'multi_agent' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg font-mono text-center w-full sm:w-auto">Komplexer Capex-Antrag</div>
              <ArrowRight className="w-5 h-5 text-amber-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-amber-950 border-2 border-amber-500 rounded-lg font-mono text-center text-amber-200 font-bold w-full sm:w-auto flex items-center gap-2 justify-center">
                <Network className="w-4 h-4 text-amber-400" />
                <span>Agenten-Schwarm (Finance, Risk, ERP Agent)</span>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 rotate-90 sm:rotate-0" />
              <div className="p-3 bg-emerald-950 border border-emerald-600 rounded-lg font-mono text-center text-emerald-300 font-bold w-full sm:w-auto">S/4HANA WBS Element</div>
            </div>
          )}
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">⏱️ Typische Latenz</div>
            <div className="text-lg font-black text-white">{currentDef.latency_range}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">💸 Token-Kosten Tier</div>
            <div className="text-lg font-black text-white">{currentDef.cost_tier}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">🌊 Halluzinations-Risiko</div>
            <div className="text-lg font-black text-white">{currentDef.error_risk}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">🛡️ Governance / Audit</div>
            <div className="text-lg font-black text-white">{currentDef.governance_score}</div>
          </div>
        </div>

        <div className="bg-blue-950/40 p-4 rounded-2xl border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
            <span><strong>Ideal geeignet für:</strong> {currentDef.ideal_for}</span>
          </div>
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-all cursor-pointer text-xs shrink-0 shadow-lg shadow-blue-500/30"
          >
            Zum Live Simulator ➔
          </button>
        </div>

      </div>

      {/* NEXT SLIDE ACTION BUTTON */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Weiter zu Slide 3: CIO Live-Simulator &amp; Benchmark</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
