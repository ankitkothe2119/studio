'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/context/translation-context';
import { ArrowRight, GraduationCap, HeartPulse, Building } from 'lucide-react';
import Link from 'next/link';

import { homePageContent } from '@/lib/content';

type FocusIcon = 'GraduationCap' | 'HeartPulse' | 'Building';
const icons: { [key in FocusIcon]: React.ElementType } = {
  GraduationCap,
  HeartPulse,
  Building,
};


export default function Home(): JSX.Element {
  const { pageContent: content, isLoading, isTranslated } = useTranslation();
  
  if (!content) {
    return <div className="flex justify-center items-center h-screen"><p>Loading page content...</p></div>;
  }
  
  if (isLoading && !isTranslated) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Community members"
          data-ai-hint="community education"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            {content.hero.heading}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {content.hero.subheading}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-300 hover:scale-105">
              <Link href="/how-to-help">{content.hero.cta1}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-colors duration-300">
              <Link href="/about">{content.hero.cta2}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="w-full bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold text-foreground mb-12">{content.impact.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.impact.stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-headline font-bold text-foreground">{content.mission.title}</h2>
                <p className="mt-4 text-foreground/70 leading-relaxed">{content.mission.text}</p>
                 <Button asChild className="mt-6">
                   <Link href="/about">{content.mission.cta}</Link>
                 </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Community gathering"
                    data-ai-hint="community gathering"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>
         </div>
      </section>

      {/* Focus Areas Section */}
      <section className="w-full bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">{content.focus.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.focus.areas.map((area, index) => {
              const Icon = icons[area.icon as FocusIcon];
              return (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-primary/10 bg-card p-6">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold">{area.title}</h3>
                    <p className="mt-2 text-foreground/70">{area.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold">{content.projects.title}</h2>
            <p className="mt-2 text-foreground/70">{content.projects.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.projects.items.map((project, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image 
                        src={project.image.src} 
                        alt={project.title}
                        data-ai-hint={project.image.hint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48"
                    />
                    <CardContent className="p-6">
                        <h3 className="text-lg font-headline font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
                        <Button asChild variant="link" className="p-0 text-primary">
                            <Link href={project.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-primary py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-headline font-bold">{content.ctaSection.title}</h2>
           <p className="mt-4 max-w-3xl mx-auto leading-relaxed">{content.ctaSection.text}</p>
           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
             <Link href="/how-to-help">{content.ctaSection.button1}</Link>
           </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
             <Link href="/how-to-help">{content.ctaSection.button2}</Link>
           </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
