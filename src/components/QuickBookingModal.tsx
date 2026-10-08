import React, { useState } from 'react';
import { Facility } from '../types';
import { X, Check, Calendar, Clock, MapPin, QrCode, ShieldCheck } from 'lucide-react';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: Facility[];
  selectedFacility?: Facility | null;
  selectedSlot?: string | null;
  userCredits: number;
  onConfirmBooking: (facility: Facility, slot: string, credits: number) => void;
}

export const QuickBookingModal: React.FC<QuickBookingModalProps> = ({
  isOpen,
  onClose,
  facilities,
  selectedFacility: initialFacility,
  selectedSlot: initialSlot,
  userCredits,
  onConfirmBooking,
}) => {
  const [activeFacility, setActiveFacility] = useState<Facility>(initialFacility || facilities[0]);
  const [activeSlot, setActiveSlot] = useState<string>(initialSlot || activeFacility.availableSlots[0]);
  const [selectedDate, setSelectedDate] = useState<string>('TODAY · WED');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>('');

  if (!isOpen) return null;

  const handleFacilityChange = (fac: Facility) => {
    setActiveFacility(fac);
    setActiveSlot(fac.availableSlots[0]);
  };

  const handleConfirm = () => {
    const code = `KVA-${Math.floor(1000 + Math.random() * 9000)}`;
    setAccessCode(code);
    setIsConfirmed(true);
    onConfirmBooking(activeFacility, activeSlot, activeFacility.priceCredits);
  };

  const handleDone = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#2C2C38] bg-[#15151B] p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#A0A0B2] hover:text-white rounded-lg hover:bg-[#1E1E26] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div className="space-y-5">
            <div>
              <div className="text-[10px] font-mono-tech text-[#CCFF00] uppercase font-bold">
                RESERVATION PORTAL // 24-HOUR AUTONOMOUS ACCESS
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Reserve Performance Bay
              </h2>
              <p className="text-xs text-[#A0A0B2] font-body mt-0.5">
                Instant digital authorization. Access turnstiles will sync with your biometric passport.
              </p>
            </div>

            {/* Select Facility */}
            <div>
              <label className="block text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5">
                Select Facility & Lab Bay
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {facilities.map((fac) => {
                  const isSelected = fac.id === activeFacility.id;
                  return (
                    <button
                      key={fac.id}
                      onClick={() => handleFacilityChange(fac)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-mono-tech flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'border-[#CCFF00] bg-[#1E1E26] text-white'
                          : 'border-[#2C2C38] bg-[#131317] text-[#A0A0B2] hover:text-white hover:bg-[#1E1E26]/60'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="font-bold text-white uppercase truncate">{fac.name}</div>
                        <div className="text-[10px] text-[#A0A0B2]">{fac.location}</div>
                      </div>
                      <span className="text-[#CCFF00] font-bold shrink-0">{fac.priceCredits} CREDITS</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date and Slot Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#CCFF00]" />
                  Day Window
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#1E1E26] text-white border border-[#2C2C38] rounded p-2 text-xs font-mono-tech focus:border-[#CCFF00] focus:outline-none"
                >
                  <option value="TODAY · WED">TODAY · WED</option>
                  <option value="TOMORROW · THU">TOMORROW · THU</option>
                  <option value="FRI · OCT 10">FRI · OCT 10</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                  Time Slot
                </label>
                <select
                  value={activeSlot}
                  onChange={(e) => setActiveSlot(e.target.value)}
                  className="w-full bg-[#1E1E26] text-white border border-[#2C2C38] rounded p-2 text-xs font-mono-tech focus:border-[#CCFF00] focus:outline-none"
                >
                  {activeFacility.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (60 mins)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Credit Transaction Summary */}
            <div className="p-3.5 bg-[#131317] border border-[#2C2C38] rounded-lg text-xs font-mono-tech space-y-1">
              <div className="flex justify-between text-[#A0A0B2]">
                <span>Current Token Balance:</span>
                <span className="text-white font-bold">{userCredits} Credits</span>
              </div>
              <div className="flex justify-between text-[#A0A0B2]">
                <span>Reservation Cost:</span>
                <span className="text-[#FF334B] font-bold">-{activeFacility.priceCredits} Credits</span>
              </div>
              <div className="flex justify-between border-t border-[#2C2C38] pt-1 text-white font-bold">
                <span>Remaining After Booking:</span>
                <span className="text-[#CCFF00]">{userCredits - activeFacility.priceCredits} Credits</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-[#1E1E26] hover:bg-[#2A292E] text-white rounded text-xs font-mono-tech font-bold uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 px-4 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] rounded text-xs font-mono-tech font-bold uppercase transition-transform active:scale-95 shadow-md"
              >
                Confirm Bay
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Ticket Card */
          <div className="space-y-5 text-center py-2 animate-fadeIn">
            <div className="w-12 h-12 bg-[#CCFF00]/20 text-[#CCFF00] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div>
              <div className="text-[10px] font-mono-tech text-[#00F0FF] uppercase font-bold">
                AUTHORIZATION ENCRYPTED & ISSUED
              </div>
              <h2 className="font-display text-3xl font-black uppercase text-white mt-1">
                Bay Access Confirmed
              </h2>
              <p className="text-xs text-[#A0A0B2] font-body mt-1">
                Your NFC credential is valid for entrance 15 minutes prior to session start.
              </p>
            </div>

            {/* Access Pass Ticket Container */}
            <div className="p-4 bg-[#131317] border-2 border-dashed border-[#CCFF00]/50 rounded-xl text-left font-mono-tech text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#2C2C38] pb-2">
                <span className="text-[#A0A0B2] uppercase">Facility Bay:</span>
                <span className="text-white font-bold">{activeFacility.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#2C2C38] pb-2">
                <span className="text-[#A0A0B2] uppercase">Time & Date:</span>
                <span className="text-[#CCFF00] font-bold">{selectedDate} @ {activeSlot}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#2C2C38] pb-2">
                <span className="text-[#A0A0B2] uppercase">Location:</span>
                <span className="text-white">{activeFacility.location}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#A0A0B2] uppercase">Turnstile PIN:</span>
                <span className="text-xl font-black text-[#00F0FF] tracking-widest">{accessCode}</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-2.5 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] rounded text-xs font-mono-tech font-bold uppercase transition-transform active:scale-95 shadow-md"
            >
              Done & Return to Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
