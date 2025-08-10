/**
 * @fileoverview This file defines the Footer component for the website layout.
 * It provides copyright information and branding at the bottom of each page.
 */
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

/**
 * The Footer component for the application.
 * @returns {JSX.Element} The rendered footer component.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image src="/logo.png" alt="Sarthi Shiksha Logo" width={50} height={50} className="rounded-full" />
                    <span className="text-xl font-headline font-bold tracking-tight text-white">
                        Sarthi Shiksha
                    </span>
                </Link>
                <p className="text-sm">The best way to find yourself is to lose yourself in the service of others.</p>
                <div className="flex gap-4 mt-4">
                    <Link href="#" className="hover:text-primary"><Facebook size={20} /></Link>
                    <Link href="#" className="hover:text-primary"><Twitter size={20} /></Link>
                    <Link href="#" className="hover:text-primary"><Instagram size={20} /></Link>
                    <Link href="#" className="hover:text-primary"><Linkedin size={20} /></Link>
                </div>
            </div>
             <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                    <li><Link href="/projects" className="hover:text-primary">Our Programs</Link></li>
                    <li><Link href="/how-to-help" className="hover:text-primary">How to Help</Link></li>
                    <li><Link href="/news" className="hover:text-primary">Latest News</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold text-white mb-4">Get Involved</h4>
                 <ul className="space-y-2">
                    <li><Link href="/contact" className="hover:text-primary">Volunteer</Link></li>
                    <li><Link href="/how-to-help" className="hover:text-primary">Donate</Link></li>
                    <li><Link href="/contact" className="hover:text-primary">Partnership</Link></li>
                    <li><Link href="/contact" className="hover:text-primary">Careers</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold text-white mb-4">Contact Info</h4>
                 <ul className="space-y-2">
                    <li className="flex items-start">123 Seva Marg, New Delhi, 110001</li>
                    <li className="flex items-start">+91 12345 67890</li>
                    <li className="flex items-start">info@sarthishiksha.org</li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
           <p>&copy; {new Date().getFullYear()} Sarthi Shiksha. All Rights Reserved. | <Link href="#" className="hover:text-primary">Privacy Policy</Link> | <Link href="#" className="hover:text-primary">Terms of Use</Link></p>
        </div>
      </div>
    </footer>
  );
}
