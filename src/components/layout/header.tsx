
'use client';
/**
 * @fileoverview This file defines the Header component, which serves as the main navigation bar for the website.
 * It is sticky, responsive, and includes the language translation feature.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';


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
          <div className="flex items-center gap-3 text-primary transition-colors">
            <Image src="/logo.png" alt="Sarthi Shiksha Roshan Seva Samiti Logo" width={50} height={50} className="rounded-full"/>
             <div className="text-xl font-headline font-bold tracking-tight text-foreground relative group">
                {/* Full name, visible on medium screens and up, or on hover on small screens */}
                <span className="hidden md:inline group-hover:inline transition-opacity duration-300">Sarthi Shiksha Roshan Seva Samiti</span>
                {/* Short name, visible on small screens, hidden on hover */}
                <span className="inline md:hidden group-hover:hidden transition-opacity duration-300">Sarthi Shiksha</span>
            </div>
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
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-4">
            {renderNavLinks()}
          </div>
        )}
      </div>
    </header>
  );
}
