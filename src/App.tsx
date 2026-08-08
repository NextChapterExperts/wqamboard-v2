import { useState } from 'react';
import { ENTERPRISE_USE_CASES } from './data/useCases';
import { runPcsWaqamSimulation } from './utils/pcsEngine';
import { StudioHeader } from './components/StudioHeader';
import { ProcessPipelineCanvas } from './components/ProcessPipelineCanvas';
import { CxoDecisionCockpit } from './components/CxoDecisionCockpit';
import { ZwingmannTaxonomyDrawer } from './components/ZwingmannTaxonomyDrawer';
import type { StepDetail, ArchetypeId, UseCase } from './types';

// Standardized C-Level Generalistic Universal Step Template
const UNIVERSAL_BLANK_USECASE: UseCase = {
  id: "UNIVERSAL",
  name: "Generalistischer Standard-Geschäftsprozess",
  module: "Standard C-Level Referenz-Workflow",
  fte: "5 FTE",
  short_desc: "Standardisierter Referenzprozess für Dokumentenverarbeitung (z.B. Rechnungen, Aufträge, Reklamationen).",
  sender: "📩 Beleg- & Dokumenteneingang (PDF / E-Mail / Portal)",
  receiver: "💾 ERP System-Endverbuchung (S/4HANA BAPI)",
  status_quo: "Manuelle Erfassung & Prüfung",
  ai_delta: "Vergleich aller 5 Zwingmann-Archetypen von No-AI bis Agentic",
  sap_entities: "Generic ERP Document",
  sweet_spot_archetype: "automated_ai",
  sweet_spot_reason: "Standardisierte Mischung aus KI-Extraktion und deterministischem Regelabgleich.",
  steps: [
    { id: "u_step1", name: "1. Beleg- & Dokumenteneingang", desc: "Erfassung aus E-Mail, PDF-Attachment oder Portal", tech: "Mail Gateway / API", cfo: "Eingang", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 },
    { id: "u_step2", name: "2. Datenextraktion & Parsing", desc: "Auslesen von Kopf- & Positionsdaten aus PDFs/Freitext", tech: "PDF Parser / LLM", cfo: "Extraktion", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
    { id: "u_step3", name: "3. Stammdaten & Regelabgleich", desc: "Prüfung gegen Kreditoren-, Debito- & Preisregeln", tech: "ERP Rules Engine", cfo: "Regel", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 3 },
    { id: "u_step4", name: "4. Ausnahme- & Disput-Klärung", desc: "Behandlung von Preisabweichungen & Skontoklärung", tech: "Workflow / Agent", cfo: "Klärung", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 3 },
    { id: "u_step5", name: "5. System-Endverbuchung", desc: "Transaktionssichere Buchung im ERP System", tech: "S/4HANA BAPI", cfo: "Buchung", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
  ],
  params: {
    volume: 10000,
    unstructured_ratio: 0.35,
    data_quality: 0.85,
    sla_latency: 15.0,
    cost_per_error: 100.0
  }
};

export function App() {
  const [selectedUcId, setSelectedUcId] = useState<string>("UNIVERSAL");
  const [useCases, setUseCases] = useState<Record<string, UseCase>>({
    "UNIVERSAL": UNIVERSAL_BLANK_USECASE,
    ...ENTERPRISE_USE_CASES
  });
  
  const [isTaxonomyOpen, setIsTaxonomyOpen] = useState<boolean>(false);

  const currentUc = useCases[selectedUcId] || useCases["UNIVERSAL"];
  const simResult = runPcsWaqamSimulation(currentUc.params, currentUc.steps);

  const handleParamChange = (key: string, value: any) => {
    setUseCases((prev) => ({
      ...prev,
      [selectedUcId]: {
        ...prev[selectedUcId],
        params: {
          ...prev[selectedUcId].params,
          [key]: value
        }
      }
    }));
  };

  const handleStepUpdate = (newSteps: StepDetail[]) => {
    setUseCases((prev) => ({
      ...prev,
      [selectedUcId]: {
        ...prev[selectedUcId],
        steps: newSteps
      }
    }));
  };

  // 1-CLICK ARCHETYPE PRESET MODE TRANSFORMER
  const handleApplyArchetypePreset = (archId: ArchetypeId) => {
    const updatedSteps: StepDetail[] = currentUc.steps.map((step, idx) => {
      let implType: StepDetail['implType'] = 'deterministic';
      let agentScale = 1;
      let apiDepth = step.apiDepth;

      switch (archId) {
        case 'no_ai':
          implType = 'deterministic';
          agentScale = 1;
          break;
        case 'automated_ai':
          // Step 2 Extraktion calls LLM
          implType = (idx === 1) ? 'ai_llm_call' : 'deterministic';
          agentScale = 1;
          break;
        case 'agent_workflow':
          // Step 2 and 4 handled by Agent
          implType = (idx === 1 || idx === 3) ? 'ai_agent_loop' : 'deterministic';
          agentScale = 3;
          break;
        case 'agentic_automation':
          // Hybrid: Step 2 LLM, Step 4 Exception Agent
          implType = (idx === 3) ? 'ai_agent_loop' : (idx === 1 ? 'ai_llm_call' : 'deterministic');
          agentScale = 5;
          break;
        case 'multi_agent':
          // Multi-agent swarm across decision steps
          implType = (idx >= 1 && idx <= 3) ? 'ai_agent_loop' : 'deterministic';
          agentScale = 8;
          apiDepth = Math.max(3, apiDepth);
          break;
      }

      return {
        ...step,
        implType,
        agentScale,
        apiDepth
      };
    });

    handleStepUpdate(updatedSteps);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-20">
      
      {/* TOP STUDIO WORKBENCH HEADER */}
      <StudioHeader
        currentUc={currentUc}
        onSelectUc={setSelectedUcId}
        onParamChange={handleParamChange}
        onToggleTaxonomy={() => setIsTaxonomyOpen(true)}
      />

      {/* MAIN UNIFIED STUDIO WORKSPACE */}
      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT / MAIN COLUMN: VISUAL PROCESS PIPELINE CANVAS (7 COLS) */}
          <div className="lg:col-span-7">
            <ProcessPipelineCanvas
              currentUc={currentUc}
              onStepUpdate={handleStepUpdate}
              onApplyArchetypePreset={handleApplyArchetypePreset}
              onResetToUniversal={() => {
                setUseCases(prev => ({ ...prev, "UNIVERSAL": UNIVERSAL_BLANK_USECASE }));
                setSelectedUcId("UNIVERSAL");
              }}
            />
          </div>

          {/* RIGHT COLUMN: EXECUTIVE CIO DECISION COCKPIT (5 COLS) */}
          <div className="lg:col-span-5">
            <CxoDecisionCockpit
              simResult={simResult}
              onSelectArchetype={handleApplyArchetypePreset}
            />
          </div>

        </div>
      </main>

      {/* ZWINGMANN TAXONOMY GUIDE DRAWER / MODAL */}
      <ZwingmannTaxonomyDrawer
        isOpen={isTaxonomyOpen}
        onClose={() => setIsTaxonomyOpen(false)}
      />

    </div>
  );
}

export default App;
