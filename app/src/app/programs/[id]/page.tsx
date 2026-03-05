import { programs } from '@/lib/kernel-data';
import ProgramDetail from './ProgramDetail';

export function generateStaticParams() {
  return programs.map(p => ({ id: p.id }));
}

export default function ProgramDetailPage() {
  return <ProgramDetail />;
}
