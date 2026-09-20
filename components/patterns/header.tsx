'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, Phone, User } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Properties', href: '/properties' },
  { name: 'Projects', href: '/projects' },
  { name: 'Market Intelligence', href: '/market-intelligence' },
  { name: 'Investment Services', href: '/investment-services' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xl font-bold text-white">IE</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Investment Experts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <a
              href="tel:+97143337707"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              <Phone className="h-4 w-4" />
              <span>+971 4 333 7707</span>
            </a>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button>Book Consultation</Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a
                  href="tel:+97143337707"
                  className="flex items-center space-x-2 text-base font-medium text-gray-700"
                >
                  <Phone className="h-5 w-5" />
                  <span>+971 4 333 7707</span>
                </a>
                <Button className="w-full">Book Consultation</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
