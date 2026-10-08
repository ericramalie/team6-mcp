import React, { useState } from 'react';
import { Facility } from '../types';
import { MapPin, Users, Thermometer, Clock, ArrowRight, ShieldCheck, Filter } from 'lucide-react';

interface FacilityScreenProps {
  facilities: Facility[];
  userCredits: number;
  onBookSlot: (facility: Facility, slot: string) => void;
}

export const FacilityScreen: React.FC<FacilityScreenProps> = ({
  facilities,
  userCredits,
  onBookSlot,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedSlotByFacility, setSelectedSlotByFacility] = useState<Record<string, string>>({});

  const filterTabs = [
    { id: 'all', label: 'All Urban Bays' },
    { id: 'hypoxic', label: 'Hypoxic Altitude' },
    { id: 'biomechanics', label: 'Sprint & Biomechanics' },
    { id: 'recovery', label: 'Cryo & Hydro' },
    { id: 'strength', label: 'Olympic Ballistics' },
  ];

  const filteredFacilities = filterType === 'all'
    ? facilities
    : facilities.filter((f) => f.type === filterType);

  const handleSelectSlot = (facilityId: string, slot: string) => {
    setSelectedSlotByFacility((prev) => ({ ...prev, [facilityId]: slot }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2C2C38]">
        <div>
          {/* Clean unboxed metadata (Zero-Pill rule) */}
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5">
            <span>METROPOLITAN ATHLETIC GRID</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#CCFF00]">24/7 BIOMETRIC NFC ACCESS</span>
            <span aria-hidden="true">·</span>
            <span>SINGAPORE SECTORS 01-04</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Performance Hubs & Research Bays
          </h1>
          <p className="text-sm sm:text-base text-[#E4E1E7]/80 font-body max-w-2xl mt-1">
            Reserve dedicated sports science environments equipped with hypoxic simulation, tri-axial force plates, and cryo-thermal recovery pods.
          </p>
        </div>

        {/* User Credit Balance Readout */}
        <div className="p-3.5 bg-[#15151B] border border-[#2C2C38] rounded-lg min-w-[200px]">
          <div className="text-[10px] font-mono-tech text-[#A0A0B2] uppercase">AVAILABLE TOKENS</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-3xl font-black text-[#CCFF00] tabular-nums">
              {userCredits}
            </span>
            <span className="text-xs font-mono-tech text-[#A0A0B2]">CREDITS</span>
          </div>
          <div className="text-[10px] font-mono-tech text-[#00F0FF] mt-0.5">
            Auto-replenishing Monthly Apex Tier
          </div>
        </div>
      </div>

      {/* Filter Tabs (Functional segmented buttons with click handlers) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-[#A0A0B2] shrink-0 mr-1" />
        {filterTabs.map((tab) => {
          const isActive = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase font-bold tracking-wider rounded transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#CCFF00] text-[#0D0D11] shadow-sm'
                  : 'bg-[#15151B] text-[#A0A0B2] hover:text-white hover:bg-[#1E1E26] border border-[#2C2C38]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFacilities.map((fac) => {
          const selectedSlot = selectedSlotByFacility[fac.id] || fac.availableSlots[0];
          const availableBays = fac.capacityMax - fac.capacityOccupied;
          const isFull = availableBays <= 0;

          return (
            <div
              key={fac.id}
              className="rounded-xl border border-[#2C2C38] bg-[#15151B] overflow-hidden flex flex-col group hover:border-[#CCFF00]/40 transition-all duration-200"
            >
              {/* Image Frame */}
              <div className="relative h-56 sm:h-64 w-full bg-[#1E1E26] overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15151B] via-transparent to-black/40" />

                {/* Top Corner Meta */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech">
                  <span className="bg-[#0D0D11]/80 backdrop-blur-md border border-[#2C2C38] text-white px-2.5 py-1 rounded">
                    {fac.sector}
                  </span>
                  <span className="bg-[#0D0D11]/80 backdrop-blur-md border border-[#2C2C38] text-[#CCFF00] font-bold px-2.5 py-1 rounded">
                    {fac.priceCredits} CREDITS / HR
                  </span>
                </div>

                {/* Bottom Overlay Status */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-white">
                  <div className="flex items-center gap-1.5 bg-[#0D0D11]/80 px-2.5 py-1 rounded border border-[#2C2C38]">
                    <Thermometer className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>{fac.temperature}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0D0D11]/80 px-2.5 py-1 rounded border border-[#2C2C38]">
                    <Users className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>{availableBays} of {fac.capacityMax} bays free</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#A0A0B2] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>{fac.location}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                    {fac.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E4E1E7]/70 font-body mt-1">
                    {fac.specialty}
                  </p>
                </div>

                {/* Hardware Specs Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2C2C38]/60 text-xs font-mono-tech">
                  {fac.specs.map((sp, idx) => (
                    <div key={idx} className="bg-[#1E1E26] p-2 rounded border border-[#2C2C38]/40">
                      <div className="text-[10px] text-[#A0A0B2] uppercase">{sp.label}</div>
                      <div className="text-white font-bold truncate mt-0.5">{sp.value}</div>
                    </div>
                  ))}
                </div>

                {/* Slot Selection & Booking Action */}
                <div className="pt-3 border-t border-[#2C2C38] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#A0A0B2]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                      SELECT 60-MIN TIME WINDOW
                    </span>
                    <span className="text-white font-bold">TODAY</span>
                  </div>

                  {/* Slot buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {fac.availableSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleSelectSlot(fac.id, slot)}
                          className={`py-1.5 px-2 text-xs font-mono-tech text-center rounded transition-colors ${
                            isSelected
                              ? 'bg-[#CCFF00] text-[#0D0D11] font-bold ring-1 ring-[#CCFF00]'
                              : 'bg-[#1E1E26] text-[#A0A0B2] hover:text-white hover:bg-[#2A292E] border border-[#2C2C38]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onBookSlot(fac, selectedSlot)}
                    disabled={isFull}
                    className={`w-full py-2.5 px-4 rounded text-xs font-mono-tech uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] ${
                      isFull
                        ? 'bg-[#2A292E] text-[#A0A0B2] cursor-not-allowed'
                        : 'bg-[#CCFF00] text-[#0D0D11] hover:bg-[#abd600] shadow-md'
                    }`}
                  >
                    <span>{isFull ? 'Bay Fully Booked' : `Reserve ${fac.name.split(' ')[0]} for ${selectedSlot}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety & Induction Guarantee Banner */}
      <div className="p-5 rounded-xl border border-[#2C2C38] bg-[#15151B] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#CCFF00] shrink-0 mt-1" />
          <div>
            <div className="font-display text-lg font-bold uppercase text-white">
              Medical & Environmental Calibration Guaranteed
            </div>
            <p className="text-xs text-[#A0A0B2] font-body">
              All chambers are certified under high-altitude hypoxic safety guidelines with real-time continuous SpO2 pulse oximetry link.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono-tech text-[#00F0FF] whitespace-nowrap">
          ISO 13485 CERTIFIED
        </div>
      </div>
    </div>
  );
};
