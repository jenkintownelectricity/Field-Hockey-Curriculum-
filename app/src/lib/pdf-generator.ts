// PDF Generator — creates coaching workbooks, session plans, pocket cards
// Uses jsPDF for client-side PDF generation

import type { Drill, Session, Program } from './kernel-types';
import { getDrill, taxonomy } from './kernel-data';

// Dynamic import for jsPDF (client-side only)
async function getJsPDF() {
  const { jsPDF } = await import('jspdf');
  return jsPDF;
}

export async function generateSessionPDF(session: Session): Promise<void> {
  const jsPDF = await getJsPDF();
  const doc = new jsPDF();
  const drillObjects = session.drills.map(id => getDrill(id)).filter(Boolean) as Drill[];

  // Header
  doc.setFillColor(22, 163, 74);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text(session.name, 15, 18);
  doc.setFontSize(10);
  doc.text(`Week ${session.weekNumber} | Session ${session.sessionNumber} | ${session.theme}`, 15, 26);

  // Session info
  doc.setTextColor(0, 0, 0);
  let y = 40;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Session Overview', 15, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Age Group: ${session.ageGroup.toUpperCase()}`, 15, y); y += 6;
  doc.text(`Duration: ${session.duration} minutes`, 15, y); y += 6;
  doc.text(`Theme: ${session.theme}`, 15, y); y += 10;

  // Warm-up
  doc.setFont('helvetica', 'bold');
  doc.text(`Warm-up (${session.warmup.duration} min)`, 15, y); y += 6;
  doc.setFont('helvetica', 'normal');
  session.warmup.activities.forEach(a => {
    doc.text(`  • ${a}`, 15, y); y += 5;
  });
  y += 5;

  // Drills
  drillObjects.forEach(drill => {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${drill.name} (${drill.duration} min)`, 15, y); y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Category: ${drill.category} | Pedagogy: ${drill.pedagogy}`, 15, y); y += 5;

    drill.phases.forEach(phase => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text(`  ${phase.name} (${phase.duration} min)`, 15, y); y += 5;
      doc.setFont('helvetica', 'normal');

      const lines = doc.splitTextToSize(phase.instructions, 170);
      lines.forEach((line: string) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`    ${line}`, 15, y); y += 4.5;
      });

      if (phase.coachingPoints) {
        phase.coachingPoints.forEach(cp => {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.text(`    ✓ ${cp}`, 15, y); y += 4.5;
        });
      }
      y += 2;
    });
    y += 5;
  });

  // Cool-down
  if (y > 250) { doc.addPage(); y = 20; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Cool-down (${session.cooldown.duration} min)`, 15, y); y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  session.cooldown.activities.forEach(a => {
    doc.text(`  • ${a}`, 15, y); y += 5;
  });

  // Coach notes
  if (session.coachNotes) {
    y += 5;
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Coach Notes:', 15, y); y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const noteLines = doc.splitTextToSize(session.coachNotes, 170);
    noteLines.forEach((line: string) => {
      doc.text(`  ${line}`, 15, y); y += 5;
    });
  }

  doc.save(`${session.id}_plan.pdf`);
}

export async function generateProgramPDF(program: Program): Promise<void> {
  const jsPDF = await getJsPDF();
  const doc = new jsPDF();

  // Cover page
  doc.setFillColor(22, 163, 74);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('FieldHockeyKernel', 105, 80, { align: 'center' });
  doc.setFontSize(20);
  doc.text(program.name, 105, 110, { align: 'center' });
  doc.setFontSize(14);
  doc.text(program.description, 30, 140, { maxWidth: 150 });

  if (program.goals) {
    doc.setFontSize(16);
    doc.text('Program Goals', 30, 185);
    doc.setFontSize(11);
    let gy = 195;
    program.goals.forEach(g => {
      doc.text(`• ${g}`, 35, gy); gy += 8;
    });
  }

  // Week pages
  program.weeks.forEach(week => {
    doc.addPage();
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(`Week ${week.weekNumber}: ${week.theme}`, 15, 17);

    doc.setTextColor(0, 0, 0);
    let y = 35;

    doc.setFontSize(10);
    doc.text(`Sessions: ${week.sessions.join(', ')}`, 15, y); y += 10;

    if (week.homeAssignment) {
      doc.setFont('helvetica', 'bold');
      doc.text('Home Assignment:', 15, y); y += 6;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(week.homeAssignment, 170);
      lines.forEach((line: string) => {
        doc.text(line, 15, y); y += 5;
      });
    }
  });

  // Assessment page
  if (program.assessmentCriteria) {
    doc.addPage();
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Assessment Criteria', 15, 17);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    let y = 40;
    program.assessmentCriteria.forEach(c => {
      doc.text(`☐ ${c}`, 15, y); y += 10;
    });
  }

  doc.save(`${program.id}_workbook.pdf`);
}

export async function generatePocketCardsPDF(drillList: Drill[]): Promise<void> {
  const jsPDF = await getJsPDF();
  const doc = new jsPDF({ format: [100, 150] }); // Small card format

  drillList.forEach((drill, idx) => {
    if (idx > 0) doc.addPage([100, 150]);

    // Header
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 100, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(drill.name, 5, 12);

    // Quick info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    let y = 24;
    doc.text(`${drill.duration} min | ${drill.category} | ${drill.pedagogy}`, 5, y); y += 5;
    doc.text(`Players: ${drill.playerCount.min}-${drill.playerCount.max}`, 5, y); y += 5;
    doc.text(`Equipment: ${drill.equipment.join(', ')}`, 5, y); y += 7;

    // Key phases
    doc.setFont('helvetica', 'bold');
    doc.text('Quick Guide:', 5, y); y += 5;
    doc.setFont('helvetica', 'normal');
    drill.phases.forEach(phase => {
      if (y > 135) return;
      const lines = doc.splitTextToSize(`${phase.name}: ${phase.instructions}`, 88);
      lines.slice(0, 2).forEach((line: string) => {
        doc.text(line, 5, y); y += 3.5;
      });
      y += 1;
    });

    // Coaching points
    if (drill.phases[1]?.coachingPoints && y < 130) {
      y += 2;
      doc.setFont('helvetica', 'bold');
      doc.text('Key Points:', 5, y); y += 4;
      doc.setFont('helvetica', 'normal');
      drill.phases[1].coachingPoints.slice(0, 3).forEach(cp => {
        if (y > 145) return;
        doc.text(`• ${cp}`, 5, y); y += 3.5;
      });
    }
  });

  doc.save('pocket_practice_cards.pdf');
}
