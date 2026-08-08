import React from 'react';
import { ARCHETYPE_DEFINITIONS } from '../data/useCases';
import type { ArchetypeId } from '../types';
import { ZwingmannWorkflowGraph } from './ZwingmannWorkflowGraph';
import { X, BookOpen } from 'lucide-react';

interface ZwingmannTaxonomyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZwingmannTaxonomyDrawer: React.FC<ZwingmannTaxonomyDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const archetypeIds: ArchetypeId[] = [
    'no_ai',
    'automated_ai',
    'agent_workflow',
    'agentic_automation',
    'multi_agent'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6 relative text-slate-900">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-2xl border border-blue-200 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">AI Architecture Taxonomie (Tobias Zwingmann)</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Visuelle Referenz-Diagramme &amp; Architektur-Definitionen der 5 Muster</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 ARCHETYPES CARDS WITH VISUAL GRAPH DIAGRAMS */}
        <div className="space-y-6">
          {archetypeIds.map((id) => {
            const def = ARCHETYPE_DEFINITIONS[id];

            return (
              <div key={id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{def.icon}</span>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{def.name}</h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{def.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${def.badge_color}`}>
                    {def.short_name}
                  </span>
                </div>

                {/* VISUAL ARCHITECTURE WORKFLOW GRAPH DIAGRAM */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Visueller Prozess-Graph (Kästchen, Kreise &amp; Entschleidungs-Rauten):
                  </span>
                  <ZwingmannWorkflowGraph archetypeId={id} />
                </div>

                {/* METRICS ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-200">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-bold text-[10px] uppercase">Latenz:</span>
                    <span className="font-mono font-black text-slate-900">{def.latency_range}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-bold text-[10px] uppercase">Token OPEX:</span>
                    <span className="font-mono font-black text-slate-900">{def.cost_tier}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-bold text-[10px] uppercase">Halluzinationsrisiko:</span>
                    <span className="font-mono font-black text-slate-900">{def.error_risk}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-bold text-[10px] uppercase">Governance &amp; Audit:</span>
                    <span className="font-mono font-black text-slate-900">{def.governance_score}</span>
                  </div>
                </div>

                <div className="text-xs text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-200 font-medium">
                  💡 <strong>Ideal für:</strong> {def.ideal_for}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
