'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, DollarSign, Mail } from 'lucide-react';
import { howToHelpPageContent as content } from '@/lib/content';
import { InquiryFormDialog } from '@/components/InquiryFormDialog';

/**
 * @fileoverview This is the 'How to Help' page for the Sarthi Shiksha NGO website.
 * It outlines various ways supporters can contribute to the cause.
 */

type SectionIcon = 'DollarSign' | 'Users' | 'Heart' | 'Mail';
const icons: { [key in SectionIcon]: React.ElementType } = {
  DollarSign,
  Users,
  Heart,
  Mail,
};

/**
 * Renders the 'How to Help' page.
 * @returns {JSX.Element} The 'How to Help' page component.
 */
export default function HowToHelpPage(): JSX.Element {

  if (!content) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  
  const getFormType = (title: string): 'Donate' | 'Volunteer' | 'Partner' | null => {
    if (title === 'Donate') return 'Donate';
    if (title === 'Volunteer') return 'Volunteer';
    if (title === 'Corporate Partnership') return 'Partner';
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{content.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{content.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.sections.map((section, index) => {
          const Icon = icons[section.icon as SectionIcon];
          const formType = getFormType(section.title);

          return (
            <Card key={index} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/10">
              <CardHeader>
                <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{section.title}</CardTitle>
                <CardDescription className="pt-2 min-h-[60px]">{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-center">
                 {formType ? (
                    <InquiryFormDialog
                        formType={formType}
                        trigger={
                            <Button className="w-full md:w-auto transition-transform duration-300 hover:scale-105">
                                {section.cta}
                            </Button>
                        }
                    />
                 ) : (
                    <Button asChild className="w-full md:w-auto transition-transform duration-300 hover:scale-105">
                        <a href={section.link} target="_blank" rel="noopener noreferrer">{section.cta}</a>
                    </Button>
                 )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
