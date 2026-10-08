import React, { useState } from 'react';
import { AthleteProfile } from '../types';
import { RECOVERY_IMAGE } from '../data/mockData';
import { Shield, QrCode, Cpu, Heart, Moon, Zap, Activity, Check, Copy } from 'lucide-react';

interface PassportScreenProps {
  athlete: AthleteProfile;
  onOpenQuickBooking: () => void;
}

export const PassportScreen: React.FC<PassportScreenProps> = ({
  athlete,
  onOpenQuickBooking,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isNfcSimulating, setIsNfcSimulating] = useState<boolean>(false);
  const [nfcSuccess, setNfcSuccess] = useState<boolean>(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(athlete.athleteId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateNfcTap = () => {
    setIsNfcSimulating(true);
    setNfcSuccess(false);
    setTimeout(() => {
      setIsNfcSimulating(false);
      setNfcSuccess(true);
      setTimeout(() => setNfcSuccess(false), 3000);
    }, 1200);
  };

  const weeklyLoadData = [
    { day: 'MON', strain: 15.2, recovery: 92, target: 'VO2 Max Threshold' },
    { day: 'TUE', strain: 12.8, recovery: 88, target: 'Velocity Strength' },
    { day: 'WED', strain: 18.4, recovery: 74, target: 'Hypoxic Altitude' },
    { day: 'THU', strain: 6.2, recovery: 95, target: 'Active Hydro Plunge' },
    { day: 'FRI', strain: 16.9, recovery: 85, target: 'Sprint Biomechanics' },
    { day: 'SAT', strain: 17.8, recovery: 92, target: 'Current Live Session' },
    { day: 'SUN', strain: 0.0, recovery: 98, target: 'Planned Restoration' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2C2C38]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A0A0B2] uppercase mb-1.5">
            <span>NEUROMUSCULAR IDENTITY</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#CCFF00]">APEX DIVISION PRO ATHLETE</span>
            <span aria-hidden="true">·</span>
            <span>ENCRYPTED TELEMETRY PASSPORT</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Athlete Biometric Passport
          </h1>
          <p className="text-sm sm:text-base text-[#E4E1E7]/80 font-body max-w-2xl mt-1">
            Autonomous health record synthesizing nocturnal heart rate variability, autonomic balance, and metropolitan hub access credentials.
          </p>
        </div>

        <button
          onClick={onOpenQuickBooking}
          className="px-5 py-2.5 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] text-xs font-mono-tech font-bold uppercase rounded flex items-center gap-2 transition-transform active:scale-95 shadow-md whitespace-nowrap self-start md:self-auto"
        >
          <Activity className="w-4 h-4" />
          <span>Book Recovery Session</span>
        </button>
      </div>

      {/* Main Grid: Digital NFC Access Card & Readiness Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Digital NFC Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl border-2 border-[#CCFF00]/40 bg-gradient-to-br from-[#1E1E26] via-[#15151B] to-[#0D0D11] p-6 shadow-2xl overflow-hidden group">
            {/* Ambient volt glow pattern */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between text-xs font-mono-tech pb-4 border-b border-[#2C2C38]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#CCFF00] rounded-full animate-ping" />
                <span className="text-white font-bold tracking-wider">KINETIC VOLT ACCESS</span>
              </div>
              <span className="text-[#CCFF00] font-bold bg-[#CCFF00]/10 border border-[#CCFF00]/30 px-2 py-0.5 rounded text-[10px]">
                {athlete.tier}
              </span>
            </div>

            {/* Middle: Athlete Info & Photo snippet */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-tech text-[#A0A0B2] uppercase">Athlete Callsign</div>
                <div className="font-display text-3xl font-black text-white tracking-wide mt-0.5">
                  {athlete.name}
                </div>
                <div className="text-xs font-mono-tech text-[#00F0FF] mt-0.5">
                  ID: {athlete.athleteId}
                </div>
              </div>

              {/* QR Code Graphic Box */}
              <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-[#0D0D11]" />
              </div>
            </div>

            {/* Core Physiological Benchmarks */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-mono-tech pt-4 border-t border-[#2C2C38]">
              <div className="bg-[#0D0D11]/60 p-2 rounded border border-[#2C2C38]">
                <div className="text-[10px] text-[#A0A0B2] uppercase">VO2 Max</div>
                <div className="text-[#CCFF00] font-bold text-lg tabular-nums mt-0.5">{athlete.vo2Max}</div>
                <div className="text-[9px] text-[#A0A0B2]">ml/kg/min</div>
              </div>
              <div className="bg-[#0D0D11]/60 p-2 rounded border border-[#2C2C38]">
                <div className="text-[10px] text-[#A0A0B2] uppercase">Resting HR</div>
                <div className="text-white font-bold text-lg tabular-nums mt-0.5">{athlete.restingHr}</div>
                <div className="text-[9px] text-[#A0A0B2]">BPM</div>
              </div>
              <div className="bg-[#0D0D11]/60 p-2 rounded border border-[#2C2C38]">
                <div className="text-[10px] text-[#A0A0B2] uppercase">HRV Baseline</div>
                <div className="text-[#00F0FF] font-bold text-lg tabular-nums mt-0.5">{athlete.hrvBaseline}</div>
                <div className="text-[9px] text-[#A0A0B2]">ms (RMSSD)</div>
              </div>
            </div>

            {/* Turnstile / Hub Authentication Bar */}
            <div className="mt-6 pt-4 border-t border-[#2C2C38] flex flex-col gap-2">
              <button
                onClick={handleSimulateNfcTap}
                disabled={isNfcSimulating}
                className={`w-full py-2.5 px-4 rounded text-xs font-mono-tech font-bold uppercase flex items-center justify-center gap-2 transition-all ${
                  nfcSuccess
                    ? 'bg-[#00F0FF] text-[#0D0D11]'
                    : isNfcSimulating
                    ? 'bg-[#1E1E26] text-[#CCFF00] animate-pulse border border-[#CCFF00]'
                    : 'bg-[#1E1E26] hover:bg-[#2A292E] text-white border border-[#2C2C38]'
                }`}
              >
                {nfcSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Turnstile Gate 02 Unlocked!</span>
                  </>
                ) : isNfcSimulating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Broadcasting NFC Frequency...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-[#CCFF00]" />
                    <span>Tap to Open Turnstile Gate</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyId}
                className="text-[11px] font-mono-tech text-[#A0A0B2] hover:text-white flex items-center justify-center gap-1.5 py-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Athlete ID' : 'Copy Credentials Token'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Daily Readiness & Autonomic Radar (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C2C38]">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                  Autonomic Readiness Index
                </h2>
                <div className="text-xs font-mono-tech text-[#A0A0B2] mt-0.5">
                  Synthesized from 8.2 hrs Nocturnal Sleep Telemetry
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech">
                <span className="text-[#CCFF00] font-bold text-xl tabular-nums">{athlete.readinessScore}%</span>
                <span className="text-white bg-[#1E1E26] px-2.5 py-1 rounded border border-[#2C2C38]">
                  PRIMED FOR PEAK STRAIN
                </span>
              </div>
            </div>

            {/* Radar / Component Readiness Gauges */}
            <div className="mt-6 space-y-4">
              {/* CNS Readiness */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                  <span className="flex items-center gap-2 text-white">
                    <Cpu className="w-3.5 h-3.5 text-[#CCFF00]" />
                    CNS Synaptic Velocity
                  </span>
                  <span className="text-[#CCFF00] font-bold tabular-nums">{athlete.biometricRadar.cnsReadiness}%</span>
                </div>
                <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#CCFF00] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.biometricRadar.cnsReadiness}%` }}
                  />
                </div>
              </div>

              {/* HRV Autonomic Balance */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                  <span className="flex items-center gap-2 text-white">
                    <Heart className="w-3.5 h-3.5 text-[#00F0FF]" />
                    HRV Parasympathetic Tone
                  </span>
                  <span className="text-[#00F0FF] font-bold tabular-nums">{athlete.biometricRadar.hrvBalance}%</span>
                </div>
                <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00F0FF] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.biometricRadar.hrvBalance}%` }}
                  />
                </div>
              </div>

              {/* Sleep Architecture */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                  <span className="flex items-center gap-2 text-white">
                    <Moon className="w-3.5 h-3.5 text-[#C4C9AC]" />
                    Stage 4 Deep Slow-Wave Rest
                  </span>
                  <span className="text-[#C4C9AC] font-bold tabular-nums">{athlete.biometricRadar.sleepArchitecture}%</span>
                </div>
                <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C4C9AC] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.biometricRadar.sleepArchitecture}%` }}
                  />
                </div>
              </div>

              {/* Muscle Recovery */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                  <span className="flex items-center gap-2 text-white">
                    <Zap className="w-3.5 h-3.5 text-[#FF334B]" />
                    Myofibrillar Structural Integrity
                  </span>
                  <span className="text-[#FF334B] font-bold tabular-nums">{athlete.biometricRadar.muscleRecovery}%</span>
                </div>
                <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF334B] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.biometricRadar.muscleRecovery}%` }}
                  />
                </div>
              </div>

              {/* Metabolic Refuel */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                  <span className="flex items-center gap-2 text-white">
                    <Activity className="w-3.5 h-3.5 text-[#CCFF00]" />
                    Hepatic & Muscle Glycogen Saturation
                  </span>
                  <span className="text-[#CCFF00] font-bold tabular-nums">{athlete.biometricRadar.metabolicRefuel}%</span>
                </div>
                <div className="w-full h-2 bg-[#1E1E26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#CCFF00] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.biometricRadar.metabolicRefuel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Training Load Distribution Table */}
      <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2C2C38]">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              Weekly Strain Accumulation & Periodization
            </h2>
            <div className="text-xs font-mono-tech text-[#A0A0B2] mt-0.5">
              Target Weekly Workload: 16.0–19.5 Strain
            </div>
          </div>
          <div className="text-xs font-mono-tech text-[#CCFF00] font-bold">
            TOTAL 7-DAY STRAIN: 17.8
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead>
              <tr className="text-[#A0A0B2] border-b border-[#2C2C38]/60 pb-2">
                <th className="py-2.5 font-bold uppercase">Day</th>
                <th className="py-2.5 font-bold uppercase">Session Focus</th>
                <th className="py-2.5 font-bold uppercase text-right">Strain</th>
                <th className="py-2.5 font-bold uppercase text-right">Recovery %</th>
                <th className="py-2.5 font-bold uppercase text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2C38]/40">
              {weeklyLoadData.map((row) => (
                <tr key={row.day} className="hover:bg-[#1E1E26]/50 transition-colors">
                  <td className="py-3 font-bold text-[#CCFF00]">{row.day}</td>
                  <td className="py-3 text-white font-medium">{row.target}</td>
                  <td className="py-3 text-right tabular-nums font-bold text-white">
                    {row.strain > 0 ? row.strain.toFixed(1) : '—'}
                  </td>
                  <td className="py-3 text-right tabular-nums text-[#00F0FF]">
                    {row.recovery}%
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.strain >= 16
                          ? 'bg-[#FF334B]/20 text-[#FF334B]'
                          : row.strain > 0
                          ? 'bg-[#CCFF00]/20 text-[#CCFF00]'
                          : 'bg-[#1E1E26] text-[#A0A0B2]'
                      }`}
                    >
                      {row.strain >= 16 ? 'HIGH LOAD' : row.strain > 0 ? 'ADAPTATION' : 'REST'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recovery Facility Spotlight Photo */}
      <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3 h-44 rounded-lg overflow-hidden bg-[#1E1E26] shrink-0">
          <img
            src={RECOVERY_IMAGE}
            alt="Cold water hydro recovery immersion bath"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-xs font-mono-tech text-[#00F0FF] uppercase">RECOMMENDED PROTOCOL TODAY</div>
          <h3 className="font-display text-2xl font-bold uppercase text-white">
            Keppel Dual-Thermal 3.8°C Contrast Plunge
          </h3>
          <p className="text-xs sm:text-sm text-[#E4E1E7]/80 font-body">
            Based on your 14.8 strain score accumulated in today's velocity session, a 12-minute contrast protocol (3 min at 3.8°C followed by 3 min at 41.5°C x 2 cycles) is recommended to accelerate peripheral lactate clearance.
          </p>
          <button
            onClick={onOpenQuickBooking}
            className="mt-2 text-xs font-mono-tech text-[#CCFF00] hover:underline uppercase font-bold flex items-center gap-1"
          >
            <span>Reserve Keppel Plunge Pod 02</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
