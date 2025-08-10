'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/context/translation-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projectsPageContent } from '@/lib/content';


export default function ProjectsPage(): JSX.Element {
  const { pageContent: content, isLoading, isTranslated } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filteredProjects = useMemo(() => {
    if (!content) return [];
    if (activeFilter === 'All Projects') {
      return content.projects;
    }
    return content.projects.filter(p => p.category === activeFilter);
  }, [activeFilter, content]);
  
  if (isLoading || !content) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="bg-background">
      <section className="relative w-full h-[50vh] text-white">
        <Image
          src="https://placehold.co/1600x500.png"
          alt="Projects hero image"
          data-ai-hint="projects collage"
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
        <div className="flex justify-center flex-wrap gap-2 mb-12">
            {content.filters.map(filter => (
                <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                        "rounded-full transition-colors duration-300",
                        activeFilter === filter ? 'bg-primary text-primary-foreground' : 'text-foreground/70 border-foreground/20'
                    )}
                >
                    {filter}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-0 rounded-lg">
              <div className="relative h-60 w-full">
                <Image
                  src={project.image.src}
                  alt={project.title}
                  data-ai-hint={project.image.hint}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                 <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">{project.category}</Badge>
                    <span>{project.location}</span>
                 </div>
                <h3 className="text-xl font-headline font-semibold mb-2">{project.title}</h3>
                <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                    <p className="text-sm font-medium text-foreground">{project.impact}</p>
                    <Button asChild variant="link" className="text-primary p-0">
                        <Link href="#">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="w-full bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold text-foreground mb-4">{content.projectImpact.title}</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">{content.projectImpact.subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.projectImpact.stats.map((stat, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-headline font-bold">{content.cta.title}</h2>
           <p className="mt-4 max-w-3xl mx-auto leading-relaxed">{content.cta.subtitle}</p>
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
