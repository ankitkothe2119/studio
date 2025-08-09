'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/context/translation-context';
import { Handshake, Target, Users } from 'lucide-react';

/**
 * @fileoverview This is the About Us page for the Sarthi Shiksha NGO website.
 * It provides detailed information about the organization's history, team, and values.
 */

const aboutPageContent = {
  title: 'About Sarthi Shiksha',
  subtitle: 'Our Journey, Our Team, Our Commitment',
  history: {
    title: 'Our History',
    text: 'Founded with a vision to bring about sustainable change, Sarthi Shiksha Roshan Seva Samiti started its journey in a small community with a handful of volunteers. Over the years, our dedication to education and social welfare has allowed us to grow, expanding our reach and impact. We believe in the power of community and collective action to create a brighter, more equitable future for everyone.',
  },
  values: {
    title: 'Our Core Values',
    items: [
      {
        icon: 'Handshake',
        title: 'Compassion',
        description: 'We approach our work with empathy, kindness, and a deep respect for all individuals.',
      },
      {
        icon: 'Target',
        title: 'Integrity',
        description: 'We are committed to transparency and accountability in all our actions and operations.',
      },
      {
        icon: 'Users',
        title: 'Collaboration',
        description: 'We believe in the power of partnership and work together with communities to achieve shared goals.',
      },
    ],
  },
  team: {
    title: 'Meet Our Team',
    members: [
      { name: 'Priya Sharma', role: 'Founder & Director', avatar: 'PS' },
      { name: 'Rohan Gupta', role: 'Project Manager', avatar: 'RG' },
      { name: 'Anjali Verma', role: 'Community Outreach Coordinator', avatar: 'AV' },
      { name: 'Vikram Singh', role: 'Education Lead', avatar: 'VS' },
    ],
  },
};

type ValueIcon = 'Handshake' | 'Target' | 'Users';
const icons: { [key in ValueIcon]: React.ElementType } = {
  Handshake,
  Target,
  Users,
};

/**
 * Renders the About Us page.
 * @returns {JSX.Element} The About Us page component.
 */
export default function AboutPage(): JSX.Element {
  const { pageContent, setPageContent, isTranslated, isLoading, resetTranslation } = useTranslation();

  const content = useMemo(() => {
    return isTranslated && pageContent ? pageContent : aboutPageContent;
  }, [isTranslated, pageContent]);
  
  useEffect(() => {
    if (!isTranslated) {
      setPageContent(aboutPageContent);
    }
  }, [isTranslated, setPageContent, resetTranslation]);

  if (isLoading && !isTranslated) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{content.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{content.subtitle}</p>
      </header>
      
      {/* History Section */}
      <section className="mb-20">
         <Card className="shadow-lg border-primary/10 overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-headline font-semibold text-primary">{content.history.title}</h2>
                    <p className="mt-4 text-foreground/80 leading-relaxed">{content.history.text}</p>
                </div>
                 <div className="h-64 md:h-full w-full">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Group of volunteers"
                        data-ai-hint="volunteers working"
                        width={600}
                        height={400}
                        className="object-cover h-full w-full"
                    />
                </div>
            </div>
        </Card>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">{content.values.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.values.items.map((value, index) => {
            const Icon = icons[value.icon as ValueIcon];
            return (
              <div key={index} className="text-center p-6 bg-secondary/30 rounded-lg">
                <div className="mx-auto bg-accent/20 p-4 rounded-full w-fit mb-4">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-headline font-semibold">{value.title}</h3>
                <p className="mt-2 text-foreground/70">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-12">{content.team.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {content.team.members.map((member, index) => (
            <Card key={index} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint="portrait person" />
                <AvatarFallback className="text-2xl bg-primary/30 text-primary font-bold">{member.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-headline font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
