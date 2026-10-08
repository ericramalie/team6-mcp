import React, { useState } from 'react';
import { ScreenTab, Facility, FuelFormula } from './types';
import { INITIAL_ATHLETE, INITIAL_FACILITIES, INITIAL_HR_ZONES, FUEL_FORMULAS } from './data/mockData';
import { TopNav } from './components/TopNav';
import { TelemetryScreen } from './components/TelemetryScreen';
import { FacilityScreen } from './components/FacilityScreen';
import { FuelLabScreen } from './components/FuelLabScreen';
import { PassportScreen } from './components/PassportScreen';
import { MobileBottomNav } from './components/MobileBottomNav';
import { QuickBookingModal } from './components/QuickBookingModal';
import { DispenseModal } from './components/DispenseModal';
import { CheckCircle2, Wifi, BatteryCharging, Signal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('telemetry');
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);
  const [userCredits, setUserCredits] = useState<number>(INITIAL_ATHLETE.monthlyCredits);
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [dispenseModalOpen, setDispenseModalOpen] = useState<boolean>(false);
  const [selectedFormula, setSelectedFormula] = useState<FuelFormula | null>(null);
  const [customDispenseSpecs, setCustomDispenseSpecs] = useState<{
    volumeMl: number;
    electrolyteMultiplier: number;
    carbsG: number;
    flavor: string;
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleBookSlot = (fac: Facility, slot: string) => {
    setSelectedFacility(fac);
    setSelectedSlot(slot);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (facility: Facility, slot: string, credits: number) => {
    setUserCredits((prev) => Math.max(0, prev - credits));
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facility.id
          ? { ...f, capacityOccupied: Math.min(f.capacityMax, f.capacityOccupied + 1) }
          : f
      )
    );
    showToast(`Confirmed ${facility.name} bay reservation for ${slot}.`);
  };

  const handleDispense = (
    formula: FuelFormula,
    customSpecs?: { volumeMl: number; electrolyteMultiplier: number; carbsG: number; flavor: string }
  ) => {
    setSelectedFormula(formula);
    setCustomDispenseSpecs(customSpecs || null);
    setDispenseModalOpen(true);
    showToast(`Compounding ${formula.name} at Kiosk Dispenser.`);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'telemetry':
        return (
          <TelemetryScreen
            zones={INITIAL_HR_ZONES}
            onOpenFuelLab={() => setActiveTab('fuel')}
            onOpenQuickBooking={() => {
              setSelectedFacility(null);
              setSelectedSlot(null);
              setBookingModalOpen(true);
            }}
          />
        );
      case 'facilities':
        return (
          <FacilityScreen
            facilities={facilities}
            userCredits={userCredits}
            onBookSlot={handleBookSlot}
          />
        );
      case 'fuel':
        return (
          <FuelLabScreen
            formulas={FUEL_FORMULAS}
            onDispenseFormula={handleDispense}
          />
        );
      case 'passport':
        return (
          <PassportScreen
            athlete={{ ...INITIAL_ATHLETE, monthlyCredits: userCredits }}
            onOpenQuickBooking={() => {
              setSelectedFacility(null);
              setSelectedSlot(null);
              setBookingModalOpen(true);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D11] text-[#E4E1E7] flex flex-col font-body selection:bg-[#CCFF00] selection:text-[#0D0D11]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#1E1E26] text-white border border-[#CCFF00] rounded-lg shadow-xl animate-fadeIn text-xs font-mono-tech">
          <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobilePreview={isMobilePreview}
        setIsMobilePreview={setIsMobilePreview}
        onOpenQuickBooking={() => {
          setSelectedFacility(null);
          setSelectedSlot(null);
          setBookingModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      {isMobilePreview ? (
        /* Device Simulator Frame (414px mobile viewport preview) */
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#08080A]">
          <div className="text-center mb-3">
            <span className="text-xs font-mono-tech text-[#A0A0B2] uppercase">
              Mobile Touch Simulation (414 x 896px)
            </span>
          </div>

          <div className="w-full max-w-[414px] h-[860px] bg-[#0D0D11] rounded-[48px] border-8 border-[#2C2C38] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative">
            {/* Mobile Status Bar */}
            <div className="h-10 bg-[#131317] border-b border-[#2C2C38] px-6 flex items-center justify-between text-[11px] font-mono-tech text-[#A0A0B2] select-none shrink-0">
              <span className="text-white font-bold">09:41</span>
              {/* Dynamic Island Notch */}
              <div className="w-24 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3 text-white" />
                <Wifi className="w-3 h-3 text-white" />
                <BatteryCharging className="w-3.5 h-3.5 text-[#CCFF00]" />
              </div>
            </div>

            {/* Scrollable Mobile Screen Body */}
            <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none">
              {renderActiveScreen()}
            </div>

            {/* Mobile Bottom Navigation Anchor */}
            <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* iOS Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full pointer-events-none" />
          </div>
        </div>
      ) : (
        /* Full Desktop / Standard Responsive Layout */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {renderActiveScreen()}
        </main>
      )}

      {/* Mobile Bottom Navigation for Native Mobile Viewports when not in preview container */}
      {!isMobilePreview && (
        <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Footer (Quiet & Restrained, Anti-Slop, No decorative engines) */}
      <footer className="border-t border-[#2C2C38] bg-[#131317] py-6 px-4 lg:px-8 text-xs font-mono-tech text-[#A0A0B2] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CCFF00] inline-block" />
            <span className="text-white font-bold uppercase">Kinetic Volt Athletics</span>
            <span aria-hidden="true">·</span>
            <span>Sports Science & Telemetry Network</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Data Privacy & SpO2
            </a>
            <span aria-hidden="true">·</span>
            <a href="#hub-terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Hub Facility Invariants
            </a>
            <span aria-hidden="true">·</span>
            <span className="text-[#CCFF00]">Singapore Apex Grid</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuickBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        facilities={facilities}
        selectedFacility={selectedFacility}
        selectedSlot={selectedSlot}
        userCredits={userCredits}
        onConfirmBooking={handleConfirmBooking}
      />

      <DispenseModal
        isOpen={dispenseModalOpen}
        onClose={() => setDispenseModalOpen(false)}
        formula={selectedFormula}
        customSpecs={customDispenseSpecs}
      />
    </div>
  );
}
