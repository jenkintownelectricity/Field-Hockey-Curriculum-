import { sessions } from '@/lib/kernel-data';
import SessionDetail from './SessionDetail';

export function generateStaticParams() {
  return sessions.map(s => ({ id: s.id }));
}

export default function SessionDetailPage() {
  return <SessionDetail />;
}
