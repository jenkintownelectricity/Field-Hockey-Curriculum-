'use client';

import { drills, getCategoryColor, getPedagogyColor, taxonomy } from '@/lib/kernel-data';
import { generatePocketCardsPDF } from '@/lib/pdf-generator';

export default function PocketCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pocket Practice Cards</h1>
          <p className="text-gray-600 mt-1">Print-ready quick reference cards for every drill. Take them to the field!</p>
        </div>
        <button
          onClick={() => generatePocketCardsPDF(drills)}
          className="btn-primary"
        >
          Download All Cards PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drills.map(drill => (
          <div key={drill.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ maxWidth: '320px' }}>
            {/* Card header */}
            <div className="bg-primary-700 text-white px-4 py-3">
              <h3 className="font-bold text-sm">{drill.name}</h3>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{drill.duration}m</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{drill.category}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{drill.pedagogy}</span>
              </div>
            </div>

            <div className="px-4 py-3 space-y-3">
              {/* Quick info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Players</span>
                  <p className="font-medium">{drill.playerCount.min}-{drill.playerCount.max}</p>
                </div>
                <div>
                  <span className="text-gray-400">Ages</span>
                  <p className="font-medium">{drill.ageGroups.map(a => a.toUpperCase()).join(', ')}</p>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Equipment</p>
                <div className="flex flex-wrap gap-1">
                  {drill.equipment.map(eq => (
                    <span key={eq} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {taxonomy.equipment.find(e => e.id === eq)?.label || eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick guide */}
              <div>
                <p className="text-xs font-bold text-gray-700 mb-1">Quick Guide</p>
                {drill.phases.map((phase, i) => (
                  <div key={i} className="text-xs text-gray-600 mb-1">
                    <span className="font-semibold">{phase.name}</span> ({phase.duration}m): {phase.instructions.substring(0, 80)}...
                  </div>
                ))}
              </div>

              {/* Key coaching points */}
              {drill.phases[1]?.coachingPoints && (
                <div className="bg-amber-50 rounded p-2">
                  <p className="text-xs font-bold text-amber-700 mb-1">Key Points</p>
                  {drill.phases[1].coachingPoints.slice(0, 3).map((cp, i) => (
                    <p key={i} className="text-xs text-amber-600">&#8226; {cp}</p>
                  ))}
                </div>
              )}

              {/* Surface icons */}
              <div className="flex gap-1 pt-1 border-t border-gray-100">
                {drill.surface.map(s => (
                  <span key={s} className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                    {taxonomy.surfaces.find(ts => ts.id === s)?.label || s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
