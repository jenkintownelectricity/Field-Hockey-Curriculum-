import { Suspense } from 'react';
import DrillsList from './DrillsList';

export default function DrillsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading drills...</div>}>
      <DrillsList />
    </Suspense>
  );
}
