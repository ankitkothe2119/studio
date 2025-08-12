
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { newsPageContent as content } from '@/lib/content';

/**
 * @fileoverview This is the News page for the Sarthi Shiksha NGO website.
 * It displays updates, announcements, and articles related to the NGO's activities.
 */

/**
 * Renders the News page.
 * @returns {JSX.Element} The News page component.
 */
export default function NewsPage(): JSX.Element {
  
  if (!content) {
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
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col border-primary/10">
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
