import React, { useState, useEffect } from 'react';
import { HeartRateZone, WorkoutSet } from '../types';
import { HERO_IMAGE } from '../data/mockData';
import { Play, Pause, RotateCcw, Plus, Check, Heart, Flame, Zap, Gauge, Radio } from 'lucide-react';

interface TelemetryScreenProps {
  zones: HeartRateZone[];
  onOpenFuelLab: () => void;
  onOpenQuickBooking: () => void;
}

export const TelemetryScreen: React.FC<TelemetryScreenProps> = ({
  zones,
  onOpenFuelLab,
  onOpenQuickBooking,
}) => {
  // Live session timer state
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(2478); // ~41m 18s
  const [currentHr, setCurrentHr] = useState<number>(168);
  const [currentWatts, setCurrentWatts] = useState<number>(342);
  const [currentStrain, setCurrentStrain] = useState<number>(14.8);
  const [selectedExercise, setSelectedExercise] = useState<string>('Trap Bar Velocity Pull');

  // Exercise log sets
  const [sets, setSets] = useState<WorkoutSet[]>([
    { id: 'set-1', setNumber: 1, exercise: 'Trap Bar Velocity Pull', weightKg: 140, reps: 5, rpe: 7.5, completed: true, powerWatts: 720 },
    { id: 'set-2', setNumber: 2, exercise: 'Trap Bar Velocity Pull', weightKg: 160, reps: 4, rpe: 8.0, completed: true, powerWatts: 785 },
    { id: 'set-3', setNumber: 3, exercise: 'Trap Bar Velocity Pull', weightKg: 175, reps: 3, rpe: 9.0, completed: true, powerWatts: 810 },
    { id: 'set-4', setNumber: 4, exercise: 'Trap Bar Velocity Pull', weightKg: 180, reps: 3, rpe: 9.5, completed: false, powerWatts: 0 },
  ]);

  // Form inputs for adding a set
  const [inputWeight, setInputWeight] = useState<number>(180);
  const [inputReps, setInputReps] = useState<number>(3);
  const [inputRpe, setInputRpe] = useState<number>(9.0);

  // Live sensor streaming simulation
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
      // Realistic biometric micro-fluctuations
      setCurrentHr((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.min(189, Math.max(145, next));
      });
      setCurrentWatts((prev) => {
        const delta = Math.floor(Math.random() * 15) - 7;
        return Math.min(480, Math.max(280, prev + delta));
      });
      setCurrentStrain((prev) => {
        if (Math.random() > 0.8) {
          return +(Math.min(20.5, prev + 0.05).toFixed(1));
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Determine current HR zone
  const activeZone = zones.find((z) => currentHr >= z.minBpm && currentHr <= z.maxBpm) || zones[3];

  const handleToggleComplete = (id: string) => {
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed, powerWatts: s.completed ? 0 : currentWatts * 2 } : s))
    );
  };

  const handleAddSet = (e: React.FormEvent) => {
    e.preventDefault();
    const newSet: WorkoutSet = {
      id: `set-${Date.now()}`,
      setNumber: sets.length + 1,
      exercise: selectedExercise,
      weightKg: Number(inputWeight),
      reps: Number(inputReps),
      rpe: Number(inputRpe),
      completed: true,
      powerWatts: Math.round(currentWatts * 2.2),
    };
    setSets([...sets, newSet]);
    // update strain slightly
    setCurrentStrain((prev) => +(Math.min(21.0, prev + 0.3).toFixed(1)));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Visual Section with Measured Scrim */}
      <div className="relative rounded-xl overflow-hidden border border-[#2C2C38] bg-[#15151B]">
        <div className="relative h-64 sm:h-80 lg:h-96 w-full">
          <img
            src={HERO_IMAGE}
            alt="Kinetic Volt Athletics high-performance track session"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-[#0D0D11]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D11]/80 via-transparent to-[#0D0D11]/40" />

          {/* Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              {/* Clean unboxed metadata with separators (Zero-Pill discipline) */}
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A0A0B2] mb-2 uppercase">
                <span className="flex items-center gap-1.5 text-[#CCFF00]">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  LIVE TELEMETRY ACTIVE
                </span>
                <span aria-hidden="true">·</span>
                <span>ANT+ OPTICAL HRM</span>
                <span aria-hidden="true">·</span>
                <span>SINGAPORE APEX HUB 01</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none">
                Velocity Strain Matrix
              </h1>
              <p className="text-sm sm:text-base text-[#E4E1E7]/80 font-body max-w-xl mt-1">
                Real-time neuromuscular cadence, cardiovascular threshold zones, and mechanical work capacity tracking.
              </p>
            </div>

            {/* Quick action triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenFuelLab}
                className="px-4 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider bg-[#1E1E26] hover:bg-[#2A292E] border border-[#2C2C38] text-white rounded transition-colors whitespace-nowrap"
              >
                Dispense Intra-Fuel
              </button>
              <button
                onClick={onOpenQuickBooking}
                className="px-4 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] rounded transition-transform active:scale-95 whitespace-nowrap"
              >
                Book Recovery Bay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Stream Grid (4 Key Telemetry Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Heart Rate */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#15151B] border border-[#2C2C38] relative overflow-hidden group hover:border-[#CCFF00]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#A0A0B2]">
            <span>CARDIOVASCULAR RATE</span>
            <Heart className="w-4 h-4 text-[#FF334B] animate-pulse" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
              {currentHr}
            </span>
            <span className="text-xs font-mono-tech text-[#A0A0B2]">BPM</span>
          </div>
          <div className="mt-2 text-xs font-mono-tech flex items-center justify-between">
            <span style={{ color: activeZone.color }} className="font-bold uppercase">
              Zone {activeZone.zone} · {activeZone.name}
            </span>
            <span className="text-[#A0A0B2] tabular-nums">{Math.round((currentHr / 195) * 100)}% MAX</span>
          </div>
          {/* Micro progress line */}
          <div className="mt-2 w-full h-1 bg-[#1E1E26] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (currentHr / 195) * 100)}%`,
                backgroundColor: activeZone.color,
              }}
            />
          </div>
        </div>

        {/* Metric 2: Live Strain Score */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#15151B] border border-[#2C2C38] relative overflow-hidden group hover:border-[#CCFF00]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#A0A0B2]">
            <span>SESSION STRAIN INDEX</span>
            <Flame className="w-4 h-4 text-[#CCFF00]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl font-black text-[#CCFF00] tabular-nums tracking-tight">
              {currentStrain.toFixed(1)}
            </span>
            <span className="text-xs font-mono-tech text-[#A0A0B2]">/ 21.0</span>
          </div>
          <div className="mt-2 text-xs font-mono-tech flex items-center justify-between text-[#A0A0B2]">
            <span>STIMULUS TARGET: 16.5</span>
            <span className="text-[#CCFF00] font-bold">ALL-OUT EFFORT</span>
          </div>
          <div className="mt-2 w-full h-1 bg-[#1E1E26] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] transition-all duration-500"
              style={{ width: `${(currentStrain / 21) * 100}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Power Output (Watts) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#15151B] border border-[#2C2C38] relative overflow-hidden group hover:border-[#00F0FF]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#A0A0B2]">
            <span>MECHANICAL POWER</span>
            <Zap className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
              {currentWatts}
            </span>
            <span className="text-xs font-mono-tech text-[#A0A0B2]">WATTS</span>
          </div>
          <div className="mt-2 text-xs font-mono-tech flex items-center justify-between text-[#A0A0B2]">
            <span>PEAK: 840W</span>
            <span className="text-[#00F0FF] tabular-nums">4.4 W/KG</span>
          </div>
          <div className="mt-2 w-full h-1 bg-[#1E1E26] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00F0FF] transition-all duration-300"
              style={{ width: `${Math.min(100, (currentWatts / 500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Session Timer & State */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#15151B] border border-[#2C2C38] relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#A0A0B2]">
            <span>SESSION DURATION</span>
            <Gauge className="w-4 h-4 text-[#E4E1E7]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
              {formatTimer(secondsElapsed)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-mono-tech font-bold uppercase transition-colors ${
                isRunning
                  ? 'bg-[#FF334B]/20 text-[#FF334B] hover:bg-[#FF334B]/30 border border-[#FF334B]/40'
                  : 'bg-[#CCFF00] text-[#0D0D11] hover:bg-[#abd600]'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={() => setSecondsElapsed(0)}
              className="p-1.5 rounded bg-[#1E1E26] hover:bg-[#2A292E] text-[#A0A0B2] hover:text-white transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Lower Split: Interactive Workout Logger & HR Zone Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Set & Velocity Logger (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C2C38]">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                  Active Movement Execution
                </h2>
                <div className="text-xs font-mono-tech text-[#A0A0B2] mt-0.5">
                  VBT Barbell & Ergometer Telemetry Log
                </div>
              </div>

              {/* Movement Selector */}
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="bg-[#1E1E26] text-white border border-[#2C2C38] rounded px-3 py-1.5 text-xs font-mono-tech focus:outline-none focus:border-[#CCFF00]"
              >
                <option value="Trap Bar Velocity Pull">Trap Bar Velocity Pull</option>
                <option value="500m Ergometer Interval">500m Ergometer Interval</option>
                <option value="Wattbike 30s Neuromuscular Sprint">Wattbike 30s Neuromuscular Sprint</option>
                <option value="Explosive Bulgarian Split Squat">Explosive Bulgarian Split Squat</option>
                <option value="Plyo Box Jump (30 Inch)">Plyo Box Jump (30 Inch)</option>
              </select>
            </div>

            {/* Sets Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-tech">
                <thead>
                  <tr className="text-[#A0A0B2] border-b border-[#2C2C38]/60 pb-2">
                    <th className="py-2.5 font-bold uppercase">Set</th>
                    <th className="py-2.5 font-bold uppercase">Exercise</th>
                    <th className="py-2.5 font-bold uppercase text-right">Load (KG)</th>
                    <th className="py-2.5 font-bold uppercase text-right">Reps</th>
                    <th className="py-2.5 font-bold uppercase text-right">RPE</th>
                    <th className="py-2.5 font-bold uppercase text-right">Power</th>
                    <th className="py-2.5 font-bold uppercase text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2C38]/40">
                  {sets.map((s) => (
                    <tr
                      key={s.id}
                      className={`hover:bg-[#1E1E26]/50 transition-colors ${
                        s.completed ? 'text-white' : 'text-[#A0A0B2]'
                      }`}
                    >
                      <td className="py-3 font-bold text-[#CCFF00] tabular-nums">#{s.setNumber}</td>
                      <td className="py-3 font-semibold text-white truncate max-w-[150px]">{s.exercise}</td>
                      <td className="py-3 text-right tabular-nums">{s.weightKg} kg</td>
                      <td className="py-3 text-right tabular-nums">{s.reps}</td>
                      <td className="py-3 text-right tabular-nums">@{s.rpe}</td>
                      <td className="py-3 text-right tabular-nums text-[#00F0FF]">
                        {s.powerWatts ? `${s.powerWatts}W` : '—'}
                      </td>
                      <td className="py-3 text-center">
                        <button
                          onClick={() => handleToggleComplete(s.id)}
                          className={`w-6 h-6 rounded flex items-center justify-center mx-auto transition-colors ${
                            s.completed
                              ? 'bg-[#CCFF00] text-[#0D0D11]'
                              : 'bg-[#1E1E26] border border-[#2C2C38] text-transparent hover:border-[#CCFF00]'
                          }`}
                          title={s.completed ? 'Mark pending' : 'Mark completed'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Log New Set Form */}
            <form onSubmit={handleAddSet} className="mt-5 pt-4 border-t border-[#2C2C38] flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[70px]">
                <label className="block text-[10px] font-mono-tech text-[#A0A0B2] uppercase mb-1">Load (KG)</label>
                <input
                  type="number"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(Number(e.target.value))}
                  className="w-full bg-[#1E1E26] border border-[#2C2C38] rounded px-2.5 py-1.5 text-xs text-white font-mono-tech tabular-nums focus:border-[#CCFF00] focus:outline-none"
                  min="0"
                  step="2.5"
                />
              </div>

              <div className="flex-1 min-w-[60px]">
                <label className="block text-[10px] font-mono-tech text-[#A0A0B2] uppercase mb-1">Reps</label>
                <input
                  type="number"
                  value={inputReps}
                  onChange={(e) => setInputReps(Number(e.target.value))}
                  className="w-full bg-[#1E1E26] border border-[#2C2C38] rounded px-2.5 py-1.5 text-xs text-white font-mono-tech tabular-nums focus:border-[#CCFF00] focus:outline-none"
                  min="1"
                  max="100"
                />
              </div>

              <div className="flex-1 min-w-[60px]">
                <label className="block text-[10px] font-mono-tech text-[#A0A0B2] uppercase mb-1">RPE (1-10)</label>
                <input
                  type="number"
                  value={inputRpe}
                  onChange={(e) => setInputRpe(Number(e.target.value))}
                  className="w-full bg-[#1E1E26] border border-[#2C2C38] rounded px-2.5 py-1.5 text-xs text-white font-mono-tech tabular-nums focus:border-[#CCFF00] focus:outline-none"
                  min="1"
                  max="10"
                  step="0.5"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#CCFF00] hover:bg-[#abd600] text-[#0D0D11] text-xs font-mono-tech font-bold uppercase rounded flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Set</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Heart Rate Zone Distribution (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-[#2C2C38] bg-[#15151B] p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C2C38]">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                  Physiological Zones
                </h2>
                <div className="text-xs font-mono-tech text-[#A0A0B2] mt-0.5">
                  Cardiac Output & Lactate Accumulation
                </div>
              </div>
              <span className="text-xs font-mono-tech text-[#CCFF00] font-bold">195 BPM HRMAX</span>
            </div>

            {/* Zone Breakdown List */}
            <div className="mt-4 space-y-3.5">
              {zones.map((zone) => {
                const totalZoneSec = zones.reduce((acc, z) => acc + z.timeInZoneSeconds, 0);
                const percent = Math.round((zone.timeInZoneSeconds / totalZoneSec) * 100);
                const isCurrent = zone.zone === activeZone.zone;

                return (
                  <div
                    key={zone.zone}
                    className={`p-3 rounded-lg border transition-all ${
                      isCurrent
                        ? 'border-[#CCFF00] bg-[#1E1E26]'
                        : 'border-[#2C2C38]/60 bg-[#131317]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="font-bold text-white uppercase">
                          Z{zone.zone} · {zone.name}
                        </span>
                      </div>
                      <div className="text-[#A0A0B2] tabular-nums">
                        {zone.minBpm}–{zone.maxBpm} BPM
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-[#A0A0B2]">{formatTimer(zone.timeInZoneSeconds)}</span>
                      <span className="font-bold text-white tabular-nums">{percent}%</span>
                    </div>

                    <div className="mt-1.5 w-full h-1.5 bg-[#1E1E26] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: zone.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scientific Readout Note */}
            <div className="mt-5 p-3.5 rounded bg-[#1E1E26] border border-[#2C2C38] text-xs font-mono-tech text-[#A0A0B2] space-y-1">
              <div className="text-white font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#CCFF00] rounded-full" />
                METABOLIC ADAPTATION SUMMARY
              </div>
              <p className="font-body text-xs text-[#E4E1E7]/80">
                You have accumulated 19m 20s across anaerobic threshold (Z4/Z5), maximizing peripheral buffering capacity and glycogen turnover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
