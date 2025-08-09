'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/context/translation-context';

/**
 * @fileoverview This is the Projects page for the Sarthi Shiksha NGO website.
 * It showcases current and past projects with descriptions, images, and impact metrics.
 */

const projectsPageContent = {
  title: 'Our Projects',
  subtitle: 'Creating tangible impact through focused initiatives.',
  projects: [
    {
      title: 'Project Vidya',
      category: 'Education',
      status: 'Ongoing',
      image: { src: 'https://placehold.co/600x400.png', hint: 'children studying' },
      description: 'An initiative to provide free education, books, and digital learning tools to children in rural areas. We aim to bridge the educational gap and empower the next generation.',
      progress: 75,
      impact: '2000+ Students Enrolled',
    },
    {
      title: 'Swasthya Abhiyan',
      category: 'Healthcare',
      status: 'Ongoing',
      image: { src: 'https://placehold.co/600x400.png', hint: 'medical camp' },
      description: 'A campaign focused on providing basic healthcare services, organizing medical camps, and spreading awareness about hygiene and preventive care in underserved communities.',
      progress: 60,
      impact: '50+ Medical Camps Held',
    },
    {
      title: 'Green Earth Initiative',
      category: 'Environment',
      status: 'Completed',
      image: { src: 'https://placehold.co/600x400.png', hint: 'tree plantation' },
      description: 'A successful tree plantation drive where we planted over 10,000 saplings across the district to combat deforestation and promote environmental sustainability.',
      progress: 100,
      impact: '10,000+ Trees Planted',
    },
     {
      title: 'Skill Shakti',
      category: 'Empowerment',
      status: 'Ongoing',
      image: { src: 'https://placehold.co/600x400.png', hint: 'women tailoring' },
      description: 'Vocational training programs for women, empowering them with skills like tailoring, handicrafts, and computer literacy to foster financial independence.',
      progress: 45,
      impact: '500+ Women Trained',
    },
  ],
};

/**
 * Renders the Projects page.
 * @returns {JSX.Element} The Projects page component.
 */
export default function ProjectsPage(): JSX.Element {
  const { translatedContent, isLoading, isTranslated } = useTranslation();

  const content = useMemo(() => {
    return isTranslated && translatedContent ? translatedContent : projectsPageContent;
  }, [isTranslated, translatedContent]);
  
  if (isLoading && !isTranslated) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{content.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{content.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {content.projects.map((project, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border-primary/10">
            <div className="relative h-60 w-full">
              <Image
                src={project.image.src}
                alt={project.title}
                data-ai-hint={project.image.hint}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="bg-accent/20 text-accent font-semibold">{project.category}</Badge>
                    <CardTitle className="mt-2 font-headline">{project.title}</CardTitle>
                  </div>
                  <Badge variant={project.status === 'Ongoing' ? 'default' : 'outline'} className={project.status === 'Ongoing' ? 'bg-primary' : 'border-accent text-accent'}>
                    {project.status}
                  </Badge>
              </div>
              <CardDescription className="pt-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="text-sm text-muted-foreground mb-2">Progress</div>
               <Progress value={project.progress} className="h-2" />
               <div className="text-right text-xs font-bold text-primary mt-1">{project.progress}%</div>
            </CardContent>
            <CardFooter>
                <div className="w-full text-center bg-secondary/30 p-2 rounded-md">
                    <p className="text-sm font-semibold text-foreground/80">{project.impact}</p>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
