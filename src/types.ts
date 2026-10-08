export type ScreenTab = 'telemetry' | 'facilities' | 'fuel' | 'passport';

export interface HeartRateZone {
  zone: number;
  name: string;
  minBpm: number;
  maxBpm: number;
  color: string;
  timeInZoneSeconds: number;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  exercise: string;
  weightKg: number;
  reps: number;
  rpe: number;
  completed: boolean;
  powerWatts?: number;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  sector: string;
  type: 'hypoxic' | 'biomechanics' | 'recovery' | 'strength' | 'speed';
  image: string;
  capacityMax: number;
  capacityOccupied: number;
  temperature: string;
  specialty: string;
  priceCredits: number;
  availableSlots: string[];
  specs: { label: string; value: string }[];
}

export interface FuelFormula {
  id: string;
  name: string;
  subtitle: string;
  category: 'pre' | 'intra' | 'recovery' | 'nootropic';
  proteinGrams: number;
  carbsGrams: number;
  electrolytesMg: number;
  caffeineMg: number;
  caloricValue: number;
  color: string;
  flavor: string;
  description: string;
  ingredients: string[];
}

export interface AthleteProfile {
  name: string;
  callsign: string;
  athleteId: string;
  tier: string;
  hubBase: string;
  vo2Max: number;
  restingHr: number;
  hrvBaseline: number;
  readinessScore: number;
  weeklyStrain: number;
  monthlyCredits: number;
  biometricRadar: {
    cnsReadiness: number;
    hrvBalance: number;
    sleepArchitecture: number;
    muscleRecovery: number;
    metabolicRefuel: number;
  };
}
