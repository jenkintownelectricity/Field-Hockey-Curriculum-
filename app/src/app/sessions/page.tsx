'use client';

import Link from 'next/link';
import { sessions, getSessionDrills, getCategoryColor } from '@/lib/kernel-data';
import { generateSessionPDF } from '@/lib/pdf-generator';

export default function SessionsPage() {
  const weeks = Array.from(new Set(sessions.map(s => s.weekNumber))).sort();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sessions</h1>

      {weeks.map(weekNum => {
        const weekSessions = sessions.filter(s => s.weekNumber === weekNum);
        return (
          <div key={weekNum}>
            <h2 className="text-lg font-bold text-gray-700 mb-3">Week {weekNum}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weekSessions.map(session => {
                const sessionDrills = getSessionDrills(session);
                return (
                  <div key={session.id} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link href={`/sessions/${session.id}/`} className="font-bold text-primary-700 hover:text-primary-800">
                          {session.name}
                        </Link>
                        <p className="text-sm text-gray-500">{session.ageGroup.toUpperCase()} | {session.duration} min</p>
                      </div>
                      <button
                        onClick={() => generateSessionPDF(session)}
                        className="text-xs bg-primary-50 text-primary-700 hover:bg-primary-100 px-3 py-1 rounded-lg font-medium"
                      >
                        PDF
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{session.theme}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {sessionDrills.map(d => (
                        <Link key={d.id} href={`/drills/${d.id}/`} className={`badge ${getCategoryColor(d.category)} hover:opacity-80`}>
                          {d.name}
                        </Link>
                      ))}
                    </div>

                    {session.coachNotes && (
                      <p className="text-xs text-gray-400 mt-3 italic">{session.coachNotes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
