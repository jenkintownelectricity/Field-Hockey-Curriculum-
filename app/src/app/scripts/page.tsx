'use client';

import Link from 'next/link';
import { drills, getCategoryColor } from '@/lib/kernel-data';

export default function ScriptsPage() {
  const drillsWithScripts = drills.filter(d => d.youtubeScript);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">YouTube Drill Scripts</h1>
      <p className="text-gray-600">Ready-to-use video scripts generated from kernel drill data. Copy and use for your coaching channel.</p>

      <div className="space-y-6">
        {drillsWithScripts.map(drill => {
          const script = drill.youtubeScript!;
          return (
            <div key={drill.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Link href={`/drills/${drill.id}/`} className="text-xl font-bold text-primary-700 hover:text-primary-800">
                    {drill.name}
                  </Link>
                  <div className="flex gap-2 mt-1">
                    <span className={`badge ${getCategoryColor(drill.category)}`}>{drill.category}</span>
                    <span className="badge bg-gray-100 text-gray-700">{drill.duration} min</span>
                  </div>
                </div>
                <span className="text-red-500 font-bold text-2xl">&#9654;</span>
              </div>

              <div className="space-y-4">
                {/* Hook */}
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Hook (0:00 - 0:10)</p>
                  <p className="text-gray-800 font-medium">&ldquo;{script.hook}&rdquo;</p>
                </div>

                {/* Demo */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Demonstration (0:10 - 1:00)</p>
                  <p className="text-gray-800">{script.demo}</p>
                </div>

                {/* Key Points */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">Key Teaching Points</p>
                  <ol className="list-decimal list-inside space-y-1">
                    {script.keyPoints.map((kp, i) => (
                      <li key={i} className="text-gray-800">{kp}</li>
                    ))}
                  </ol>
                </div>

                {/* CTA */}
                <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-1">Call to Action (End)</p>
                  <p className="text-gray-800 font-medium">&ldquo;{script.callToAction}&rdquo;</p>
                </div>
              </div>

              {/* Storyboard summary */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-600 mb-2">Storyboard Outline</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="bg-red-100 rounded p-2 text-xs font-medium text-red-700">Shot 1</div>
                    <p className="text-[10px] text-gray-500 mt-1">Close-up: Coach face</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded p-2 text-xs font-medium text-blue-700">Shot 2</div>
                    <p className="text-[10px] text-gray-500 mt-1">Wide: Full setup</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-amber-100 rounded p-2 text-xs font-medium text-amber-700">Shot 3</div>
                    <p className="text-[10px] text-gray-500 mt-1">Detail: Stick/Ball</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary-100 rounded p-2 text-xs font-medium text-primary-700">Shot 4</div>
                    <p className="text-[10px] text-gray-500 mt-1">Close-up: Coach CTA</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
