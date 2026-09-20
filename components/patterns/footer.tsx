import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  properties: [
    { name: 'Apartments for Sale', href: '/properties?type=apartment' },
    { name: 'Villas for Sale', href: '/properties?type=villa' },
    { name: 'Penthouses', href: '/properties?type=penthouse' },
    { name: 'Commercial', href: '/properties?type=commercial' },
    { name: 'Off-Plan Projects', href: '/projects' },
  ],
  areas: [
    { name: 'Downtown Dubai', href: '/areas/downtown-dubai' },
    { name: 'Dubai Marina', href: '/areas/dubai-marina' },
    { name: 'Palm Jumeirah', href: '/areas/palm-jumeirah' },
    { name: 'Business Bay', href: '/areas/business-bay' },
    { name: 'Dubai Hills Estate', href: '/areas/dubai-hills-estate' },
  ],
  services: [
    { name: 'Investment Consultation', href: '/services/investment' },
    { name: 'Property Management', href: '/services/management' },
    { name: 'Mortgage Advisory', href: '/services/mortgage' },
    { name: 'Legal Support', href: '/services/legal' },
    { name: 'After-Sales Service', href: '/services/after-sales' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-xl font-bold text-white">IE</span>
              </div>
              <span className="text-xl font-semibold text-white">Investment Experts</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Your trusted partner for premium real estate investments in Dubai.
            </p>
            <div className="space-y-3">
              <a href="tel:+97143337707" className="flex items-center space-x-3 text-sm hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span>+971 4 333 7707</span>
              </a>
              <a href="mailto:info@investmentexperts.ae" className="flex items-center space-x-3 text-sm hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@investmentexperts.ae</span>
              </a>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Properties</h3>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Areas</h3>
            <ul className="space-y-3">
              {footerLinks.areas.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Investment Experts. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
