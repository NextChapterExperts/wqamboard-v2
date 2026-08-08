import React, { useState } from 'react';
import type { UseCase } from '../types';
import { ENTERPRISE_USE_CASES } from '../data/useCases';
import { BookOpen, Info } from 'lucide-react';

interface StudioHeaderProps {
  currentUc: UseCase;
  onSelectUc: (id: string) => void;
  onParamChange: (key: string, value: any) => void;
  onToggleTaxonomy: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentUc,
  onSelectUc,
  onParamChange,
  onToggleTaxonomy
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const useCaseOptions = [
    { id: "UNIVERSAL", label: "🌟 Freier Universeller Prozess (Neutral)" },
    ...Object.values(ENTERPRISE_USE_CASES).map(uc => ({
      id: uc.id,
      label: `🏢 ${uc.id}: ${uc.name} (${uc.module})`
    }))
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* BRAND & PRESET SELECTOR */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              W2
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 tracking-wider uppercase block">WAQAM v2.0</span>
              <span className="text-[10px] text-slate-500 font-medium">SAP Architecture Studio</span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* USE CASE PRESET DROPDOWN */}
          <div className="flex-1 md:w-80">
            <select
              value={currentUc.id}
              onChange={(e) => onSelectUc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
            >
              {useCaseOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GLOBAL WORKLOAD PARAMETERS BAR WITH (i) INFO POPOVERS */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium w-full md:w-auto justify-end">
          
          {/* PARAM 1: VOLUME */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 relative">
            <span className="text-slate-500 font-bold">Volumen:</span>
            <input
              type="number"
              value={currentUc.params.volume}
              onChange={(e) => onParamChange('volume', Number(e.target.value))}
              className="w-20 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-600"
            />
            <span className="text-slate-400 font-bold text-[10px]">/Jahr</span>

            <button
              onClick={() => setActiveTooltip(activeTooltip === 'vol' ? null : 'vol')}
              className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
              title="Formel-Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {activeTooltip === 'vol' && (
              <div className="absolute top-10 right-0 w-72 bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-xl z-50 animate-fadeIn">
                <div className="font-bold text-blue-400 mb-1">💡 Volumen-Parameter</div>
                <p>
                  Berechnungsbasis: <strong>{currentUc.params.volume.toLocaleString('de-DE')} Belege/Jahr</strong>. Bestimmt den monatlichen Durchsatz, die Token-OPEX und den FTE-Entlastungsfaktor.
                </p>
              </div>
            )}
          </div>

          {/* PARAM 2: UNSTRUCTURED RATIO */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 relative">
            <span className="text-slate-500 font-bold">Unstrukturiert:</span>
            <input
              type="range" min="0" max="1" step="0.05"
              value={currentUc.params.unstructured_ratio}
              onChange={(e) => onParamChange('unstructured_ratio', Number(e.target.value))}
              className="w-16 accent-blue-600 cursor-pointer"
            />
            <span className="text-slate-900 font-mono font-bold w-9 text-right">
              {Math.round(currentUc.params.unstructured_ratio * 100)}%
            </span>

            <button
              onClick={() => setActiveTooltip(activeTooltip === 'unstructured' ? null : 'unstructured')}
              className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
              title="Formel-Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {activeTooltip === 'unstructured' && (
              <div className="absolute top-10 right-0 w-72 bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-xl z-50 animate-fadeIn">
                <div className="font-bold text-amber-400 mb-1">💡 Unstrukturierungs-Grad</div>
                <p>
                  Berechnungsbasis: <strong>{Math.round(currentUc.params.unstructured_ratio * 100)}% Freitext/PDF-Anteil</strong>. Bei Werten &gt; 20% scheitert deterministischer ABAP-Code ohne KI und erzeugt Nacharbeits-Wellen.
                </p>
              </div>
            )}
          </div>

          {/* PARAM 3: SLA LATENCY */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 relative">
            <span className="text-slate-500 font-bold">SLA:</span>
            <input
              type="number" step="0.5"
              value={currentUc.params.sla_latency}
              onChange={(e) => onParamChange('sla_latency', Number(e.target.value))}
              className="w-12 bg-white border border-slate-300 rounded px-1 text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-600"
            />
            <span className="text-slate-400 font-bold text-[10px]">s</span>

            <button
              onClick={() => setActiveTooltip(activeTooltip === 'sla' ? null : 'sla')}
              className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
              title="Formel-Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {activeTooltip === 'sla' && (
              <div className="absolute top-10 right-0 w-72 bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-xl z-50 animate-fadeIn">
                <div className="font-bold text-emerald-400 mb-1">💡 SLA-Reaktionszeit</div>
                <p>
                  Berechnungsbasis: Max. <strong>{currentUc.params.sla_latency} Sekunden</strong>. Vertraglich geforderte Antwortzeit. Agenten-Loops oder Schwärme können dieses SLA brechen.
                </p>
              </div>
            )}
          </div>

          {/* TAXONOMY DRAWER BUTTON */}
          <button
            onClick={onToggleTaxonomy}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Taxonomie</span>
          </button>

        </div>

      </div>
    </header>
  );
};
