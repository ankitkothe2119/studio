'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/context/translation-context';
import { BookOpen, Heart, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * @fileoverview This is the Home page for the Sarthi Shiksha NGO website.
 * It introduces the organization and its mission to visitors.
 */

// Define the structure and content for the Home page.
const homePageContent = {
  hero: {
    heading: 'Sarthi Shiksha Roshan Seva Samiti',
    subheading: 'Lighting the path to a brighter future through education and service.',
    cta: 'Learn More',
  },
  introduction: {
    title: 'Welcome to Sarthi Shiksha',
    text: 'We are a non-governmental organization committed to creating a positive impact in our community through dedicated efforts in education, healthcare, and social welfare. Our mission is to empower individuals and uplift communities by providing access to essential resources and opportunities.',
  },
  features: [
    {
      icon: 'BookOpen',
      title: 'Education for All',
      description: 'Providing quality education and learning resources to underprivileged children.',
    },
    {
      icon: 'Heart',
      title: 'Community Welfare',
      description: 'Engaging in social welfare activities that support and strengthen our community.',
    },
    {
      icon: 'Users',
      title: 'Volunteer Programs',
      description: 'Join our team of passionate volunteers and make a tangible difference.',
    },
  ],
  ctaSection: {
    title: 'Join Us in Making a Difference',
    text: 'Your support can help us reach more people in need. Discover how you can contribute to our cause.',
    button: 'How to Help',
  },
};

type FeatureIcon = 'BookOpen' | 'Heart' | 'Users';
const icons: { [key in FeatureIcon]: React.ElementType } = {
  BookOpen,
  Heart,
  Users,
};

/**
 * Renders the Home page of the NGO website.
 * It uses a translation context to manage and display content,
 * allowing for dynamic language switching.
 * @returns {JSX.Element} The Home page component.
 */
export default function Home(): JSX.Element {
  const { pageContent, setPageContent, isTranslated, isLoading } = useTranslation();

  // Memoize the content to prevent re-renders unless the source content changes.
  const content = useMemo(() => {
    return isTranslated && pageContent ? pageContent : homePageContent;
  }, [isTranslated, pageContent]);

  // Set the initial content for the translation context when the component mounts.
  useEffect(() => {
    setPageContent(homePageContent);
  }, [setPageContent]);
  
  if (isLoading && !isTranslated) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-primary/10 py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
            {content.hero.heading}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
            {content.hero.subheading}
          </p>
          <Button asChild size="lg" className="mt-8 transition-transform duration-300 hover:scale-105">
            <Link href="/about">{content.hero.cta}</Link>
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-headline font-bold">{content.introduction.title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-foreground/70 leading-relaxed">
          {content.introduction.text}
        </p>
      </section>

      {/* Features Section */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => {
              const Icon = icons[feature.icon as FeatureIcon];
              return (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-primary/20">
                  <CardHeader>
                    <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-accent/10 rounded-lg p-8 md:p-12 text-center">
           <h2 className="text-3xl font-headline font-bold text-accent">{content.ctaSection.title}</h2>
           <p className="mt-4 max-w-3xl mx-auto text-foreground/70 leading-relaxed">{content.ctaSection.text}</p>
           <Button asChild size="lg" variant="outline" className="mt-8 bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
             <Link href="/how-to-help" className="flex items-center gap-2">
                {content.ctaSection.button} <ArrowRight />
            </Link>
           </Button>
        </div>
      </section>
    </div>
  );
}
