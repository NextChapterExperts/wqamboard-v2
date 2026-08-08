import type { UseCase, ArchetypeDefinition, ArchetypeId } from '../types';

export const ARCHETYPE_DEFINITIONS: Record<ArchetypeId, ArchetypeDefinition> = {
  no_ai: {
    id: 'no_ai',
    name: '1. Workflow Automation (No AI)',
    short_name: 'No AI',
    icon: '⚙️',
    badge_color: 'bg-slate-800 text-slate-300 border-slate-700',
    description: 'Klassische Workflow Automation ohne KI. Reine Regelverarbeitung per ABAP, RPA oder SQL-Logik.',
    latency_range: '< 0,1s',
    cost_tier: '0 € Token',
    error_risk: '0% Halluzination',
    governance_score: '100% Auditierbar',
    ideal_for: 'Strukturierte Daten, mathematische Formeln, S/4HANA BAPI-Aufrufe, IBAN-Checks.'
  },
  automated_ai: {
    id: 'automated_ai',
    name: '2. Automated AI Workflow',
    short_name: 'Automated AI',
    icon: '⚡',
    badge_color: 'bg-blue-900/60 text-blue-300 border-blue-700',
    description: 'Deterministischer Prozesspfad mit gezielten AI Steps (LLM Calls für Prompt Chaining, Routing & Extraktion).',
    latency_range: '1–4s',
    cost_tier: 'Gering (Gezielte LLM Calls)',
    error_risk: 'Sehr gering (Starrer Pfad)',
    governance_score: 'Hohe Auditierbarkeit',
    ideal_for: 'PDF-Datenextraktion, E-Mail-Intent-Erkennung, iDoc-Routing, Text-Zusammenfassung.'
  },
  agent_workflow: {
    id: 'agent_workflow',
    name: '3. AI Agent Workflow',
    short_name: 'AI Agent',
    icon: '🎯',
    badge_color: 'bg-emerald-900/60 text-emerald-300 border-emerald-700',
    description: 'Ein einzelner autonomer Agent entscheidet über N-Iterationen und dynamische Tool-Aufrufe.',
    latency_range: '5–15s',
    cost_tier: 'Mittel (Tool-Loops)',
    error_risk: 'Moderat (Self-Correction)',
    governance_score: 'Gute Kontrolle',
    ideal_for: 'Dynamisches Lieferanten-Onboarding, flexible Portal-Checks, Dokumenten-Recherche.'
  },
  agentic_automation: {
    id: 'agentic_automation',
    name: '4. Agentic Workflow Automation',
    short_name: 'Agentic Auto',
    icon: '🟣',
    badge_color: 'bg-purple-900/60 text-purple-300 border-purple-700',
    description: 'Deterministische Workflow-Engine steuert spezialisierte Teil-Agenten an komplexen Klärungsknoten.',
    latency_range: '10–30s',
    cost_tier: 'Hoch (Multi-Step Loops)',
    error_risk: 'Kontrolliert (Safety Net)',
    governance_score: 'Sehr Hoch (Hybrid)',
    ideal_for: 'Reklamations- & Disput-Abwicklung, Ausnahme-Klärung mit S/4HANA Freigaben.'
  },
  multi_agent: {
    id: 'multi_agent',
    name: '5. Multi-Agent System (MAS)',
    short_name: 'Multi-Agent',
    icon: '🐝',
    badge_color: 'bg-amber-900/60 text-amber-300 border-amber-700',
    description: 'Mehrere autonome Spezial-Agenten (z.B. Finance-, Risk- & ERP-Booking Agent) verhandeln im Schwarm.',
    latency_range: '25–90s',
    cost_tier: 'Sehr hoch (Schwarm-Calls)',
    error_risk: 'Kaskadierend (Komplex)',
    governance_score: 'Komplexe Governance',
    ideal_for: 'Vielschichtige Capex-Investitionsanträge, strategisches Risk Assessment.'
  }
};

export const ENTERPRISE_USE_CASES: Record<string, UseCase> = {
  "ZPROC00": {
    id: "ZPROC00",
    name: "ZPROC00: Skonto- & Zahlungsoptimierung (FI Payment Run)",
    module: "S/4HANA FI",
    fte: "1–2 FTE",
    short_desc: "Rein deterministischer Prozess zur Auswertung offener Kreditorenposten, Skontofristen und Erstellung des SAP F110 Zahlungslaufs.",
    sender: "💻 S/4HANA Financial Ledger (BSIK/BSEG)",
    receiver: "💾 SAP S/4HANA FI-AP (`F110` Payment Engine)",
    status_quo: "Sachbearbeiter prüfen Skontofristen und Fälligkeiten manuell in Tabellen.",
    ai_delta: "Keine KI erforderlich. 100% ABAP/SQL-Logik berechnet den mathematisch optimalen Ausgleichszeitpunkt.",
    sap_entities: "BSEG, BSIK, REGUH, F110",
    sweet_spot_archetype: "no_ai",
    sweet_spot_reason: "Da alle Daten bereits strukturiert in S/4HANA vorliegen, bietet KI keinen Mehrwert. Archetyp 1 (Workflow Automation No AI) ist 0.1s schnell, 100% sicher und verbraucht 0 € Token.",
    steps: [
      { id: "step1", name: "Kreditorenposten Selektion", desc: "Selektion aller fälligen Posten aus BSEG/BSIK.", tech: "ABAP CDS View / SQL", cfo: "Vollständige Selektion in Millisekunden.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step2", name: "Skonto-Fälligkeitsrechnung", desc: "Berechnung des optimalen Zahltags zur Skontomaximierung.", tech: "ABAP Logic Module", cfo: "Garantierte Skontoerträge.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step3", name: "Zahlungssperren Check", desc: "Prüfung auf gesetzte Sperrkennzeichen im Lieferantenstamm.", tech: "S/4HANA Core Engine", cfo: "Schutz vor fehlerhafter Auszahlung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 },
      { id: "step4", name: "Zahlungsvorschlag Generierung", desc: "Erstellung der REGUH/REGUP Zahlungstabellen.", tech: "SAP Standard F110 Run", cfo: "100% Revisionssicher.", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 2 },
      { id: "step5", name: "SAP F110 Freigabe", desc: "Freigabe des Bankdaten-Trägers (pain.001) zur Bankenübertragung.", tech: "SAP Payment Medium Workbench", cfo: "Direkte Ausführung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
    ],
    params: {
      volume: 45000,
      unstructured_ratio: 0.05,
      data_quality: 0.98,
      sla_latency: 2.0,
      positions_count: 8,
      token_price_per_1m: 5.0,
      cost_per_error: 120.0
    }
  },
  "ZPROC01": {
    id: "ZPROC01",
    name: "ZPROC01: EDI & iDoc Eingangs-Clearing (Status 51)",
    module: "S/4HANA Integration",
    fte: "2–3 FTE",
    short_desc: "Automatisiertes Re-Routing und Feld-Korrektur abgebrochener EDI/iDoc Nachrichten im Status 51.",
    sender: "📡 B2B EDI Network / Subsystem",
    receiver: "💾 SAP S/4HANA iDoc Engine (`BD87` / BAPI)",
    status_quo: "IT-Support öffnet hängende iDocs in WE05/BD87 im SAP GUI und korrigiert Stammdaten manuell.",
    ai_delta: "Ein strukturierter Automated AI Workflow interpretiert den iDoc-Fehlertext, mappt EANs und stößt das Re-Posting an.",
    sap_entities: "EDIDC, EDIDS, WE05, BD87",
    sweet_spot_archetype: "automated_ai",
    sweet_spot_reason: "Archetyp 2 (Automated AI Workflow) löst 95% der iDoc-Fehler in 2.5 Sekunden für 0,02 € pro Beleg.",
    steps: [
      { id: "step1", name: "iDoc Event Detection (Status 51)", desc: "Erfassung abgebrochener EDI-Nachrichten.", tech: "SAP Event Mesh", cfo: "Sofortige Fehlererfassung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 },
      { id: "step2", name: "Fehlerlog & Payload Parsing (AI Step)", desc: "LLM parst den iDoc-Fehlertext.", tech: "BTP AI Core Prompt Chain", cfo: "Automatische Fehler-Diagnose.", implType: "ai_llm_call", apiDepth: 2, agentScale: 1, logicDensity: 3 },
      { id: "step3", name: "Stammdaten & EAN Match", desc: "Abgleich der fehlerhaften EAN mit S/4HANA Materialstamm.", tech: "S/4HANA Material Lookup API", cfo: "Korrektes Material-Mapping.", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 2 },
      { id: "step4", name: "Payload-Korrektur", desc: "Erstellung der korrigierten iDoc-Segmentdaten.", tech: "JSON/XML Transformer", cfo: "Fehlerfreie Nachrichtenstruktur.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step5", name: "S/4HANA BD87 Re-Posting", desc: "Anstoßen des automatischen Re-Posting BAPIs.", tech: "BAPI_IDOC_INPUT1", cfo: "Nahtlose Verbuchung im ERP.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
    ],
    params: {
      volume: 18000,
      unstructured_ratio: 0.35,
      data_quality: 0.85,
      sla_latency: 5.0,
      positions_count: 10,
      token_price_per_1m: 5.0,
      cost_per_error: 45.0
    }
  },
  "ZPROC02": {
    id: "ZPROC02",
    name: "ZPROC02: RFQ / Ausschreibungserfassung (Sales Quote)",
    module: "S/4HANA SD",
    fte: "3–5 FTE",
    short_desc: "Automatische Umwandlung vielseitiger Kunden-Ausschreibungs-PDFs in strukturiertes S/4HANA Angebot (`VA11`).",
    sender: "📄 Kunde (30-100 S. Ausschreibungs-PDF)",
    receiver: "💾 SAP S/4HANA SD (`API_SALES_QUOTATION_SRV`)",
    status_quo: "Vertriebs-Backoffice tippt riesige Positionstabellen aus PDF-Ausschreibungen ins ERP ab.",
    ai_delta: "Sequenzielle Prompt-Kette liest PDF-Seiten, parst Positionstabellen und mappt Kundenmaterialien auf SAP-Materialnummern.",
    sap_entities: "VBAK, VBAP, API_SALES_QUOTATION_SRV",
    sweet_spot_archetype: "automated_ai",
    sweet_spot_reason: "Archetyp 2 (Automated AI Workflow) verarbeitet große Dokumente strukturiert in 4 Sekunden. Das sequenzielle Parsing benötigt keine unberechenbaren Agenten-Loops.",
    steps: [
      { id: "step1", name: "Ausschreibungs-PDF Upload", desc: "Eingang des Ausschreibungsdokuments im Portal.", tech: "SAP BTP Document Service", cfo: "Digitale Erfassung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 },
      { id: "step2", name: "Seiten-Parsing & Pos-Extraktion (AI Step)", desc: "LLM extrahiert Positionstabellen und Mengengerüste.", tech: "Document AI & LLM Extractor", cfo: "Zeitersparnis von 85%.", implType: "ai_llm_call", apiDepth: 3, agentScale: 1, logicDensity: 4 },
      { id: "step3", name: "Material- & Preis-Mapping (AI Step)", desc: "Matching von Freitext-Beschreibungen auf SAP Materialnummern.", tech: "Vector Search & LLM Matcher", cfo: "Präzises Produkt-Mapping.", implType: "ai_llm_call", apiDepth: 3, agentScale: 1, logicDensity: 4 },
      { id: "step4", name: "Konditionen & Skonto Check", desc: "Abgleich der Zahlungs- und Lieferbedingungen im ERP.", tech: "SD Pricing Engine", cfo: "Kaufmännische Korrektheit.", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 2 },
      { id: "step5", name: "S/4HANA SD Angebotsanlage", desc: "Verbuchung des Angebots per S/4HANA BAPI.", tech: "API_SALES_QUOTATION_SRV", cfo: "Direkte Vertriebsbuchung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
    ],
    params: {
      volume: 3500,
      unstructured_ratio: 0.75,
      data_quality: 0.80,
      sla_latency: 10.0,
      positions_count: 25,
      token_price_per_1m: 5.0,
      cost_per_error: 180.0
    }
  },
  "ZPROC03": {
    id: "ZPROC03",
    name: "ZPROC03: Lieferanten-Onboarding & Compliance Check",
    module: "S/4HANA MM",
    fte: "2–4 FTE",
    short_desc: "Dynamische Prüfung wechselnder Dokumentenpakete (ISO, LKSG, Tax, Handelsregister) und Geschäftspartneranlage.",
    sender: "🌐 Lieferanten-Registrierungs-Portal",
    receiver: "💾 SAP S/4HANA Core (`API_BUSINESS_PARTNER`)",
    status_quo: "Einkäufer fordern Dokumente per Mail an, prüfen USt-IDs und Sanktionslisten manuell in externen Portalen.",
    ai_delta: "Ein dynamischer AI Agent entscheidet je nach Dokumentenpaket, welche Prüf-Tools (Sanktionsliste, Handelsregister, VIES-Steuer-API) aufgerufen werden.",
    sap_entities: "BUT000, LFA1, API_BUSINESS_PARTNER",
    sweet_spot_archetype: "agent_workflow",
    sweet_spot_reason: "Archetyp 3 (AI Agent Workflow) ist ideal, weil der Agent dynamisch entscheidet, welche Prüf-APIs je nach Lieferantenland und Dokumententyp aufgerufen werden müssen.",
    steps: [
      { id: "step1", name: "Portal-Paket Eingang", desc: "Eingang des Dokumentenpakets im Lieferantenportal.", tech: "SAP BTP Portal", cfo: "Strukturierte Erfassung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 },
      { id: "step2", name: "Dynamischer Compliance Agent (AI Agent Step)", desc: "Agent analysiert Dokumente und plant Prüfschritte.", tech: "Single ReAct Agent (BTP AI Core)", cfo: "Flexibles Screening.", implType: "ai_agent_loop", apiDepth: 3, agentScale: 3, logicDensity: 4 },
      { id: "step3", name: "Steuer- & Sanktionslisten Tools (AI Agent Step)", desc: "Agent ruft VIES-Steuer-API, Handelsregister und D&B ab.", tech: "Tool-Calling Subroutines", cfo: "Vollständige Risikoprüfung.", implType: "ai_agent_loop", apiDepth: 4, agentScale: 3, logicDensity: 3 },
      { id: "step4", name: "Stammdaten-Anreicherung", desc: "Zusammenführung aller verifizierten Informationen.", tech: "Data Mapper", cfo: "Saubere Stammdaten.", implType: "deterministic", apiDepth: 2, agentScale: 1, logicDensity: 2 },
      { id: "step5", name: "S/4HANA BP Anlage", desc: "Anlegen des verifizierten Geschäftspartners im ERP.", tech: "API_BUSINESS_PARTNER", cfo: "Revisionssichere Anlage.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
    ],
    params: {
      volume: 1200,
      unstructured_ratio: 0.85,
      data_quality: 0.80,
      sla_latency: 15.0,
      positions_count: 5,
      token_price_per_1m: 5.0,
      cost_per_error: 250.0
    }
  },
  "ZPROC04": {
    id: "ZPROC04",
    name: "ZPROC04: Reklamations- & Disput-Klärung (Service/FI)",
    module: "S/4HANA Service",
    fte: "3–6 FTE",
    short_desc: "Hybrider Workflow für Kundenreklamationen mit starrem S/4HANA-Freigabepfad und Teil-Agenten zur Freitext- und Kulanzklärung.",
    sender: "📩 Kunde (E-Mail, Foto, Schadensbericht)",
    receiver: "💾 SAP S/4HANA Service / FI (`API_CREDIT_MEMO`)",
    status_quo: "Kundenservice liest Mails, sucht Rechnungen im ERP, verhandelt per Mail und legt manuell Gutschriften an.",
    ai_delta: "Deterministische Workflow-Engine garantiert Compliance, nutzt aber spezialisierte Teil-Agenten für S/4HANA-Historienprüfungen.",
    sap_entities: "VBAK, VBAP, BSAD, API_CREDIT_MEMO",
    sweet_spot_archetype: "agentic_automation",
    sweet_spot_reason: "Archetyp 4 (Agentic Workflow Automation) sichert den Prozess durch ein deterministisches Framework ab, nutzt aber Teil-Agenten an Ausnahmeknoten.",
    steps: [
      { id: "step1", name: "Reklamations-Eingang", desc: "Multikanal-Eingang der Kundenbeschwerde.", tech: "SAP Customer Service Desk", cfo: "Zentrale Erfassung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step2", name: "Kunden- & Rechnungsmatch (AI Agent Step)", desc: "Teil-Agent sucht Ursprungsauftrag und Rechnung in S/4HANA.", tech: "Agentic ERP Lookup Subroutine", cfo: "Vermeidung von Suchzeiten.", implType: "ai_agent_loop", apiDepth: 3, agentScale: 4, logicDensity: 3 },
      { id: "step3", name: "Kulanz- & Schadens-Agent (AI Agent Step)", desc: "Teil-Agent bewertet Schadensfotos und Kulanzregeln.", tech: "Vision & ReAct Claim Agent", cfo: "Faire, konsistente Bewertung.", implType: "ai_agent_loop", apiDepth: 3, agentScale: 5, logicDensity: 4 },
      { id: "step4", name: "Kaufmännisches Freigabe-Gate", desc: "Workflow-Prüfung von Wertgrenzen und Genehmigungspflichten.", tech: "S/4HANA Workflow Engine", cfo: "100% finanzielle Kontrolle.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step5", name: "S/4HANA Gutschriftsanlage", desc: "Erstellung der Gutschrift oder Auszahlung in S/4HANA.", tech: "API_CREDIT_MEMO_REQUEST_SRV", cfo: "Automatische Verbuchung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 1 }
    ],
    params: {
      volume: 6500,
      unstructured_ratio: 0.90,
      data_quality: 0.75,
      sla_latency: 20.0,
      positions_count: 4,
      token_price_per_1m: 5.0,
      cost_per_error: 95.0
    }
  },
  "ZPROC05": {
    id: "ZPROC05",
    name: "ZPROC05: Capex-Investitionsanträge & Freigabe (CO)",
    module: "S/4HANA CO",
    fte: "2–3 FTE",
    short_desc: "Multi-Agenten-Schwarm zur inhaltlichen, finanziellen und rechtlichen Bewertung von Investitionsanträgen vor der S/4HANA-Freigabe.",
    sender: "🏢 Fachabteilung (Investitionsantrag PDF)",
    receiver: "💾 SAP S/4HANA CO (WBS-Element / Innenauftrag)",
    status_quo: "Investitionsanträge werden manuell in Umläufen von Finance, Legal und Controlling über Monate bewertet.",
    ai_delta: "Mehrere autonome Spezial-Agenten (Finanz-Agent, Risk-Agent, ERP-Budget-Agent) verhandeln und erstellen ein konsolidiertes Gutachten.",
    sap_entities: "COBK, COSP, PRPS (WBS Elements)",
    sweet_spot_archetype: "multi_agent",
    sweet_spot_reason: "Archetyp 5 (Multi-Agent System) ist für diesen hochkomplexen Prozess optimal, weil unterschiedliche Perspektiven im Agenten-Schwarm diskutiert werden.",
    steps: [
      { id: "step1", name: "Investitionsantrag Eingang", desc: "Erfassung des Business-Case-Dokuments.", tech: "SAP Build WorkZone", cfo: "Digitale Einreichung.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 },
      { id: "step2", name: "Finanz- & ROI-Agent (MAS Sub-Agent Step)", desc: "Spezial-Agent prüft Amortisation und Zahlungsflüsse.", tech: "MAS Finance Agent", cfo: "Fundierte Finanzanalyse.", implType: "ai_agent_loop", apiDepth: 4, agentScale: 8, logicDensity: 5 },
      { id: "step3", name: "Compliance- & Risk-Agent (MAS Sub-Agent Step)", desc: "Spezial-Agent prüft Rechtskonformität und ESG-Risiken.", tech: "MAS Risk & Legal Agent", cfo: "Umfassender Risikoschutz.", implType: "ai_agent_loop", apiDepth: 4, agentScale: 8, logicDensity: 5 },
      { id: "step4", name: "ERP-Budget-Scharfstellung (MAS Sub-Agent Step)", desc: "Agent gleicht Mittelverfügbarkeit im S/4HANA CO ab.", tech: "MAS S/4HANA CO Agent", cfo: "Echtzeit-Budgetcheck.", implType: "ai_agent_loop", apiDepth: 4, agentScale: 6, logicDensity: 3 },
      { id: "step5", name: "CFO Board Certificate & S/4HANA Freigabe", desc: "Erstellung des WBS-Elements und Budgetfreigabe.", tech: "S/4HANA CO BAPI & Board Certificate", cfo: "Finales Vorstands-Testat.", implType: "deterministic", apiDepth: 1, agentScale: 1, logicDensity: 2 }
    ],
    params: {
      volume: 800,
      unstructured_ratio: 0.95,
      data_quality: 0.85,
      sla_latency: 30.0,
      positions_count: 5,
      token_price_per_1m: 5.0,
      cost_per_error: 450.0
    }
  }
};
