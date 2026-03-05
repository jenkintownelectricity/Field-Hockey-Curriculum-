'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getDrill, getCategoryColor, getPedagogyColor, taxonomy } from '@/lib/kernel-data';
import { FieldDiagram, drillDiagrams } from '@/lib/diagram-generator';

export default function DrillDetail() {
  const params = useParams();
  const drill = getDrill(params.id as string);

  if (!drill) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400">Drill not found</h1>
        <Link href="/drills/" className="btn-primary inline-block mt-4">Back to Drills</Link>
      </div>
    );
  }

  const diagram = drillDiagrams[drill.id];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/drills/" className="text-sm text-primary-600 hover:text-primary-700">&larr; Back to Drills</Link>

      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{drill.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`badge ${getCategoryColor(drill.category)}`}>{drill.category}</span>
          <span className={`badge ${getPedagogyColor(drill.pedagogy)}`}>{drill.pedagogy}</span>
          <span className="badge bg-gray-100 text-gray-700">{drill.duration} min</span>
          <span className="badge bg-gray-100 text-gray-700">{drill.playerCount.min}-{drill.playerCount.max} players</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Age Groups</p>
            <p>{drill.ageGroups.map(a => a.toUpperCase()).join(', ')}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Surfaces</p>
            <p>{drill.surface.map(s => taxonomy.surfaces.find(ts => ts.id === s)?.label || s).join(', ')}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Equipment</p>
            <p>{drill.equipment.map(e => taxonomy.equipment.find(te => te.id === e)?.label || e).join(', ')}</p>
          </div>
        </div>
      </div>

      {diagram && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Field Setup</h2>
          <FieldDiagram config={diagram} />
        </div>
      )}

      {drill.objectives && drill.objectives.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Objectives</h2>
          <ul className="space-y-2">
            {drill.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">&#10003;</span>
                <span className="text-gray-700">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2 className="text-lg font-bold mb-4">Drill Phases</h2>
        <div className="space-y-6">
          {drill.phases.map((phase, i) => (
            <div key={i} className="border-l-4 border-primary-400 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded">Phase {i + 1}</span>
                <h3 className="font-semibold">{phase.name}</h3>
                <span className="text-sm text-gray-500">{phase.duration} min</span>
              </div>
              <p className="text-gray-700 mb-2">{phase.instructions}</p>
              {phase.coachingPoints && phase.coachingPoints.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                  <p className="text-xs font-bold text-amber-800 mb-1">Coaching Points:</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {phase.coachingPoints.map((cp, j) => (
                      <li key={j}>&#8226; {cp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {drill.variations && drill.variations.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Variations</h2>
          <ul className="space-y-1">
            {drill.variations.map((v, i) => (
              <li key={i} className="text-gray-700 text-sm">&#8226; {v}</li>
            ))}
          </ul>
        </div>
      )}

      {drill.safetyNotes && drill.safetyNotes.length > 0 && (
        <div className="card border-red-200 bg-red-50">
          <h2 className="text-lg font-bold text-red-800 mb-3">Safety Notes</h2>
          <ul className="space-y-1">
            {drill.safetyNotes.map((n, i) => (
              <li key={i} className="text-red-700 text-sm">&#9888; {n}</li>
            ))}
          </ul>
        </div>
      )}

      {drill.youtubeScript && (
        <div className="card border-red-200">
          <h2 className="text-lg font-bold mb-3">YouTube Script</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-red-600">Hook:</p>
              <p className="text-gray-700 italic">&ldquo;{drill.youtubeScript.hook}&rdquo;</p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">Demo:</p>
              <p className="text-gray-700">{drill.youtubeScript.demo}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-600">Key Points:</p>
              <ul className="text-gray-700">
                {drill.youtubeScript.keyPoints.map((kp, i) => (
                  <li key={i}>&#8226; {kp}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary-600">Call to Action:</p>
              <p className="text-gray-700 italic">&ldquo;{drill.youtubeScript.callToAction}&rdquo;</p>
            </div>
          </div>
        </div>
      )}

      {drill.emotionalCues && drill.emotionalCues.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-3">Emotional Coaching Cues</h2>
          <div className="flex flex-wrap gap-2">
            {drill.emotionalCues.map(cueId => {
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
