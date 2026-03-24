'use client';

import { useState } from 'react';
import { AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Blog', href: '/' },
  { label: 'About', href: '/about' },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/azero-dev',
    icon: AiOutlineGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/franrodriguez1/',
    icon: AiOutlineLinkedin,
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                &gt;{item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden h-9 w-9"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-background/60 backdrop-blur-sm',
          'transition-opacity duration-300 ease-out',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          'md:hidden'
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Dropdown Menu */}
      <div
        data-testid="mobile-menu"
        className={cn(
          'fixed top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-xl',
          'transition-all duration-300 ease-out',
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none',
          'md:hidden'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center p-8 gap-8">
          <ul className="flex flex-col items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-xl text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  &gt;{item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-8">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label={social.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
