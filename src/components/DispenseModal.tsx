import React, { useState, useEffect } from 'react';
import { FuelFormula } from '../types';
import { X, Check, Droplets, QrCode, Sparkles, MapPin } from 'lucide-react';

interface DispenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  formula: FuelFormula | null;
  customSpecs?: { volumeMl: number; electrolyteMultiplier: number; carbsG: number; flavor: string } | null;
}

export const DispenseModal: React.FC<DispenseModalProps> = ({
  isOpen,
  onClose,
  formula,
  customSpecs,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<string>('Initializing Kiosk Dispenser...');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lockerBay] = useState<number>(() => Math.floor(1 + Math.random() * 8));

  useEffect(() => {
    if (!isOpen || !formula) {
      setProgress(0);
      setIsCompleted(false);
      return;
    }

    setProgress(15);
    setStage('Ultrasonic Nozzle Sterilization...');

    const t1 = setTimeout(() => {
      setProgress(45);
      setStage('Precision Compounding Micro-Electrolyte Matrix...');
    }, 800);

    const t2 = setTimeout(() => {
      setProgress(78);
      setStage('Hypotonic Pressurization & Temperature Chill (4.2°C)...');
    }, 1600);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStage(`Flask Dispensed · Ready in Locker Bay 0${lockerBay}`);
      setIsCompleted(true);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, formula, lockerBay]);

  if (!isOpen || !formula) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border border-[#2C2C38] bg-[#15151B] p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#A0A0B2] hover:text-white rounded-lg hover:bg-[#1E1E26] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          {/* Header */}
          <div>
            <div className="text-[10px] font-mono-tech text-[#CCFF00] uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CONNECTED DISPENSING HUB KIOSK
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              {formula.name}
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00F0FF] mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Tanjong Pagar Hub · Kiosk Bay 0{lockerBay}</span>
            </div>
          </div>

          {/* Progress Animation */}
          <div className="p-4 bg-[#131317] rounded-xl border border-[#2C2C38] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-white font-bold">{stage}</span>
              <span className="text-[#CCFF00] font-bold tabular-nums">{progress}%</span>
            </div>

            <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#CCFF00] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-tech pt-2 border-t border-[#2C2C38]">
              <div>
                <span className="text-[9px] text-[#A0A0B2] uppercase block">Volume</span>
                <span className="text-white font-bold">{customSpecs?.volumeMl || 500}ml</span>
              </div>
              <div>
                <span className="text-[9px] text-[#A0A0B2] uppercase block">Electrolytes</span>
                <span className="text-[#00F0FF] font-bold">{formula.electrolytesMg}mg</span>
              </div>
              <div>
                <span className="text-[9px] text-[#A0A0B2] uppercase block">Flavor</span>
                <span className="text-[#CCFF00] font-bold truncate block">{formula.flavor}</span>
              </div>
            </div>
          </div>

          {/* QR Code and Locker Pickup Pass */}
          <div className="flex items-center gap-4 p-4 bg-[#1E1E26] rounded-xl border border-[#2C2C38]">
            <div className="w-20 h-20 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
              <QrCode className="w-full h-full text-[#0D0D11]" />
            </div>
            <div className="space-y-1 text-xs font-mono-tech">
              <div className="text-[10px] text-[#A0A0B2] uppercase">Touchless Kiosk Barcode</div>
              <div className="text-white font-bold">Locker Door 0{lockerBay} Pin:</div>
              <div className="text-xl font-black text-[#CCFF00] tracking-widest">
                #{Math.floor(2000 + Math.random() * 7000)}
              </div>
              <div className="text-[10px] text-[#A0A0B2]">Valid for 30 minutes at Hub Dispenser</div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className={`w-full py-2.5 px-4 rounded text-xs font-mono-tech font-bold uppercase transition-all shadow-md ${
              isCompleted
                ? 'bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] active:scale-95'
                : 'bg-[#1E1E26] text-[#A0A0B2]'
            }`}
          >
            {isCompleted ? 'Collection Complete · Return' : 'Compounding In Progress...'}
          </button>
        </div>
      </div>
    </div>
  );
};
