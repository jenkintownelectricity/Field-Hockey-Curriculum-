'use client';

import Link from 'next/link';
import { programs, taxonomy } from '@/lib/kernel-data';
import { generateProgramPDF } from '@/lib/pdf-generator';

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Programs</h1>

      <div className="space-y-6">
        {programs.map(program => {
          const ageGroup = taxonomy.ageGroups.find(a => a.id === program.ageGroup);
          return (
            <div key={program.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-primary-700">{program.name}</h2>
                  {ageGroup && (
                    <span className="badge bg-primary-100 text-primary-800 mt-1">{ageGroup.label}</span>
                  )}
                </div>
                <button
                  onClick={() => generateProgramPDF(program)}
                  className="btn-primary text-sm"
                >
                  Download PDF
                </button>
              </div>
              <p className="text-gray-600 mb-4">{program.description}</p>

              {/* Week overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {program.weeks.map(week => (
                  <div key={week.weekNumber} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="font-semibold text-sm">Week {week.weekNumber}</p>
                    <p className="text-primary-600 text-sm">{week.theme}</p>
                    <p className="text-xs text-gray-400 mt-1">{week.sessions.length} session{week.sessions.length !== 1 ? 's' : ''}</p>
                  </div>
                ))}
              </div>

              <Link href={`/programs/${program.id}/`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Full Program &rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
