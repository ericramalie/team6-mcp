import React from 'react';
import { ScreenTab } from '../types';
import { Activity, Dumbbell, Zap, Shield } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs: { id: ScreenTab; label: string; icon: React.ReactNode }[] = [
    { id: 'telemetry', label: 'Telemetry', icon: <Activity className="w-5 h-5" /> },
    { id: 'facilities', label: 'Facilities', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'fuel', label: 'Fuel Lab', icon: <Zap className="w-5 h-5" /> },
    { id: 'passport', label: 'Passport', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#131317]/95 backdrop-blur-lg border-t border-[#2C2C38] pb-safe px-2 py-1.5 md:hidden">
      <div className="grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-[#CCFF00]' : 'text-[#A0A0B2] hover:text-white'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-mono-tech tracking-wider uppercase mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
