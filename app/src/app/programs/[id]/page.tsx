'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProgram, getSession, getSessionDrills, taxonomy } from '@/lib/kernel-data';
import { generateProgramPDF, generateSessionPDF } from '@/lib/pdf-generator';

export default function ProgramDetailPage() {
  const params = useParams();
  const program = getProgram(params.id as string);

  if (!program) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400">Program not found</h1>
        <Link href="/programs/" className="btn-primary inline-block mt-4">Back to Programs</Link>
      </div>
    );
  }

  const ageGroup = taxonomy.ageGroups.find(a => a.id === program.ageGroup);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/programs/" className="text-sm text-primary-600 hover:text-primary-700">&larr; Back to Programs</Link>

      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{program.name}</h1>
            {ageGroup && <span className="badge bg-primary-100 text-primary-800 mt-2">{ageGroup.label} ({ageGroup.focus})</span>}
          </div>
          <button onClick={() => generateProgramPDF(program)} className="btn-primary">
            Download Workbook PDF
          </button>
        </div>
        <p className="text-gray-600 mt-3">{program.description}</p>
      </div>

      {/* Goals */}
      {program.goals && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Program Goals</h2>
          <ul className="space-y-2">
            {program.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-primary-500">&#10003;</span> {goal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weeks */}
      {program.weeks.map(week => {
        const weekSessions = week.sessions.map(id => getSession(id)).filter(Boolean);
        return (
          <div key={week.weekNumber} className="card">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full">W{week.weekNumber}</span>
              <h2 className="text-lg font-bold">{week.theme}</h2>
            </div>

            <div className="space-y-4">
              {weekSessions.map(session => {
                if (!session) return null;
                const sessionDrills = getSessionDrills(session);
                return (
                  <div key={session.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link href={`/sessions/${session.id}/`} className="font-semibold text-primary-700 hover:text-primary-800">
                          Session {session.sessionNumber}: {session.name}
                        </Link>
                        <p className="text-sm text-gray-500">{session.duration} min | {session.theme}</p>
                      </div>
                      <button
                        onClick={() => generateSessionPDF(session)}
                        className="text-xs bg-white border border-gray-200 hover:bg-gray-50 px-3 py-1 rounded-lg"
                      >
                        PDF
                      </button>
                    </div>

                    {/* Warm-up */}
                    <div className="text-xs text-gray-500 mb-2">
                      <span className="font-medium">Warm-up ({session.warmup.duration}min):</span>{' '}
                      {session.warmup.activities.join('; ')}
                    </div>

                    {/* Drills */}
                    <div className="flex flex-wrap gap-1.5">
                      {sessionDrills.map(d => (
                        <Link key={d.id} href={`/drills/${d.id}/`} className="badge bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {d.name} ({d.duration}m)
                        </Link>
                      ))}
                    </div>

                    {/* Coach notes */}
                    {session.coachNotes && (
                      <p className="text-xs text-amber-700 bg-amber-50 rounded p-2 mt-2">
                        <span className="font-semibold">Coach:</span> {session.coachNotes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Home assignment */}
            {week.homeAssignment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-sm font-semibold text-blue-800">Home Assignment</p>
                <p className="text-sm text-blue-700">{week.homeAssignment}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Assessment */}
      {program.assessmentCriteria && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Assessment Criteria</h2>
          <div className="space-y-2">
            {program.assessmentCriteria.map((criteria, i) => (
              <label key={i} className="flex items-start gap-2 text-gray-700">
                <input type="checkbox" className="mt-1 accent-primary-600" />
                <span>{criteria}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
