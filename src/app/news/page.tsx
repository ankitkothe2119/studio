'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/translation-context';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * @fileoverview This is the News page for the Sarthi Shiksha NGO website.
 * It displays updates, announcements, and articles related to the NGO's activities.
 */

export const newsPageContent = {
  title: 'News & Updates',
  subtitle: 'Stay informed about our latest activities, events, and stories.',
  articles: [
    {
      title: 'Successful Completion of Annual Summer Camp',
      date: 'August 15, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'children playing' },
      excerpt: 'Our annual summer camp for underprivileged children concluded successfully, providing a fun and educational experience for over 100 kids. The camp included activities like art, sports, and basic computer literacy.',
      link: '#',
    },
    {
      title: 'New Community Library Inaugurated',
      date: 'July 28, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'library books' },
      excerpt: 'We are thrilled to announce the opening of a new community library in the village of Rampur. The library aims to foster a love for reading among children and adults alike.',
      link: '#',
    },
    {
      title: 'Healthcare Awareness Drive Reaches 5000+ People',
      date: 'July 05, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'doctor patient' },
      excerpt: 'Our recent healthcare awareness drive, part of the Swasthya Abhiyan project, successfully reached over 5000 individuals, providing them with essential health information and check-ups.',
      link: '#',
    },
    {
      title: 'Volunteer Appreciation Day',
      date: 'June 20, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'group people' },
      excerpt: 'We celebrated our incredible team of volunteers whose dedication and hard work are the backbone of our organization. Thank you for your selfless service!',
      link: '#',
    },
  ],
};

/**
 * Renders the News page.
 * @returns {JSX.Element} The News page component.
 */
export default function NewsPage(): JSX.Element {
  const { pageContent: content, isLoading, isTranslated } = useTranslation();

  if (!content) {
    return <div className="flex justify-center items-center h-screen"><p>Loading page content...</p></div>;
  }
  
  if (isLoading && !isTranslated) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{content.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{content.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.articles.map((article, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border-primary/10">
            <div className="relative h-52 w-full">
              <Image
                src={article.image.src}
                alt={article.title}
                data-ai-hint={article.image.hint}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-lg leading-tight h-14">{article.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground pt-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{article.date}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{article.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="text-primary hover:text-accent p-0">
                <Link href={article.link} className="flex items-center gap-2">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
