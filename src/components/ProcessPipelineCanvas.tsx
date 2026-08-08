import React, { useState } from 'react';
import type { UseCase, StepDetail, StepImplType, ArchetypeId } from '../types';
import { Layers, Plus, Trash2, ArrowRight, Play, CheckCircle2, Sparkles, Info, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

interface ProcessPipelineCanvasProps {
  currentUc: UseCase;
  onStepUpdate: (steps: StepDetail[]) => void;
  onApplyArchetypePreset: (archId: ArchetypeId) => void;
  onResetToUniversal: () => void;
}

export const ProcessPipelineCanvas: React.FC<ProcessPipelineCanvasProps> = ({
  currentUc,
  onStepUpdate,
  onApplyArchetypePreset,
  onResetToUniversal
}) => {
  const [selectedStepId, setSelectedStepId] = useState<string>(currentUc.steps[0]?.id || '');
  const [newStepName, setNewStepName] = useState('');
  const [showAdvancedSliders, setShowAdvancedSliders] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Fallback if selected step was deleted
  const activeStep = currentUc.steps.find(s => s.id === selectedStepId) || currentUc.steps[0];
  const activeIndex = currentUc.steps.findIndex(s => s.id === activeStep?.id);

  const handleStepNameChange = (stepId: string, name: string) => {
    const updated = currentUc.steps.map(s => s.id === stepId ? { ...s, name } : s);
    onStepUpdate(updated);
  };

  const handleStepTypeChange = (stepId: string, implType: StepImplType) => {
    const updated = currentUc.steps.map(s => s.id === stepId ? { ...s, implType } : s);
    onStepUpdate(updated);
  };

  const handleStepFactorChange = (stepId: string, factorKey: 'apiDepth' | 'agentScale' | 'logicDensity', val: number) => {
    const updated = currentUc.steps.map(s => s.id === stepId ? { ...s, [factorKey]: val } : s);
    onStepUpdate(updated);
  };

  const handleAddStep = () => {
    if (!newStepName.trim()) return;
    const newId = `step_${Date.now()}`;
    const newStep: StepDetail = {
      id: newId,
      name: newStepName.trim(),
      desc: "Kundenindividueller Z-Prozess-Schritt",
      tech: "Custom Service",
      cfo: "Prozess-Schritt",
      implType: "deterministic",
      apiDepth: 1,
      agentScale: 1,
      logicDensity: 2
    };
    onStepUpdate([...currentUc.steps, newStep]);
    setSelectedStepId(newId);
    setNewStepName('');
  };

  const handleRemoveStep = (stepId: string) => {
    if (currentUc.steps.length <= 1) return;
    const updated = currentUc.steps.filter(s => s.id !== stepId);
    onStepUpdate(updated);
    if (selectedStepId === stepId) {
      setSelectedStepId(updated[0]?.id || '');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER & RESET BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {currentUc.id === "UNIVERSAL" ? "Generalistischer Universal-Prozess" : `SAP Muster: ${currentUc.id}`}
            </span>
            <span className="text-xs text-slate-500 font-bold font-mono">Modul: {currentUc.module}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">{currentUc.name}</h1>
          <p className="text-xs text-slate-600 font-medium mt-0.5">{currentUc.short_desc}</p>
        </div>

        <button
          onClick={onResetToUniversal}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
        >
          🔄 Generalistischen Editor laden
        </button>
      </div>

      {/* 1-CLICK ARCHETYPE PRESET MODE TRANSFORMER BAR */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              1-Klick Archetypen-Transformation für diesen Prozess:
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Gesamtprozess per Klick umstellen</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
          <button
            onClick={() => onApplyArchetypePreset('no_ai')}
            className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-center transition-all cursor-pointer shadow-xs"
          >
            ⚙️ 1. No AI (ABAP)
          </button>

          <button
            onClick={() => onApplyArchetypePreset('automated_ai')}
            className="p-2.5 rounded-xl border border-blue-200 bg-blue-600 hover:bg-blue-700 text-white text-center transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            ⚡ 2. Automated AI
          </button>

          <button
            onClick={() => onApplyArchetypePreset('agent_workflow')}
            className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-700 hover:bg-emerald-800 text-white text-center transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            🎯 3. AI Agent
          </button>

          <button
            onClick={() => onApplyArchetypePreset('agentic_automation')}
            className="p-2.5 rounded-xl border border-purple-300 bg-purple-700 hover:bg-purple-800 text-white text-center transition-all cursor-pointer shadow-md shadow-purple-500/20"
          >
            🟣 4. Agentic Auto
          </button>

          <button
            onClick={() => onApplyArchetypePreset('multi_agent')}
            className="p-2.5 rounded-xl border border-amber-300 bg-amber-600 hover:bg-amber-700 text-white text-center transition-all cursor-pointer shadow-md shadow-amber-500/20 col-span-2 sm:col-span-1"
          >
            🐝 5. Multi-Agent
          </button>
        </div>
      </div>

      {/* VISUAL STEP PIPELINE RIBBON (INTERACTIVE NODES) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Prozess-Ablauf (Schritt-Kästchen)</h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">Step anklicken zum Bearbeiten</span>
        </div>

        {/* HORIZONTAL / FLEX PIPELINE RIBBON */}
        <div className="flex flex-wrap items-center gap-2 py-2 overflow-x-auto">
          
          {/* START NODE */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-4 py-3 flex items-center gap-2.5 shrink-0 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">START</span>
              <span className="text-xs font-black text-slate-900">Eingang</span>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

          {/* STEP NODES */}
          {currentUc.steps.map((step, idx) => {
            const isSelected = activeStep?.id === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setSelectedStepId(step.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left shrink-0 min-w-[165px] relative ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 shadow-md ring-2 ring-blue-500/20 scale-105'
                      : step.implType === 'deterministic'
                      ? 'bg-slate-50 border-slate-300 hover:border-slate-400'
                      : step.implType === 'ai_llm_call'
                      ? 'bg-indigo-50/60 border-indigo-200 hover:border-indigo-300'
                      : 'bg-purple-50/60 border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold">
                      {step.implType === 'deterministic' ? '⚙️ No AI' : step.implType === 'ai_llm_call' ? '⚡ LLM' : '🎯 Agent'}
                    </span>
                  </div>

                  <div className="text-xs font-black text-slate-900 truncate max-w-[145px]">
                    {step.name}
                  </div>
                </button>

                {idx < currentUc.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}

          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

          {/* END NODE */}
          <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl px-4 py-3 flex items-center gap-2.5 shrink-0 shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-800 uppercase block">ENDE</span>
              <span className="text-xs font-black text-slate-900">Verbuchung</span>
            </div>
          </div>

        </div>

        {/* ADD NEW STEP BAR */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
          <input
            type="text"
            placeholder="Neuen Prozess-Schritt hinzufügen..."
            value={newStepName}
            onChange={(e) => setNewStepName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
            className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-2 text-xs font-medium outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          <button
            onClick={handleAddStep}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Schritt hinzufügen</span>
          </button>
        </div>
      </div>

      {/* SINGLE STEP INSPECTOR PANEL */}
      {activeStep && (
        <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-sm space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-sm flex items-center justify-center shrink-0">
                {activeIndex + 1}
              </span>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Schritt Name bearbeiten:</span>
                <input
                  type="text"
                  value={activeStep.name}
                  onChange={(e) => handleStepNameChange(activeStep.id, e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 text-sm font-black text-slate-900 w-full max-w-md focus:border-blue-600 focus:bg-white outline-none"
                />
              </div>
            </div>

            {currentUc.steps.length > 1 && (
              <button
                onClick={() => handleRemoveStep(activeStep.id)}
                className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span>Schritt löschen</span>
              </button>
            )}
          </div>

          {/* STEP TECHNOLOGY SELECTOR */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              1. Welche Ausprägung hat Step {activeIndex + 1}?
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              <button
                onClick={() => handleStepTypeChange(activeStep.id, 'deterministic')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  activeStep.implType === 'deterministic'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm mb-1 font-black">⚙️ Deterministisch (No AI)</div>
                <div className="text-[11px] font-normal opacity-80">Reiner ABAP/Rule-Code. 0 € Tokenkosten.</div>
              </button>

              <button
                onClick={() => handleStepTypeChange(activeStep.id, 'ai_llm_call')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  activeStep.implType === 'ai_llm_call'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm mb-1 font-black">⚡ Probabilistisch: AI Step</div>
                <div className="text-[11px] font-normal opacity-80">Gezielter Prompt-Aufruf (PDF, Mail).</div>
              </button>

              <button
                onClick={() => handleStepTypeChange(activeStep.id, 'ai_agent_loop')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  activeStep.implType === 'ai_agent_loop'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-500/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm mb-1 font-black">🎯 Probabilistisch: AI Agent</div>
                <div className="text-[11px] font-normal opacity-80">Autonomer Agent mit API-Zugriffen.</div>
              </button>
            </div>
          </div>

          {/* COLLAPSIBLE ADVANCED COMPLEXITY SLIDERS BAR */}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => setShowAdvancedSliders(!showAdvancedSliders)}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>2. Komplexitäts-Feinjustierung für Step {activeIndex + 1} (S_i, A_i, N_i)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <span>{showAdvancedSliders ? "Einklappen" : "Ausklappen"}</span>
                {showAdvancedSliders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showAdvancedSliders && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-4 animate-fadeIn">
                
                {/* SLIDER 1: API DEPTH S_i WITH (i) INFO POPOVER */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 relative">
                  <div className="flex justify-between items-center text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>🌐 API-Tiefe (S_i)</span>
                      <button
                        onClick={() => setActiveTooltip(activeTooltip === 'apiDepth' ? null : 'apiDepth')}
                        className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                        title="Erklärung anzeigen"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-blue-600 font-mono font-black text-sm">{activeStep.apiDepth}</span>
                  </div>

                  {activeTooltip === 'apiDepth' && (
                    <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-10 animate-fadeIn">
                      <div className="font-bold text-blue-400">💡 Was bedeutet API-Tiefe (S_i = {activeStep.apiDepth})?</div>
                      <p>
                        In diesem Schritt werden genau <strong>{activeStep.apiDepth} synchrone API-Calls</strong> (z.B. BAPIs, RFCs oder Web-Services) hintereinander ausgeführt unter der Annahme, dass die Systeme erreichbar sind.
                      </p>
                    </div>
                  )}

                  <input
                    type="range" min="1" max="10" step="1"
                    value={activeStep.apiDepth}
                    onChange={(e) => handleStepFactorChange(activeStep.id, 'apiDepth', Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">{activeStep.apiDepth} Schnittstelle(n) getätigt</div>
                </div>

                {/* SLIDER 2: AGENT SCALE A_i WITH (i) INFO POPOVER */}
                <div className={`bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 relative ${activeStep.implType !== 'ai_agent_loop' ? 'opacity-30' : ''}`}>
                  <div className="flex justify-between items-center text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>🐝 Agent Scale (A_i)</span>
                      <button
                        onClick={() => setActiveTooltip(activeTooltip === 'agentScale' ? null : 'agentScale')}
                        disabled={activeStep.implType !== 'ai_agent_loop'}
                        className="text-purple-600 hover:text-purple-800 p-0.5 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                        title="Erklärung anzeigen"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-purple-600 font-mono font-black text-sm">{activeStep.agentScale}</span>
                  </div>

                  {activeTooltip === 'agentScale' && activeStep.implType === 'ai_agent_loop' && (
                    <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-10 animate-fadeIn">
                      <div className="font-bold text-purple-400">💡 Was bedeutet Agent Scale (A_i = {activeStep.agentScale})?</div>
                      <p>
                        Der Agent steuert eine Hierarchie aus bis zu <strong>{activeStep.agentScale} spezialisierten Sub-Agenten</strong> (z.B. Recherche-, Parsing- und Buchungs-Agenten), die Aufgaben autonom verhandeln.
                      </p>
                    </div>
                  )}

                  <input
                    type="range" min="1" max="10" step="1"
                    disabled={activeStep.implType !== 'ai_agent_loop'}
                    value={activeStep.agentScale}
                    onChange={(e) => handleStepFactorChange(activeStep.id, 'agentScale', Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">{activeStep.agentScale} Sub-Agent(en) in Hierarchie</div>
                </div>

                {/* SLIDER 3: LOGIC DENSITY N_i WITH (i) INFO POPOVER */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 relative">
                  <div className="flex justify-between items-center text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>📄 Regeldichte (N_i)</span>
                      <button
                        onClick={() => setActiveTooltip(activeTooltip === 'logicDensity' ? null : 'logicDensity')}
                        className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Erklärung anzeigen"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-emerald-600 font-mono font-black text-sm">{activeStep.logicDensity}</span>
                  </div>

                  {activeTooltip === 'logicDensity' && (
                    <div className="bg-slate-900 text-white p-3 rounded-xl text-[11px] leading-relaxed shadow-lg space-y-1 z-10 animate-fadeIn">
                      <div className="font-bold text-emerald-400">💡 Was bedeutet Regeldichte (N_i = {activeStep.logicDensity})?</div>
                      <p>
                        Dieser Schritt prüft <strong>{activeStep.logicDensity} verschachtelte Geschäftsregeln</strong> (z.B. Toleranzgrenzen, Skontofristen, Steuersätze). Jede Regel erhöht die Prüftiefe im SAP.
                      </p>
                    </div>
                  )}

                  <input
                    type="range" min="1" max="10" step="1"
                    value={activeStep.logicDensity}
                    onChange={(e) => handleStepFactorChange(activeStep.id, 'logicDensity', Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">{activeStep.logicDensity} Geschäftsregel(n) im Abgleich</div>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
