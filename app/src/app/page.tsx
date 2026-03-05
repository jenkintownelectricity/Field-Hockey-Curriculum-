import Link from 'next/link';
import { drills, sessions, programs, taxonomy } from '@/lib/kernel-data';

export default function Dashboard() {
  const totalDrills = drills.length;
  const totalSessions = sessions.length;
  const totalPrograms = programs.length;
  const categories = taxonomy.skillCategories;

  const stats = [
    { label: 'Drills', value: totalDrills, href: '/drills/', color: 'bg-emerald-500' },
    { label: 'Sessions', value: totalSessions, href: '/sessions/', color: 'bg-blue-500' },
    { label: 'Programs', value: totalPrograms, href: '/programs/', color: 'bg-purple-500' },
    { label: 'Skill Areas', value: categories.length, href: '/drills/', color: 'bg-amber-500' },
  ];

  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: drills.filter(d => d.category === cat.id).length,
  }));

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">FieldHockeyKernel</h1>
        <p className="text-primary-100 text-lg mb-6">
          Youth field hockey coaching platform. All content generated from kernel data — no hardcoded drills.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/programs/" className="bg-white text-primary-700 font-semibold py-2 px-5 rounded-lg hover:bg-primary-50 transition-colors">
            View Programs
          </Link>
          <Link href="/drills/" className="border-2 border-white text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-700 transition-colors">
            Browse Drills
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} className="card hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3`}>
              {stat.value}
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Drill Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categoryCounts.map(cat => (
            <Link key={cat.id} href={`/drills/?category=${cat.id}`} className="card hover:shadow-md transition-shadow text-center">
              <p className="font-semibold text-gray-800">{cat.label}</p>
              <p className="text-sm text-gray-500 mt-1">{cat.count} drill{cat.count !== 1 ? 's' : ''}</p>
              <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick access - latest program */}
      {programs[0] && (
        <div>
          <h2 className="text-xl font-bold mb-4">Featured Program</h2>
          <div className="card">
            <h3 className="text-lg font-bold text-primary-700">{programs[0].name}</h3>
            <p className="text-gray-600 mt-2">{programs[0].description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {programs[0].weeks.map(w => (
                <span key={w.weekNumber} className="badge bg-primary-100 text-primary-800">
                  W{w.weekNumber}: {w.theme}
                </span>
              ))}
            </div>
            <Link href={`/programs/${programs[0].id}/`} className="btn-primary inline-block mt-4">
              View Full Program
            </Link>
          </div>
        </div>
      )}

      {/* Surfaces */}
      <div>
        <h2 className="text-xl font-bold mb-4">Train Anywhere</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {taxonomy.surfaces.map(surface => {
            const count = drills.filter(d => d.surface.includes(surface.id)).length;
            return (
              <div key={surface.id} className="card text-center">
                <p className="font-semibold">{surface.label}</p>
                <p className="text-sm text-gray-500">{count} drills</p>
                <p className="text-xs text-gray-400 mt-1">{surface.notes}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
