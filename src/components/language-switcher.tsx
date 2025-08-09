'use client';
/**
 * @fileoverview This component provides the UI for translating the website's content.
 * It uses the TranslationContext to trigger translations and displays the current state.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/context/translation-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// A simple way to get the current page's content.
// In a real app, this might come from a CMS or a more robust state management.
const getPageContent = (pathname: string) => {
  try {
    if (pathname === '/') return require('@/app/page.tsx');
    return require(`@/app${pathname}/page.tsx`);
  } catch (e) {
    return null;
  }
};

const supportedLanguages = [
  { code: 'Hindi', name: 'Hindi' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Mandarin Chinese', name: 'Chinese' },
  { code: 'Arabic', name: 'Arabic' },
];

/**
 * A UI component that allows users to select a language and translate the page.
 * @returns {JSX.Element} The rendered language switcher component.
 */
export function LanguageSwitcher(): JSX.Element {
  const { translate, isLoading, isTranslated, resetTranslation } = useTranslation();
  const [targetLanguage, setTargetLanguage] = useState(supportedLanguages[0].code);
  const pathname = usePathname();

  const handleTranslate = () => {
    let content;
    // This is a simplified way to get content based on the path.
    // It's not robust because it re-imports the module.
    if (pathname === '/') {
        content = {
            hero: { heading: 'Sarthi Shiksha Roshan Seva Samiti', subheading: 'Lighting the path to a brighter future through education and service.', cta: 'Learn More' },
            introduction: { title: 'Welcome to Sarthi Shiksha', text: 'We are a non-governmental organization committed to creating a positive impact in our community through dedicated efforts in education, healthcare, and social welfare. Our mission is to empower individuals and uplift communities by providing access to essential resources and opportunities.' },
            features: [ { icon: 'BookOpen', title: 'Education for All', description: 'Providing quality education and learning resources to underprivileged children.' }, { icon: 'Heart', title: 'Community Welfare', description: 'Engaging in social welfare activities that support and strengthen our community.' }, { icon: 'Users', title: 'Volunteer Programs', description: 'Join our team of passionate volunteers and make a tangible difference.' } ],
            ctaSection: { title: 'Join Us in Making a Difference', text: 'Your support can help us reach more people in need. Discover how you can contribute to our cause.', button: 'How to Help' }
        };
    } else if (pathname === '/about') {
        content = {
            title: 'About Sarthi Shiksha', subtitle: 'Our Journey, Our Team, Our Commitment',
            history: { title: 'Our History', text: 'Founded with a vision to bring about sustainable change, Sarthi Shiksha Roshan Seva Samiti started its journey in a small community with a handful of volunteers. Over the years, our dedication to education and social welfare has allowed us to grow, expanding our reach and impact. We believe in the power of community and collective action to create a brighter, more equitable future for everyone.' },
            values: { title: 'Our Core Values', items: [ { icon: 'Handshake', title: 'Compassion', description: 'We approach our work with empathy, kindness, and a deep respect for all individuals.' }, { icon: 'Target', title: 'Integrity', description: 'We are committed to transparency and accountability in all our actions and operations.' }, { icon: 'Users', title: 'Collaboration', description: 'We believe in the power of partnership and work together with communities to achieve shared goals.' } ] },
            team: { title: 'Meet Our Team', members: [ { name: 'Priya Sharma', role: 'Founder & Director', avatar: 'PS' }, { name: 'Rohan Gupta', role: 'Project Manager', avatar: 'RG' }, { name: 'Anjali Verma', role: 'Community Outreach Coordinator', avatar: 'AV' }, { name: 'Vikram Singh', role: 'Education Lead', avatar: 'VS' } ] }
        };
    } else if (pathname === '/contact') {
        content = {
            title: 'Contact Us', subtitle: 'We would love to hear from you. Get in touch with us for any queries or support.',
            contactInfo: { address: '123 Seva Marg, Community Nagar, New Delhi, India 110001', phone: '+91 12345 67890', email: 'info@sarthishiksha.org' },
            form: { nameLabel: 'Your Name', namePlaceholder: 'Enter your full name', emailLabel: 'Your Email', emailPlaceholder: 'Enter your email address', messageLabel: 'Your Message', messagePlaceholder: 'Type your message here...', submitButton: 'Send Message', successTitle: 'Message Sent!', successDescription: 'Thank you for reaching out. We will get back to you soon.', errorTitle: 'Error', errorDescription: 'Something went wrong. Please try again.' },
            map: { title: 'Our Location' }
        };
    } else if (pathname === '/how-to-help') {
        content = {
            title: 'How You Can Help', subtitle: 'Your support, in any form, makes a world of difference.',
            sections: [ { icon: 'DollarSign', title: 'Donate', description: 'Your financial contribution helps us fund our projects, from providing educational materials to organizing healthcare camps. Every donation, big or small, creates a significant impact.', cta: 'Donate Now', link: '/contact' }, { icon: 'Users', title: 'Volunteer', description: "Join our passionate team of volunteers. Whether you can help with teaching, event management, or administrative tasks, your time and skills are invaluable to us.", cta: 'Become a Volunteer', link: '/contact' }, { icon: 'Heart', title: 'Spread the Word', description: 'Follow us on social media and share our stories. Raising awareness is a powerful way to support our mission and help us reach a wider audience.', cta: 'Follow Us', link: '#' }, { icon: 'Mail', title: 'Corporate Partnership', description: 'We welcome partnerships with corporations that share our vision. Collaborate with us on CSR initiatives to create a lasting social impact.', cta: 'Partner With Us', link: '/contact' } ]
        };
    } else if (pathname === '/news') {
        content = {
            title: 'News & Updates', subtitle: 'Stay informed about our latest activities, events, and stories.',
            articles: [ { title: 'Successful Completion of Annual Summer Camp', date: 'August 15, 2024', image: { src: 'https://placehold.co/600x400.png', hint: 'children playing' }, excerpt: 'Our annual summer camp for underprivileged children concluded successfully, providing a fun and educational experience for over 100 kids. The camp included activities like art, sports, and basic computer literacy.', link: '#' }, { title: 'New Community Library Inaugurated', date: 'July 28, 2024', image: { src: 'https://placehold.co/600x400.png', hint: 'library books' }, excerpt: 'We are thrilled to announce the opening of a new community library in the village of Rampur. The library aims to foster a love for reading among children and adults alike.', link: '#' }, { title: 'Healthcare Awareness Drive Reaches 5000+ People', date: 'July 05, 2024', image: { src: 'https://placehold.co/600x400.png', hint: 'doctor patient' }, excerpt: 'Our recent healthcare awareness drive, part of the Swasthya Abhiyan project, successfully reached over 5000 individuals, providing them with essential health information and check-ups.', link: '#' }, { title: 'Volunteer Appreciation Day', date: 'June 20, 2024', image: { src: 'https://placehold.co/600x400.png', hint: 'group people' }, excerpt: 'We celebrated our incredible team of volunteers whose dedication and hard work are the backbone of our organization. Thank you for your selfless service!', link: '#' } ]
        };
    } else if (pathname === '/projects') {
        content = {
            title: 'Our Projects', subtitle: 'Creating tangible impact through focused initiatives.',
            projects: [ { title: 'Project Vidya', category: 'Education', status: 'Ongoing', image: { src: 'https://placehold.co/600x400.png', hint: 'children studying' }, description: 'An initiative to provide free education, books, and digital learning tools to children in rural areas. We aim to bridge the educational gap and empower the next generation.', progress: 75, impact: '2000+ Students Enrolled' }, { title: 'Swasthya Abhiyan', category: 'Healthcare', status: 'Ongoing', image: { src: 'https://placehold.co/600x400.png', hint: 'medical camp' }, description: 'A campaign focused on providing basic healthcare services, organizing medical camps, and spreading awareness about hygiene and preventive care in underserved communities.', progress: 60, impact: '50+ Medical Camps Held' }, { title: 'Green Earth Initiative', category: 'Environment', status: 'Completed', image: { src: 'https://placehold.co/600x400.png', hint: 'tree plantation' }, description: 'A successful tree plantation drive where we planted over 10,000 saplings across the district to combat deforestation and promote environmental sustainability.', progress: 100, impact: '10,000+ Trees Planted' }, { title: 'Skill Shakti', category: 'Empowerment', status: 'Ongoing', image: { src: 'https://placehold.co/600x400.png', hint: 'women tailoring' }, description: 'Vocational training programs for women, empowering them with skills like tailoring, handicrafts, and computer literacy to foster financial independence.', progress: 45, impact: '500+ Women Trained' } ]
        };
    }

    if (content) {
        translate(content, targetLanguage);
    }
  };

  if (isTranslated) {
    return (
      <Button onClick={resetTranslation} variant="outline" size="sm" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
        Show Original
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage}>
        <SelectTrigger className="w-auto md:w-[120px] h-9 text-sm">
           <Languages className="h-4 w-4 mr-1 hidden md:inline-block"/>
           <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleTranslate}
        disabled={isLoading}
        size="sm"
        variant="default"
        className="transition-all duration-300"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>
    </div>
  );
}
