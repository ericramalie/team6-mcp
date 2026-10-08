import React from 'react';
import { ScreenTab } from '../types';
import { Activity, Dumbbell, Zap, Shield, Smartphone, Monitor } from 'lucide-react';

interface TopNavProps {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean) => void;
  onOpenQuickBooking: () => void;
  unreadCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  isMobilePreview,
  setIsMobilePreview,
  onOpenQuickBooking,
}) => {
  const navItems: { id: ScreenTab; label: string; icon: React.ReactNode }[] = [
    { id: 'telemetry', label: 'Telemetry', icon: <Activity className="w-4 h-4" /> },
    { id: 'facilities', label: 'Facilities', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'fuel', label: 'Fuel Lab', icon: <Zap className="w-4 h-4" /> },
    { id: 'passport', label: 'Athlete Passport', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#131317]/90 backdrop-blur-md border-b border-[#2C2C38] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no pills or descriptors attached) */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('telemetry');
            }}
            className="font-display text-2xl lg:text-3xl font-black uppercase tracking-tight text-white hover:text-[#CCFF00] transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-6 bg-[#CCFF00] inline-block skew-x-[-12deg]" />
            Kinetic Volt Athletics
          </a>
        </div>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-150 whitespace-nowrap rounded ${
                  isActive
                    ? 'text-[#0D0D11] bg-[#CCFF00] font-bold shadow-sm'
                    : 'text-[#A0A0B2] hover:text-white hover:bg-[#1E1E26]'
                }`}
              >
                {item.icon}
                <span className="font-display tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mobile frame simulator toggle */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech border rounded transition-colors ${
              isMobilePreview
                ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10'
                : 'border-[#2C2C38] text-[#A0A0B2] hover:text-white hover:border-[#444933]'
            }`}
            title="Toggle between Full-Screen Desktop Dashboard and 414px Mobile Athlete Device frame"
          >
            {isMobilePreview ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isMobilePreview ? 'Desktop View' : 'Mobile View'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuickBooking}
            className="px-4 py-2 text-xs font-mono-tech uppercase font-bold tracking-wider text-[#0D0D11] bg-[#CCFF00] hover:bg-[#abd600] active:scale-95 transition-all rounded shadow-md whitespace-nowrap"
          >
            Reserve Bay
          </button>
        </div>
      </div>
    </header>
  );
};
