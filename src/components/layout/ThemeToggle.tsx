'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initial sync with document
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);

    // Watch for class changes on HTML element (from inline script or ViewTransitions)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className={cn('h-9 w-9', className)} disabled>
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('h-9 w-9 transition-all', className)}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform hover:rotate-90" />
      ) : (
        <Moon className="h-4 w-4 transition-transform hover:rotate-12" />
      )}
    </Button>
  );
}
