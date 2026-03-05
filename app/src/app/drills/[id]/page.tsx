import { drills } from '@/lib/kernel-data';
import DrillDetail from './DrillDetail';

export function generateStaticParams() {
  return drills.map(d => ({ id: d.id }));
}

export default function DrillDetailPage() {
  return <DrillDetail />;
}
