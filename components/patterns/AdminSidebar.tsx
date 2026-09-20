'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Building2, FolderKanban, Users, Settings, BarChart3, Menu, X } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { href: '/admin/properties', label: 'Properties', icon: <Building2 className="w-5 h-5" /> },
  { href: '/admin/projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
  { href: '/admin/leads', label: 'Leads', icon: <Users className="w-5 h-5" /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Investment Experts</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-400 group-hover:text-white transition-colors">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
