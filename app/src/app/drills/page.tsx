'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { drills, taxonomy, getCategoryColor, getPedagogyColor } from '@/lib/kernel-data';

export default function DrillsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [ageFilter, setAgeFilter] = useState('');
  const [surfaceFilter, setSurfaceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return drills.filter(d => {
      if (categoryFilter && d.category !== categoryFilter) return false;
      if (ageFilter && !d.ageGroups.includes(ageFilter)) return false;
      if (surfaceFilter && !d.surface.includes(surfaceFilter)) return false;
      if (searchTerm && !d.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [categoryFilter, ageFilter, surfaceFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Drill Library</h1>
        <span className="text-sm text-gray-500">{filtered.length} drill{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search drills..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {taxonomy.skillCategories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <select
            value={ageFilter}
            onChange={e => setAgeFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Age Groups</option>
            {taxonomy.ageGroups.map(a => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
          <select
            value={surfaceFilter}
            onChange={e => setSurfaceFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Surfaces</option>
            {taxonomy.surfaces.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Drill grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(drill => (
          <Link key={drill.id} href={`/drills/${drill.id}/`} className="card hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{drill.name}</h3>
              <span className="text-sm font-medium text-gray-500">{drill.duration}m</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={`badge ${getCategoryColor(drill.category)}`}>{drill.category}</span>
              <span className={`badge ${getPedagogyColor(drill.pedagogy)}`}>{drill.pedagogy}</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Ages: {drill.ageGroups.map(a => a.toUpperCase()).join(', ')}
            </p>
            <p className="text-xs text-gray-500">
              Players: {drill.playerCount.min}-{drill.playerCount.max} | {drill.surface.join(', ')}
            </p>
            {drill.objectives && (
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">{drill.objectives[0]}</p>
            )}
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No drills match your filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}
