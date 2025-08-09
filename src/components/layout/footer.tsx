/**
 * @fileoverview This file defines the Footer component for the website layout.
 * It provides copyright information and branding at the bottom of each page.
 */
import Link from 'next/link';

/**
 * The Footer component for the application.
 * @returns {JSX.Element} The rendered footer component.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="bg-secondary/50 border-t border-secondary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 px-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sarthi Shiksha Roshan Seva Samiti. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
