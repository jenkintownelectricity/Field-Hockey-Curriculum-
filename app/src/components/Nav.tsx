'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/drills/', label: 'Drills' },
  { href: '/programs/', label: 'Programs' },
  { href: '/sessions/', label: 'Sessions' },
  { href: '/diagrams/', label: 'Diagrams' },
  { href: '/scripts/', label: 'Scripts' },
  { href: '/cards/', label: 'Pocket Cards' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl tracking-tight">
            FieldHockeyKernel
          </Link>
          <div className="hidden md:flex space-x-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                    ? 'bg-primary-800 text-white'
                    : 'text-primary-100 hover:bg-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 text-sm ${
                pathname === link.href ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
