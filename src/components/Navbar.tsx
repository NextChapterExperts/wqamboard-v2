import React from 'react';
import { ENTERPRISE_USE_CASES } from '../data/useCases';
import { Presentation, Layers, Sliders, ShieldCheck, Cpu } from 'lucide-react';

interface NavbarProps {
  selectedUcId: string;
  onSelectUc: (id: string) => void;
  currentSlide: number;
  onSelectSlide: (slide: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedUcId,
  onSelectUc,
  currentSlide,
  onSelectSlide
}) => {
  const slides = [
    { id: 1, label: "1. S/4HANA Transformation", icon: Presentation },
    { id: 2, label: "2. Architecture Blueprints", icon: Layers },
    { id: 3, label: "3. CIO Live Simulator", icon: Sliders },
    { id: 4, label: "4. Board Certificate", icon: ShieldCheck }
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LOGO & USE CASE SELECTOR */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => onSelectSlide(1)}
            className="flex items-center gap-2 text-blue-500 font-black text-xl tracking-wider hover:opacity-90 transition-opacity cursor-pointer text-left shrink-0"
          >
            <Cpu className="w-7 h-7 text-blue-400 animate-pulse shrink-0" />
            <span>WA-QAM v2</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          <select
            value={selectedUcId}
            onChange={(e) => onSelectUc(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-100 font-semibold text-sm rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-all cursor-pointer w-full md:w-96 shadow-inner truncate"
          >
            {Object.values(ENTERPRISE_USE_CASES).map((uc) => (
              <option key={uc.id} value={uc.id}>
                {uc.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRESENTATION SLIDE TABS */}
        <nav className="flex items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-2xl w-full md:w-auto justify-center overflow-x-auto">
          {slides.map((slide) => {
            const Icon = slide.icon;
            const isActive = currentSlide === slide.id;
            return (
              <button
                key={slide.id}
                onClick={() => onSelectSlide(slide.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{slide.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
