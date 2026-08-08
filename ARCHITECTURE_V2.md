# 🏛️ WA-QAM v2: Architecture Specification & Implementation Roadmap

**Projekt-Verzeichnis:** `/home/peter/Projekte/active/waqam/waqam-v2`  
**Version:** 2.0-Final-Architecture  
**Zielgruppe:** C-Level (CIO, CFO, Enterprise Architects, S/4HANA Program Leads)  
**Taxonomie-Basis:** Tobias Zwingmann (*"AI Workflows vs. AI Agents vs. Everything in Between"*)

---

## 📋 1. Executive Overview & Strategisches Konzept

Das **WA-QAM (Workload Architecture & Quality Assessment Model) v2** ist ein interaktives **Process-Sizing & Architecture Studio** zur kaufmännischen und operativen Bewertung von KI- und Agenten-Einsätzen in Geschäftsprozessen.

### Die Kernarchitektur:
1. **Der S/4HANA Transformations-Aufhänger:**  
   Standard-SAP-Prozesse werden nicht agentisiert (sie laufen deterministisch im S/4HANA). Der Simulator fokussiert auf **kundenindividuelle Z-Prozesse** und Ausnahmeabwicklungen (z.B. Reklamationsbearbeitung, Lieferanten-Onboarding, RFQ-Ausschreibung, EDI-Clearing), die bei der S/4HANA-Migration transformiert werden müssen.
2. **Technologie-Agnostische Engine:**  
   Die mathematische Engine bewertet die Architekturmuster neutral, unabhängig davon, ob SAP Joule, OpenAI, Claude, LangChain, AutoGen oder Custom Python Agents eingesetzt werden.
3. **Die 5 Zwingmann-Archetypen:**  
   Lückenlose Ausrichtung an der offiziellen Taxonomie von Tobias Zwingmann.
4. **Die Step Engine & Komplexitäts-Formfaktoren:**  
   Jeder Prozess besteht aus Schritten mit expliziten Ausprägungen und 3 Komplexitäts-Parametern.
5. **Die SAP-Vorlagen-Überlagerung ("Die Krönung"):**  
   Reale SAP-Kundenprozesse belegen die Step Engine mit empirischen Real-Parametern vor, können aber vom Nutzer frei im Visual Editor angepasst oder erweitert werden.
6. **Reine C-Level-Sprache:**  
   Die Auswertung erfolgt in den 5 Vorstands-Fragen (SLA, Backlog-Welle, Workforce Impact, Budget-Skalierungsrisiko, True Cost per Case).

---

## 📐 2. Die 5 AI Workflow Archetypen (Taxonomie nach Tobias Zwingmann)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                           DIE 5 AI WORKFLOW ARCHETYPEN                                      │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. WORKFLOW AUTOMATION (NO AI)                                                              │
│    Starrer Regel-Code (ABAP, RPA, SQL). 0 € Tokenkosten, Latenz < 0,1s, 0% Halluzination.    │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. AUTOMATED AI WORKFLOW                                                                    │
│    Fester Prozesspfad mit gezielten LLM-Calls (Prompt Chaining / Router / Evaluator).       │
│    Latenz: 1–4s | Tokenkosten: Gering | Halluzinationsrisiko: Sehr gering                   │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. AI AGENT WORKFLOW                                                                        │
│    Ein dynamischer Agent entscheidet selbstständig über N-Schritte und Tool-Aufrufe.         │
│    Latenz: 5–15s | Tokenkosten: Mittel | Halluzinationsrisiko: Moderat                     │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. AGENTIC WORKFLOW AUTOMATION                                                              │
│    Deterministische Workflow-Engine steuert spezialisierte Teil-Agenten an Klärungsknoten.  │
│    Latenz: 10–30s | Tokenkosten: Hoch | Halluzinationsrisiko: Kontrolliert                  │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. MULTI-AGENT SYSTEM (MAS)                                                                 │
│    Mehrere autonome Agenten (z.B. Researcher, Auditor, Booking Agent) verhandeln im Schwarm.│
│    Latenz: 25–90s | Tokenkosten: Sehr hoch | Halluzinationsrisiko: Kaskadierend              │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 3. Die Step Engine & 3 Komplexitäts-Formfaktoren

Jeder Schritt $i$ im Visual Process Editor besitzt eine **Per-Step Ausprägung**:

1. ⚙️ `Deterministic Step (No AI)` – Reiner Regel-Code / BAPI / DB-Lookup.
2. ⚡ `AI Step (LLM Call)` – Einmaliger LLM-Aufruf (z.B. PDF-Extraktion).
3. 🎯 `AI Agent Step (Tool Loop)` – Autonomer Agent mit ReAct-Tool-Schleife.

### Die 3 Formfaktoren pro Step:
* 🌐 **Schnittstellentiefe & API-Calls ($S_i \in [1, 10]$):**  
  Anzahl angebundener Subsysteme / BAPIs / Tools. Erhöht die Systemlatenz um $+0{,}4\text{s}$ pro Stufe.
* 🐝 **Sub-Agenten & Rekursions-Tiefe ($A_i \in [1, 10]$) [Nur bei Agent Steps]:**  
  Tiefe der Sub-Agenten-Hierarchie. Multipliziert die Token-Kosten ($(1 + A_i \cdot 0{,}4)$) und potenziert das Halluzinationsrisiko.
* 📄 **Regel- & Datendichte ($N_i \in [1, 10]$):**  
  Anzahl der geprüften Zeilen/Positionen. Bestimmt die stochastische Prüfungsdichte im Step.

---

## 👑 4. Die SAP-Vorlagen Überlagerung ("Die Krönung")

Der Simulator enthält 6 reale SAP-Referenz-Z-Prozesse. Wird eine Vorlage gewählt, **belegt sie die Step Engine mit empirischen Real-Kenngrößen vor**:

| Referenz-Prozess | SAP Ziel-Entity | Pre-populated Archetyp | Pre-populated Step-Setup |
| :--- | :--- | :--- | :--- |
| **ZPROC00: Skonto- & Zahlungsoptimierung** | `F110` Payment Engine | **1. Workflow Automation (No AI)** | 5x Deterministic Steps ($S_i=1, A_i=1$) |
| **ZPROC01: EDI / iDoc Eingangs-Clearing** | `BD87` / iDoc Status 51 | **2. Automated AI Workflow** | 4x Deterministic + 1x AI Step (Router) |
| **ZPROC02: RFQ / Ausschreibungserfassung** | `VA11` Sales Quote | **2. Automated AI Workflow** | 3x Deterministic + 2x AI Steps (Chain) |
| **ZPROC03: Lieferanten-Onboarding** | `API_BUSINESS_PARTNER` | **3. AI Agent Workflow** | 2x Deterministic + 2x AI Agent Steps ($A_i=3$) |
| **ZPROC04: Reklamations- & Disput-Klärung** | `API_CREDIT_MEMO` | **4. Agentic Workflow Auto** | 2x Deterministic + 2x Agentic Sub-Steps ($A_i=5$) |
| **ZPROC05: Capex-Investitionsanträge** | `WBS Elements` (CO) | **5. Multi-Agent System** | 1x Deterministic + 3x MAS Agent Steps ($A_i=8$) |

*Der Nutzer kann jede Vorlage im Process Editor live anpassen, Schritte löschen/hinzufügen oder die Formfaktoren verändern.*

---

## 🏛️ 5. Die 5 C-Level Business-Dimensionen (Outcome)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 C-LEVEL EXECUTIVE REPORTING                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ⏱️ BETRIEBSFÄHIGKEIT & SLA-GARANTIE                                                       │
│    "Werden unsere Kunden oder Fachbereiche blockiert? Reißt der Prozess unsere              │
│    vertraglichen Reaktionszeiten (z. B. 24h-Kunden-SLA) und drohen Pönale?"                 │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. 🌊 DIE "NACHARBEITS-WELLE" (BACKLOG-RISIKO)                                              │
│    "Erzeugt die KI einen neuen Schatten-Arbeitsvorrat? Verursacht die KI mehr Verwirrung   │
│    in der Fachabteilung, als sie an Zeit einspart?"                                         │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. 👥 ECHTE KAPAZITÄTS-ENTLASTUNG (WORKFORCE IMPACT)                                        │
│    "Kann meine Fachabteilung mit der gleichen Mannschaft 40 % mehr Geschäft abwickeln,     │
│    oder verschieben wir den Engpass nur an eine andere Stelle?"                             │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. 💸 KOSTEN-EXPLOSIONSRISIKO BEI SKALIERUNG                                                │
│    "Ist das IT-Budget planbar, oder laufen die Token-Kosten bei einem Volumen-Peak          │
│    im Jahresschlussgeschäft völlig aus dem Ruder?"                                          │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. 💰 TRUE COST PER TRANSACTION (ECHTE END-TO-END BUCHUNGSKOSTEN)                           │
│    "Was kostet mich ein abgearbeiteter Fall wirklich (inkl. KI-Kosten + korrigierten        │
│    Fehlern + Systemen)?"                                                                    │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ 6. Implementierungs-Roadmap (`waqam-v2`)

```mermaid
gantt
    title WA-QAM v2 Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Backend & Engine
    Phase 1: Types, Data & Stochastics Engine    :done, 2026-08-07, 2026-08-07
    section Canvas & Editor
    Phase 2: Visual Process Canvas & Step Editor  :active, 2026-08-07, 2026-08-07
    section Architecture Guide
    Phase 3: Zwingmann Taxonomie Blueprint Guide :2026-08-07, 2026-08-07
    section C-Level Dashboard
    Phase 4: CIO Decision Panel & Board Certificate: 2026-08-07, 2026-08-07
    section Build & Test
    Phase 5: Final Build Validation              : 2026-08-07, 2026-08-07
```

### Detaillierte Ausführungs-Schritte:
1. **Phase 1 (Engine Refactoring):**  
   Aktualisierung von `types.ts`, `pcsEngine.ts` und `useCases.ts` um die 3 Komplexitäts-Formfaktoren ($S_i, A_i, N_i$) und die exakten Zwingmann-Bezeichnungen.
2. **Phase 2 (Visual Process Canvas & Step Editor):**  
   Bau der interaktiven Canvas-Oberfläche in `Slide3Simulator.tsx` / `ProcessCanvas.tsx` mit visuellen Step-Karten, Drag/Drop/Add, Per-Step-Typ-Auswahl und den 3 Schiebereglern pro Step.
3. **Phase 3 (Zwingmann Taxonomie Guide):**  
   Bau des `Slide2Archetypes.tsx` mit den 5 originalen Zwingmann-Flows und Symbolen.
4. **Phase 4 (CIO Decision Cockpit & Certificate):**  
   Echtzeit-Berechnung des C-Level-Reportings und Vorstands-Zertifikats (`Slide4Certificate.tsx`).
5. **Phase 5 (Verification):**  
   Ausführung von `npm run build` im Ordner `waqam-v2`.
