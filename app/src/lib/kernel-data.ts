// FieldHockeyKernel™ Data Layer
// Loads all kernel data from seed JSON — UI must never hardcode drills

import type { Taxonomy, Drill, Session, Program } from './kernel-types';
import taxonomyData from '../../../kernel/taxonomy/taxonomy.json';
import drillsData from '../../../seed/curriculum/drills.json';
import sessionsData from '../../../seed/curriculum/sessions.json';
import programsData from '../../../seed/curriculum/programs.json';

export const taxonomy: Taxonomy = taxonomyData as Taxonomy;
export const drills: Drill[] = drillsData as Drill[];
export const sessions: Session[] = sessionsData as Session[];
export const programs: Program[] = programsData as Program[];

// Lookup helpers
export function getDrill(id: string): Drill | undefined {
  return drills.find(d => d.id === id);
}

export function getSession(id: string): Session | undefined {
  return sessions.find(s => s.id === id);
}

export function getProgram(id: string): Program | undefined {
  return programs.find(p => p.id === id);
}

export function getDrillsByCategory(category: string): Drill[] {
  return drills.filter(d => d.category === category);
}

export function getDrillsByAgeGroup(ageGroup: string): Drill[] {
  return drills.filter(d => d.ageGroups.includes(ageGroup));
}

export function getDrillsBySurface(surface: string): Drill[] {
  return drills.filter(d => d.surface.includes(surface));
}

export function getSessionsByWeek(weekNumber: number): Session[] {
  return sessions.filter(s => s.weekNumber === weekNumber);
}

export function getSessionDrills(session: Session): Drill[] {
  return session.drills.map(id => getDrill(id)).filter((d): d is Drill => d !== undefined);
}

export function getTaxonomyLabel(type: keyof Taxonomy, id: string): string {
  const items = taxonomy[type];
  if (Array.isArray(items)) {
    const item = items.find((i: { id: string }) => i.id === id);
    if (item && 'label' in item) return (item as { label: string }).label;
  }
  return id;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    dribbling: 'bg-emerald-100 text-emerald-800',
    passing: 'bg-blue-100 text-blue-800',
    receiving: 'bg-purple-100 text-purple-800',
    shooting: 'bg-red-100 text-red-800',
    tackling: 'bg-amber-100 text-amber-800',
    goalkeeping: 'bg-orange-100 text-orange-800',
    movement: 'bg-cyan-100 text-cyan-800',
    fitness: 'bg-pink-100 text-pink-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
}

export function getPedagogyColor(level: string): string {
  const colors: Record<string, string> = {
    intro: 'bg-green-100 text-green-800',
    develop: 'bg-blue-100 text-blue-800',
    refine: 'bg-purple-100 text-purple-800',
    perform: 'bg-red-100 text-red-800',
  };
  return colors[level] || 'bg-gray-100 text-gray-800';
}
