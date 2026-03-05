'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSession, getSessionDrills, taxonomy, getCategoryColor, getPedagogyColor } from '@/lib/kernel-data';
import { FieldDiagram, drillDiagrams } from '@/lib/diagram-generator';
import { generateSessionPDF } from '@/lib/pdf-generator';

export default function SessionDetail() {
  const params = useParams();
  const session = getSession(params.id as string);

  if (!session) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400">Session not found</h1>
        <Link href="/sessions/" className="btn-primary inline-block mt-4">Back to Sessions</Link>
      </div>
    );
  }

  const sessionDrills = getSessionDrills(session);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/sessions/" className="text-sm text-primary-600 hover:text-primary-700">&larr; Back to Sessions</Link>

      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{session.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="badge bg-primary-100 text-primary-800">Week {session.weekNumber}</span>
              <span className="badge bg-gray-100 text-gray-700">{session.ageGroup.toUpperCase()}</span>
              <span className="badge bg-gray-100 text-gray-700">{session.duration} min</span>
            </div>
          </div>
          <button onClick={() => generateSessionPDF(session)} className="btn-primary">
            Download PDF
          </button>
        </div>
        <p className="text-gray-600 mt-3">{session.theme}</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-4">Session Flow</h2>

        <div className="border-l-4 border-yellow-400 pl-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Warm-up</span>
            <span className="text-sm text-gray-500">{session.warmup.duration} min</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            {session.warmup.activities.map((a, i) => (
              <li key={i}>&#8226; {a}</li>
            ))}
          </ul>
        </div>

        {sessionDrills.map((drill, i) => {
          const diagram = drillDiagrams[drill.id];
          return (
            <div key={drill.id} className="border-l-4 border-primary-400 pl-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded">Drill {i + 1}</span>
                <Link href={`/drills/${drill.id}/`} className="font-semibold text-primary-700 hover:text-primary-800">
                  {drill.name}
                </Link>
                <span className="text-sm text-gray-500">{drill.duration} min</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className={`badge ${getCategoryColor(drill.category)}`}>{drill.category}</span>
                <span className={`badge ${getPedagogyColor(drill.pedagogy)}`}>{drill.pedagogy}</span>
              </div>
              {diagram && (
                <div className="my-3 max-w-sm">
                  <FieldDiagram config={diagram} />
                </div>
              )}
              {drill.objectives && (
                <p className="text-xs text-gray-500">{drill.objectives[0]}</p>
              )}
            </div>
          );
        })}

        <div className="border-l-4 border-blue-400 pl-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Cool-down</span>
            <span className="text-sm text-gray-500">{session.cooldown.duration} min</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            {session.cooldown.activities.map((a, i) => (
              <li key={i}>&#8226; {a}</li>
            ))}
          </ul>
        </div>
      </div>

      {session.coachNotes && (
        <div className="card bg-amber-50 border-amber-200">
          <h2 className="text-lg font-bold text-amber-800 mb-2">Coach Notes</h2>
          <p className="text-amber-700">{session.coachNotes}</p>
        </div>
      )}

      {session.emotionalCues && session.emotionalCues.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Emotional Coaching Cues</h2>
          <div className="flex flex-wrap gap-2">
            {session.emotionalCues.map(cueId => {
              const cue = taxonomy.emotionalCues.find(c => c.id === cueId);
              return cue ? (
                <div key={cueId} className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                  <p className="text-xs font-semibold text-purple-700">{cue.label}</p>
                  <p className="text-xs text-purple-600 italic">&ldquo;{cue.phrase}&rdquo;</p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
