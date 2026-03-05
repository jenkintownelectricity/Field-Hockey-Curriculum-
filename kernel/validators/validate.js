#!/usr/bin/env node
// FieldHockeyKernel™ Validator
// Validates all kernel data for referential integrity

const taxonomy = require('../taxonomy/taxonomy.json');
const drills = require('../../seed/curriculum/drills.json');
const sessions = require('../../seed/curriculum/sessions.json');
const programs = require('../../seed/curriculum/programs.json');

let errors = 0;
let warnings = 0;

function error(msg) { console.error(`  ERROR: ${msg}`); errors++; }
function warn(msg) { console.warn(`  WARN:  ${msg}`); warnings++; }
function ok(msg) { console.log(`  OK:    ${msg}`); }

const validCategories = taxonomy.skillCategories.map(c => c.id);
const validAgeGroups = taxonomy.ageGroups.map(a => a.id);
const validSurfaces = taxonomy.surfaces.map(s => s.id);
const validEquipment = taxonomy.equipment.map(e => e.id);
const validPedagogy = taxonomy.pedagogyLevels.map(p => p.id);
const validCues = taxonomy.emotionalCues.map(c => c.id);

console.log('\nFieldHockeyKernel Validator\n');

// Validate drills
console.log(`Drills (${drills.length}):`);
const drillIds = new Set();
for (const drill of drills) {
  if (drillIds.has(drill.id)) error(`Duplicate drill ID: ${drill.id}`);
  drillIds.add(drill.id);

  if (!drill.id.startsWith('drill_')) error(`${drill.id}: ID must start with 'drill_'`);
  if (!validCategories.includes(drill.category)) error(`${drill.id}: Invalid category '${drill.category}'`);
  if (!validPedagogy.includes(drill.pedagogy)) error(`${drill.id}: Invalid pedagogy '${drill.pedagogy}'`);

  for (const ag of drill.ageGroups) {
    if (!validAgeGroups.includes(ag)) error(`${drill.id}: Invalid age group '${ag}'`);
  }
  for (const s of drill.surface) {
    if (!validSurfaces.includes(s)) error(`${drill.id}: Invalid surface '${s}'`);
  }
  for (const e of drill.equipment) {
    if (!validEquipment.includes(e)) warn(`${drill.id}: Equipment '${e}' not in taxonomy`);
  }
  if (drill.emotionalCues) {
    for (const c of drill.emotionalCues) {
      if (!validCues.includes(c)) error(`${drill.id}: Invalid emotional cue '${c}'`);
    }
  }
  if (drill.phases.length === 0) error(`${drill.id}: Must have at least 1 phase`);
  if (drill.duration <= 0) error(`${drill.id}: Duration must be positive`);
  if (drill.playerCount.min > drill.playerCount.max) error(`${drill.id}: min players > max players`);
}
ok(`${drills.length} drills validated`);

// Validate sessions
console.log(`\nSessions (${sessions.length}):`);
const sessionIds = new Set();
for (const session of sessions) {
  if (sessionIds.has(session.id)) error(`Duplicate session ID: ${session.id}`);
  sessionIds.add(session.id);

  if (!session.id.startsWith('session_')) error(`${session.id}: ID must start with 'session_'`);
  if (!validAgeGroups.includes(session.ageGroup)) error(`${session.id}: Invalid age group '${session.ageGroup}'`);

  for (const drillId of session.drills) {
    if (!drillIds.has(drillId)) error(`${session.id}: References unknown drill '${drillId}'`);
  }
  if (session.emotionalCues) {
    for (const c of session.emotionalCues) {
      if (!validCues.includes(c)) error(`${session.id}: Invalid emotional cue '${c}'`);
    }
  }
  if (session.duration <= 0) error(`${session.id}: Duration must be positive`);
}
ok(`${sessions.length} sessions validated`);

// Validate programs
console.log(`\nPrograms (${programs.length}):`);
for (const program of programs) {
  if (!program.id.startsWith('program_')) error(`${program.id}: ID must start with 'program_'`);
  if (!validAgeGroups.includes(program.ageGroup)) error(`${program.id}: Invalid age group '${program.ageGroup}'`);

  for (const week of program.weeks) {
    for (const sessionId of week.sessions) {
      if (!sessionIds.has(sessionId)) error(`${program.id} W${week.weekNumber}: References unknown session '${sessionId}'`);
    }
  }
}
ok(`${programs.length} programs validated`);

// Summary
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${errors} errors, ${warnings} warnings`);
if (errors === 0) {
  console.log('All kernel data is valid!\n');
  process.exit(0);
} else {
  console.log('Kernel data has errors. Fix them before building.\n');
  process.exit(1);
}
