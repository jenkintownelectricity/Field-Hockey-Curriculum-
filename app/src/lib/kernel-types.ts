// FieldHockeyKernel™ TypeScript Types
// All UI renders from these types — no hardcoded drills

export interface AgeGroup {
  id: string;
  label: string;
  minAge: number;
  maxAge: number;
  focus: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
}

export interface Surface {
  id: string;
  label: string;
  notes: string;
}

export interface Equipment {
  id: string;
  label: string;
  required: boolean;
}

export interface PedagogyLevel {
  id: string;
  label: string;
  description: string;
}

export interface EmotionalCue {
  id: string;
  label: string;
  phrase: string;
}

export interface Taxonomy {
  version: string;
  ageGroups: AgeGroup[];
  skillCategories: SkillCategory[];
  surfaces: Surface[];
  equipment: Equipment[];
  pedagogyLevels: PedagogyLevel[];
  emotionalCues: EmotionalCue[];
}

export interface DrillPhase {
  name: string;
  duration: number;
  instructions: string;
  coachingPoints?: string[];
  diagram?: string;
}

export interface YouTubeScript {
  hook: string;
  demo: string;
  keyPoints: string[];
  callToAction: string;
}

export interface Drill {
  id: string;
  name: string;
  category: string;
  ageGroups: string[];
  surface: string[];
  equipment: string[];
  duration: number;
  playerCount: { min: number; max: number };
  pedagogy: string;
  emotionalCues?: string[];
  phases: DrillPhase[];
  objectives?: string[];
  variations?: string[];
  safetyNotes?: string[];
  youtubeScript?: YouTubeScript;
}

export interface SessionWarmupCooldown {
  duration: number;
  activities: string[];
}

export interface Session {
  id: string;
  name: string;
  weekNumber: number;
  sessionNumber: number;
  ageGroup: string;
  theme: string;
  duration: number;
  warmup: SessionWarmupCooldown;
  drills: string[];
  cooldown: SessionWarmupCooldown;
  coachNotes?: string;
  emotionalCues?: string[];
}

export interface ProgramWeek {
  weekNumber: number;
  theme: string;
  sessions: string[];
  homeAssignment?: string;
}

export interface Program {
  id: string;
  name: string;
  ageGroup: string;
  description: string;
  weeks: ProgramWeek[];
  goals?: string[];
  assessmentCriteria?: string[];
}
