'use client';
/**
 * @fileoverview This file defines the Header component, which serves as the main navigation bar for the website.
 * It is sticky, responsive, and includes the language translation feature.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, BookHeart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/language-switcher';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/how-to-help', label: 'How to Help' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

/**
 * The Header component for the application.
 * Provides sticky navigation and access to the language switcher.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header(): JSX.Element {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavLinks = (isMobileLayout = false) => (
    <nav
      className={cn(
        'flex items-center gap-4',
        isMobileLayout ? 'flex-col items-start' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="link"
          asChild
          className={cn(
            'text-foreground/80 hover:text-primary transition-colors duration-300 font-semibold',
            pathname === link.href && 'text-primary underline',
             isMobileLayout && 'text-lg'
          )}
          onClick={() => isMobileLayout && setMobileMenuOpen(false)}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" passHref>
          <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <BookHeart className="h-8 w-8" />
            <span className="text-xl font-headline font-bold tracking-tight">
              Sarthi Shiksha
            </span>
          </div>
        </Link>
        
        {isMobile ? (
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 bg-background p-6">
              <SheetHeader className="mb-8 flex flex-row justify-between items-center text-left">
                <SheetTitle className="text-lg font-bold font-headline text-primary">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                   <X className="h-6 w-6" />
                 </Button>
               </SheetHeader>
               {renderNavLinks(true)}
               <div className="mt-8 border-t pt-6">
                 <LanguageSwitcher />
               </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-4">
            {renderNavLinks()}
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </header>
  );
}
