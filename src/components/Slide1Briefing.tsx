import React, { useState } from 'react';
import type { UseCase } from '../types';
import { ARCHETYPE_DEFINITIONS } from '../data/useCases';
import { ArrowRight, XCircle, CheckCircle2, AlertTriangle, Sparkles, ChevronDown, ChevronUp, Cpu } from 'lucide-react';

interface Slide1Props {
  useCase: UseCase;
  onNext: () => void;
}

export const Slide1Briefing: React.FC<Slide1Props> = ({ useCase, onNext }) => {
  const [showCxoBriefing, setShowCxoBriefing] = useState(true);
  const archetypeDef = ARCHETYPE_DEFINITIONS[useCase.sweet_spot_archetype];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* COLLAPSIBLE CIO EXECUTIVE BRIEFING CARD */}
      <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-2 border-blue-500/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-300 font-black text-xl shadow-lg shadow-blue-500/20 shrink-0">
              🏛️
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">SAP S/4HANA Transformation Steering</span>
              <h2 className="text-lg font-black text-white">CIO Management Briefing: Z-Prozess Transformation & Sizing</h2>
            </div>
          </div>

          <button
            onClick={() => setShowCxoBriefing(!showCxoBriefing)}
            className="bg-blue-900/40 hover:bg-blue-800/50 text-blue-300 border border-blue-500/40 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
          >
            <span>{showCxoBriefing ? "Briefing ausblenden" : "Briefing einblenden"}</span>
            {showCxoBriefing ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showCxoBriefing && (
          <div className="space-y-4 pt-4 mt-3 border-t border-blue-500/30 animate-fadeIn">
            <p className="text-slate-200 text-sm leading-relaxed font-normal">
              Bei der Migration zu <strong>SAP S/4HANA</strong> stehen Sie vor der Entscheidung: Was passiert mit kundenindividuellen <strong>Z-Prozessen</strong>? Das <strong>WA-QAM v2 Framework</strong> bewertet Ihre Z-Workflows über 5 KI-Workflow-Archetypen (nach Tobias Zwingmann), um Über-Engineering zu verhindern und den optimalen Sweet Spot zu ermitteln.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <div className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <span>🏢 1. Der S/4HANA Aufhänger</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Endverarbeitung erfolgt <strong>immer sicher im SAP-Kern</strong> (BAPIs/RFCs). Standard-SAP-Prozesse werden nicht agentisiert; untersuchte Z-Prozesse sind typische kundenindividuelle Ausnahmen.
                </p>
              </div>

              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <div className="font-bold text-sky-400 text-sm flex items-center gap-2">
                  <span>📐 2. Technologie-Agnostische Engine</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Bewertet neutral die <strong>5 Zwingmann-Archetypen</strong> (No AI bis Multi-Agent System) – völlig unabhängig, ob Sie SAP Joule, OpenAI, Claude oder Custom Python Agents einsetzen.
                </p>
              </div>

              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <span>💼 3. 5 C-Level Business Dimensionen</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Keine technischen Formeln, sondern direkte Vorstandsantworten: <strong>SLA-Garantie, Backlog-Welle, Workforce Impact, Budget-Skalierungsrisiko &amp; True Cost per Case</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EXECUTIVE HERO HEADER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
              Modul: {useCase.module}
            </span>
            <span className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
              Einsparpotenzial: {useCase.fte}
            </span>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            ID: <span className="text-slate-300 font-bold">{useCase.id}</span> · SAP Entities: <code className="text-sky-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">{useCase.sap_entities}</code>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
          {useCase.name}
        </h1>
        <p className="text-lg text-slate-300 max-w-4xl leading-relaxed mb-6 font-medium">
          {useCase.short_desc}
        </p>

        {/* SWEET SPOT ARCHETYPE BADGE */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{archetypeDef.icon}</div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Empfohlener Sweet Spot (Archetyp)</div>
              <div className="text-base font-black text-white flex items-center gap-2">
                <span>{archetypeDef.name}</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${archetypeDef.badge_color}`}>
                  {archetypeDef.short_name}
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-md bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            💡 {useCase.sweet_spot_reason}
          </div>
        </div>
      </div>

      {/* CFO MANAGEMENT SUMMARY: VORHER VS. NACHHER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* STATUS QUO */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-7 relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 text-rose-400 font-bold text-lg">
              <XCircle className="w-6 h-6 flex-shrink-0" />
              <h3>Status Quo im S/4HANA (Ohne KI-Optimierung)</h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed font-normal">
              {useCase.status_quo}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center gap-2 text-xs text-rose-300 font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Manuelle Überlastung der Fachabteilung &amp; verzögerte Durchlaufzeiten</span>
          </div>
        </div>

        {/* KI-DELTA CARD */}
        <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-3xl p-7 relative overflow-hidden shadow-2xl flex flex-col justify-between shadow-emerald-500/10">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <h3>Transformierte Ziel-Architektur</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1 shrink-0">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Smart Hybrid Integration</span>
              </span>
            </div>
            <p className="text-slate-300 text-base leading-relaxed font-normal mb-3">
              {useCase.ai_delta}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Sicherer S/4HANA BAPI-Abschluss &amp; Hoher ROI
            </span>
            <button 
              onClick={onNext}
              className="text-[11px] text-emerald-400 font-bold underline decoration-emerald-500/50 underline-offset-4 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Zu den Archetypen ➔
            </button>
          </div>
        </div>

      </div>

      {/* NEXT SLIDE ACTION BUTTON */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Weiter zu Slide 2: Architecture Blueprints (5 Archetypen)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
