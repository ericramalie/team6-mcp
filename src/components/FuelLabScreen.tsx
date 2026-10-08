import React, { useState } from 'react';
import { FuelFormula } from '../types';
import { NUTRITION_IMAGE } from '../data/mockData';
import { Zap, Droplets, Sparkles, Sliders, CheckCircle2, QrCode } from 'lucide-react';

interface FuelLabScreenProps {
  formulas: FuelFormula[];
  onDispenseFormula: (formula: FuelFormula, customSpecs?: { volumeMl: number; electrolyteMultiplier: number; carbsG: number; flavor: string }) => void;
}

export const FuelLabScreen: React.FC<FuelLabScreenProps> = ({
  formulas,
  onDispenseFormula,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customVolume, setCustomVolume] = useState<number>(500);
  const [customElectrolytes, setCustomElectrolytes] = useState<number>(1.5);
  const [customCarbs, setCustomCarbs] = useState<number>(25);
  const [customFlavor, setCustomFlavor] = useState<string>('Yuzu Lime Volt');

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'pre', label: 'Pre-Load Nitric' },
    { id: 'intra', label: 'Intra-Electrolyte' },
    { id: 'recovery', label: 'Post-Workout mTOR' },
    { id: 'nootropic', label: 'Nootropic & Rest' },
  ];

  const filteredFormulas = selectedCategory === 'all'
    ? formulas
    : formulas.filter((f) => f.category === selectedCategory);

  const handleDispenseCustom = () => {
    const customFormula: FuelFormula = {
      id: `custom-${Date.now()}`,
      name: `Custom Formula · ${customFlavor}`,
      subtitle: 'Tailored Osmotic Dispenser Blend',
      category: 'intra',
      proteinGrams: 10,
      carbsGrams: customCarbs,
      electrolytesMg: Math.round(800 * customElectrolytes),
      caffeineMg: 150,
      caloricValue: Math.round(customCarbs * 4 + 40),
      color: '#CCFF00',
      flavor: customFlavor,
      description: 'Customized blend synthesized on demand at the automated kiosk dispenser bay.',
      ingredients: [
        `${customCarbs}g High-Molecular Cluster Dextrin`,
        `${Math.round(800 * customElectrolytes)}mg Tri-Electrolyte Osmotic Matrix`,
        '150mg Natural Caffeine PurCAF',
        '2,000mg L-Glutamine Fermented',
      ],
    };
    onDispenseFormula(customFormula, {
      volumeMl: customVolume,
      electrolyteMultiplier: customElectrolytes,
      carbsG: customCarbs,
      flavor: customFlavor,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with Dispenser Lab Image */}
      <div className="relative rounded-xl overflow-hidden border border-[#2C2C38] bg-[#15151B]">
        <div className="relative h-60 sm:h-72 w-full">
          <img
            src={NUTRITION_IMAGE}
            alt="Kinetic Volt Athletics automated nutritional dispensing lab"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-[#0D0D11]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D11]/85 via-transparent to-black/30" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5">
              <span className="text-[#CCFF00] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AUTOMATED MICRO-DISPENSING ACTIVE
              </span>
              <span aria-hidden="true">·</span>
              <span>12 KIOSK BAYS IN METRO NETWORK</span>
              <span aria-hidden="true">·</span>
              <span>REAL-TIME HYPOTONIC MIXING</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
              Nutrient Synthesis Lab
            </h1>
            <p className="text-sm text-[#E4E1E7]/80 font-body max-w-xl mt-1">
              Precision sports nutrition freshly compounded in 15 seconds. Tailor osmolarity, electrolyte density, and peptide loads for your metabolic state.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase font-bold tracking-wider rounded transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#CCFF00] text-[#0D0D11] shadow-sm'
                  : 'bg-[#15151B] text-[#A0A0B2] hover:text-white hover:bg-[#1E1E26] border border-[#2C2C38]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.map((form) => (
          <div
            key={form.id}
            className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6 flex flex-col justify-between group hover:border-[#CCFF00]/40 transition-colors"
          >
            <div>
              {/* Category & Flavor Header */}
              <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
                <span className="text-[#A0A0B2] uppercase">{form.subtitle}</span>
                <span className="text-white font-bold bg-[#1E1E26] px-2 py-0.5 rounded border border-[#2C2C38]">
                  {form.flavor}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                {form.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E4E1E7]/70 font-body mt-1">
                {form.description}
              </p>

              {/* Macro Bar */}
              <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs font-mono-tech">
                <div className="bg-[#1E1E26] p-2 rounded border border-[#2C2C38]/40">
                  <div className="text-[10px] text-[#A0A0B2] uppercase">Protein</div>
                  <div className="text-white font-bold text-sm tabular-nums mt-0.5">{form.proteinGrams}g</div>
                </div>
                <div className="bg-[#1E1E26] p-2 rounded border border-[#2C2C38]/40">
                  <div className="text-[10px] text-[#A0A0B2] uppercase">Carbs</div>
                  <div className="text-white font-bold text-sm tabular-nums mt-0.5">{form.carbsGrams}g</div>
                </div>
                <div className="bg-[#1E1E26] p-2 rounded border border-[#2C2C38]/40">
                  <div className="text-[10px] text-[#A0A0B2] uppercase">Electrolytes</div>
                  <div className="text-[#00F0FF] font-bold text-sm tabular-nums mt-0.5">{form.electrolytesMg}mg</div>
                </div>
                <div className="bg-[#1E1E26] p-2 rounded border border-[#2C2C38]/40">
                  <div className="text-[10px] text-[#A0A0B2] uppercase">Caffeine</div>
                  <div className="text-[#CCFF00] font-bold text-sm tabular-nums mt-0.5">{form.caffeineMg}mg</div>
                </div>
              </div>

              {/* Key Ingredients List */}
              <div className="mt-4 pt-3 border-t border-[#2C2C38]/60 space-y-1">
                <div className="text-[10px] font-mono-tech text-[#A0A0B2] uppercase">Active Matrix Compounding:</div>
                <ul className="text-xs font-mono-tech text-[#E4E1E7]/80 space-y-1">
                  {form.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#CCFF00] shrink-0" />
                      <span className="truncate">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dispense Trigger */}
            <div className="mt-5 pt-4 border-t border-[#2C2C38] flex items-center justify-between gap-3">
              <div className="text-xs font-mono-tech text-[#A0A0B2]">
                <span className="text-white font-bold tabular-nums">{form.caloricValue} KCAL</span> · DISPENSE TIME ~15S
              </div>
              <button
                onClick={() => onDispenseFormula(form)}
                className="px-4 py-2 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] text-xs font-mono-tech font-bold uppercase rounded flex items-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap shadow-md"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Dispense at Kiosk</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Custom Nutrient Compounding Station */}
      <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C2C38]">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#CCFF00]" />
            <div>
              <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                Custom Osmotic Compounding Station
              </h2>
              <div className="text-xs font-mono-tech text-[#A0A0B2]">
                Calibrate fluid volume, mineral osmolarity, and carbohydrate density
              </div>
            </div>
          </div>
          <div className="text-xs font-mono-tech text-[#CCFF00] font-bold">
            HYPOTONIC CELLULAR OPTIMIZATION
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Fluid Volume */}
          <div className="space-y-2 bg-[#1E1E26] p-4 rounded-lg border border-[#2C2C38]">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#A0A0B2] uppercase">Flask Volume</span>
              <span className="text-white font-bold tabular-nums">{customVolume} ML</span>
            </div>
            <input
              type="range"
              min="350"
              max="800"
              step="50"
              value={customVolume}
              onChange={(e) => setCustomVolume(Number(e.target.value))}
              className="w-full accent-[#CCFF00] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono-tech text-[#A0A0B2]">
              <span>350ml Rapid</span>
              <span>500ml Standard</span>
              <span>800ml Endurance</span>
            </div>
          </div>

          {/* Slider 2: Electrolyte Multiplier */}
          <div className="space-y-2 bg-[#1E1E26] p-4 rounded-lg border border-[#2C2C38]">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#A0A0B2] uppercase">Electrolyte Ratio</span>
              <span className="text-[#00F0FF] font-bold tabular-nums">{customElectrolytes.toFixed(1)}x ({Math.round(800 * customElectrolytes)}mg)</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              value={customElectrolytes}
              onChange={(e) => setCustomElectrolytes(Number(e.target.value))}
              className="w-full accent-[#00F0FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono-tech text-[#A0A0B2]">
              <span>1.0x Base</span>
              <span>1.5x Tropical Sweat</span>
              <span>2.5x Heavy Cramp Shield</span>
            </div>
          </div>

          {/* Slider 3: Carbohydrate Matrix */}
          <div className="space-y-2 bg-[#1E1E26] p-4 rounded-lg border border-[#2C2C38]">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#A0A0B2] uppercase">Cluster Dextrin</span>
              <span className="text-[#CCFF00] font-bold tabular-nums">{customCarbs}g ({customCarbs * 4} kcal)</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={customCarbs}
              onChange={(e) => setCustomCarbs(Number(e.target.value))}
              className="w-full accent-[#CCFF00] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono-tech text-[#A0A0B2]">
              <span>0g Keto Fast</span>
              <span>25g Glycogen Top-up</span>
              <span>60g Max Oxidation</span>
            </div>
          </div>
        </div>

        {/* Flavor Profile & Synthesis Trigger */}
        <div className="mt-6 pt-5 border-t border-[#2C2C38] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono-tech text-[#A0A0B2] uppercase whitespace-nowrap">Flavor System:</span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {['Yuzu Lime Volt', 'Blood Orange Crimson', 'Arctic Frost Cyan', 'Kyoto Matcha Nitro'].map((flav) => (
                <button
                  key={flav}
                  onClick={() => setCustomFlavor(flav)}
                  className={`px-3 py-1 text-xs font-mono-tech rounded border transition-colors whitespace-nowrap ${
                    customFlavor === flav
                      ? 'border-[#CCFF00] text-white bg-[#CCFF00]/10 font-bold'
                      : 'border-[#2C2C38] text-[#A0A0B2] hover:text-white bg-[#1E1E26]'
                  }`}
                >
                  {flav}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDispenseCustom}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] text-xs font-mono-tech font-bold uppercase rounded flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Dispense QR Token</span>
          </button>
        </div>
      </div>
    </div>
  );
};
