'use client';

import Link from 'next/link';
import { drills, getCategoryColor } from '@/lib/kernel-data';
import { FieldDiagram, drillDiagrams } from '@/lib/diagram-generator';

export default function DiagramsPage() {
  const drillsWithDiagrams = drills.filter(d => drillDiagrams[d.id]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Field Diagrams</h1>
      <p className="text-gray-600">SVG field setup diagrams generated from kernel data. Click any drill to see full details.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drillsWithDiagrams.map(drill => (
          <Link key={drill.id} href={`/drills/${drill.id}/`} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold">{drill.name}</h3>
              <span className={`badge ${getCategoryColor(drill.category)}`}>{drill.category}</span>
            </div>
            <FieldDiagram config={drillDiagrams[drill.id]} />
            <p className="text-xs text-gray-400 mt-3 text-center">
              {drill.phases[0]?.instructions?.substring(0, 80)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
