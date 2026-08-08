import React from 'react';
import type { ArchetypeId } from '../types';

interface ZwingmannWorkflowGraphProps {
  archetypeId: ArchetypeId;
  compact?: boolean;
}

export const ZwingmannWorkflowGraph: React.FC<ZwingmannWorkflowGraphProps> = ({
  archetypeId,
  compact = false
}) => {
  const height = compact ? 120 : 180;

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs overflow-x-auto">
      <svg
        viewBox="0 0 760 160"
        className="w-full h-auto min-w-[600px]"
        style={{ maxHeight: `${height}px` }}
      >
        <defs>
          {/* Arrow Marker Definition */}
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
          </marker>
          <marker
            id="arrowhead-blue"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
          </marker>
          <marker
            id="arrowhead-purple"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#9333ea" />
          </marker>
        </defs>

        {/* 1. WORKFLOW AUTOMATION (NO AI) */}
        {archetypeId === 'no_ai' && (
          <g>
            {/* Start Node */}
            <rect x="20" y="55" width="100" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="70" y="77" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">📩 Eingang</text>
            <text x="70" y="93" textAnchor="middle" fill="#047857" fontSize="9">Trigger</text>

            <line x1="120" y1="80" x2="160" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Step 1 Box */}
            <rect x="160" y="55" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="220" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Step 1: Parsing</text>
            <text x="220" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ Deterministic</text>

            <line x1="280" y1="80" x2="320" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Step 2 Box */}
            <rect x="320" y="55" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="380" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Step 2: Rules</text>
            <text x="380" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ ABAP Code</text>

            <line x1="440" y1="80" x2="480" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Step 3 Box */}
            <rect x="480" y="55" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="540" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Step 3: Check</text>
            <text x="540" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ Fixed Logic</text>

            <line x1="600" y1="80" x2="640" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* End Node */}
            <rect x="640" y="55" width="100" height="50" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="690" y="77" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">💾 S/4HANA</text>
            <text x="690" y="93" textAnchor="middle" fill="#0369a1" fontSize="9">Verbuchung</text>
          </g>
        )}

        {/* 2. AUTOMATED AI WORKFLOW */}
        {archetypeId === 'automated_ai' && (
          <g>
            {/* Start Node */}
            <rect x="20" y="55" width="100" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="70" y="77" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">📩 Eingang</text>
            <text x="70" y="93" textAnchor="middle" fill="#047857" fontSize="9">Unstrukturiert</text>

            <line x1="120" y1="80" x2="160" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Step 1 Box (Deterministic) */}
            <rect x="160" y="55" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="220" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Pre-Process</text>
            <text x="220" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ Deterministic</text>

            <line x1="280" y1="80" x2="320" y2="80" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

            {/* AI Node Circle / Pill */}
            <rect x="320" y="45" width="140" height="70" rx="35" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <text x="390" y="75" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="black">⚡ LLM Call</text>
            <text x="390" y="93" textAnchor="middle" fill="#1d4ed8" fontSize="9">Prompt Extraktion</text>

            <line x1="460" y1="80" x2="500" y2="80" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />

            {/* Step 3 Box (Deterministic) */}
            <rect x="500" y="55" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="560" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Post-Process</text>
            <text x="560" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ Validierung</text>

            <line x1="620" y1="80" x2="650" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* End Node */}
            <rect x="650" y="55" width="90" height="50" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="695" y="77" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">💾 S/4HANA</text>
            <text x="695" y="93" textAnchor="middle" fill="#0369a1" fontSize="9">Buchung</text>
          </g>
        )}

        {/* 3. AI AGENT WORKFLOW */}
        {archetypeId === 'agent_workflow' && (
          <g>
            {/* Start Node */}
            <rect x="20" y="55" width="100" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="70" y="77" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">📩 Eingang</text>
            <text x="70" y="93" textAnchor="middle" fill="#047857" fontSize="9">Komplexer Case</text>

            <line x1="120" y1="80" x2="180" y2="80" stroke="#9333ea" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />

            {/* Autonomous Agent Loop Box */}
            <rect x="180" y="25" width="380" height="110" rx="20" fill="#faf5ff" stroke="#9333ea" strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="370" y="45" textAnchor="middle" fill="#6b21a8" fontSize="12" fontWeight="black">🎯 Autonomous AI Agent Loop (ReAct)</text>

            {/* Agent Sub-Nodes inside Loop */}
            <circle cx="240" cy="85" r="24" fill="#ffffff" stroke="#9333ea" strokeWidth="2" />
            <text x="240" y="89" textAnchor="middle" fill="#581c87" fontSize="9" fontWeight="bold">Reasoning</text>

            <path d="M 264 85 Q 310 60 350 85" fill="none" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrowhead-purple)" />

            <circle cx="370" cy="85" r="24" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
            <text x="370" y="89" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">Tool Call</text>

            <path d="M 350 95 Q 310 115 264 95" fill="none" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrowhead-purple)" />

            <circle cx="500" cy="85" r="24" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
            <text x="500" y="89" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">Eval</text>

            <line x1="560" y1="80" x2="630" y2="80" stroke="#9333ea" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />

            {/* End Node */}
            <rect x="630" y="55" width="110" height="50" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="685" y="77" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">💾 S/4HANA</text>
            <text x="685" y="93" textAnchor="middle" fill="#0369a1" fontSize="9">Ergebnis</text>
          </g>
        )}

        {/* 4. AGENTIC WORKFLOW AUTOMATION (HYBRID SWEET SPOT) */}
        {archetypeId === 'agentic_automation' && (
          <g>
            {/* Start Node */}
            <rect x="20" y="55" width="90" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="65" y="77" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">📩 Eingang</text>
            <text x="65" y="93" textAnchor="middle" fill="#047857" fontSize="9">S/4HANA Event</text>

            <line x1="110" y1="80" x2="150" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Deterministic Step 1 */}
            <rect x="150" y="55" width="110" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="205" y="77" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Rule Engine</text>
            <text x="205" y="93" textAnchor="middle" fill="#64748b" fontSize="9">⚙️ Fast Path</text>

            <line x1="260" y1="80" x2="300" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Decision Diamond */}
            <polygon points="340,40 380,80 340,120 300,80" fill="#fffbebe" stroke="#d97706" strokeWidth="2" />
            <text x="340" y="77" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">Clear?</text>
            <text x="340" y="89" textAnchor="middle" fill="#b45309" fontSize="8">Decision</text>

            {/* Fast Track Line */}
            <line x1="380" y1="80" x2="620" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="500" y="73" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Standard (Fast Path)</text>

            {/* Exception Branch to Agent */}
            <line x1="340" y1="120" x2="340" y2="140" stroke="#d97706" strokeWidth="1.5" />
            <line x1="340" y1="140" x2="480" y2="140" stroke="#9333ea" strokeWidth="1.5" />
            <line x1="480" y1="140" x2="480" y2="115" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrowhead-purple)" />

            {/* Guarded Agent Node */}
            <rect x="420" y="65" width="120" height="50" rx="25" fill="#faf5ff" stroke="#9333ea" strokeWidth="2.5" />
            <text x="480" y="87" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="black">🟣 AI Exception Agent</text>
            <text x="480" y="100" textAnchor="middle" fill="#7e22ce" fontSize="8">Guarded ReAct Node</text>

            <line x1="540" y1="90" x2="620" y2="90" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrowhead-purple)" />

            {/* Settlement End Node */}
            <rect x="620" y="55" width="120" height="50" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="680" y="77" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">💾 S/4HANA</text>
            <text x="680" y="93" textAnchor="middle" fill="#0369a1" fontSize="9">Sichere Verbuchung</text>
          </g>
        )}

        {/* 5. MULTI-AGENT SYSTEM (MAS) */}
        {archetypeId === 'multi_agent' && (
          <g>
            {/* Start Node */}
            <rect x="20" y="55" width="90" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="65" y="77" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">📩 Eingang</text>
            <text x="65" y="93" textAnchor="middle" fill="#047857" fontSize="9">Unstrukturiert</text>

            <line x1="110" y1="80" x2="160" y2="80" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Orchestrator Agent */}
            <circle cx="200" cy="80" r="30" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            <text x="200" y="82" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="black">👑 Master</text>
            <text x="200" y="94" textAnchor="middle" fill="#92400e" fontSize="8">Orchestrator</text>

            {/* Agent Swarm Box */}
            <rect x="270" y="20" width="340" height="120" rx="20" fill="#fffbeb" stroke="#d97706" strokeWidth="2" strokeDasharray="4 4" />
            <text x="440" y="38" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="black">🐝 Multi-Agent Swarm</text>

            {/* Agent A */}
            <circle cx="330" cy="80" r="24" fill="#ffffff" stroke="#9333ea" strokeWidth="2" />
            <text x="330" y="83" textAnchor="middle" fill="#6b21a8" fontSize="8" fontWeight="bold">Agent A (Parse)</text>

            {/* Agent B */}
            <circle cx="440" cy="65" r="24" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
            <text x="440" y="68" textAnchor="middle" fill="#1e40af" fontSize="8" fontWeight="bold">Agent B (Audit)</text>

            {/* Agent C */}
            <circle cx="440" cy="115" r="22" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
            <text x="440" y="118" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">Agent C (Risk)</text>

            {/* Inter-Agent Swarm Lines */}
            <line x1="354" y1="75" x2="416" y2="68" stroke="#d97706" strokeWidth="1.5" />
            <line x1="354" y1="85" x2="418" y2="110" stroke="#d97706" strokeWidth="1.5" />
            <line x1="440" y1="89" x2="440" y2="93" stroke="#d97706" strokeWidth="1.5" />

            {/* Consensus Node */}
            <rect x="520" y="55" width="70" height="50" rx="10" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
            <text x="555" y="77" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">Consensus</text>
            <text x="555" y="90" textAnchor="middle" fill="#92400e" fontSize="8">Voting</text>

            <line x1="610" y1="80" x2="650" y2="80" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* End Node */}
            <rect x="650" y="55" width="95" height="50" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            <text x="697" y="77" textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">💾 S/4HANA</text>
            <text x="697" y="93" textAnchor="middle" fill="#0369a1" fontSize="9">Final Booking</text>
          </g>
        )}

      </svg>
    </div>
  );
};
