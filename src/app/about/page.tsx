'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Goal } from 'lucide-react';
import Link from 'next/link';
import { aboutPageContent as content } from '@/lib/content';

type ValueIcon = 'Eye' | 'Heart' | 'Goal';
const icons: { [key in ValueIcon]: React.ElementType } = {
  Eye,
  Heart,
  Goal,
};

export default function AboutPage(): JSX.Element {

  if (!content) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] text-white">
        <Image
          src="https://placehold.co/1600x600.png"
          alt="Community engagement"
          data-ai-hint="community people"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            {content.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story Section */}
        <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div >
                    <h2 className="text-3xl font-headline font-semibold text-primary">{content.ourStory.title}</h2>
                    <p className="mt-4 text-foreground/80 leading-relaxed whitespace-pre-line">{content.ourStory.text}</p>
                </div>
                 <div className="h-80 md:h-full w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Team meeting"
                        data-ai-hint="team meeting"
                        width={600}
                        height={400}
                        className="object-cover h-full w-full"
                    />
                </div>
            </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="mb-20 py-12 bg-secondary/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {content.missionVisionValues.items.map((value, index) => {
              const Icon = icons[value.icon as ValueIcon];
              return (
                <div key={index} className="text-center p-6 bg-background rounded-lg shadow-md">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-headline font-semibold">{value.title}</h3>
                  <p className="mt-2 text-foreground/70 min-h-[120px]">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-headline font-bold text-center mb-4">{content.team.title}</h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">{content.team.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {content.team.members.map((member, index) => (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-0">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint="portrait person" />
                  <AvatarFallback className="text-2xl bg-primary/30 text-primary font-bold">{member.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-headline font-semibold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-foreground/70 mt-2">{member.description}</p>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Our Journey Section */}
        <section className="mb-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">{content.journey.title}</h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">{content.journey.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {content.journey.milestones.map((milestone, index) => (
                    <div key={index} className="text-center p-6 bg-secondary/30 rounded-lg shadow-sm">
                        <p className="text-2xl font-bold text-primary mb-2">{milestone.year}</p>
                        <h3 className="font-headline font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-sm text-foreground/70">{milestone.description}</p>
                    </div>
                ))}
            </div>
        </section>
      </div>

       {/* Call to Action Section */}
      <section className="w-full bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-headline font-bold">{content.cta.title}</h2>
           <p className="mt-4 max-w-3xl mx-auto leading-relaxed">{content.cta.text}</p>
           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90">
             <Link href="/how-to-help">{content.cta.button1}</Link>
           </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
             <Link href="/contact">{content.cta.button2}</Link>
           </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
