
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Goal, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { aboutPageContent as content } from '@/lib/content';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


type ValueIcon = 'Eye' | 'Heart' | 'Goal';
const icons: { [key in ValueIcon]: React.ElementType } = {
  Eye,
  Heart,
  Goal,
};

const teamMembers = [
    { 
      name: 'Dr. Aarav Sharma', 
      role: 'Founder & Director', 
      avatar: 'AS', 
      image: 'https://placehold.co/500x500.png',
      description: 'Leads our organization with a vision for empowering communities through education.',
      longDescription: 'Dr. Aarav Sharma has over two decades of experience in the non-profit sector, specializing in educational program development and sustainable community-building. His passion for social change and dedication to grassroots activism have been the driving forces behind our NGO\'s success. He holds a Ph.D. in Social Work from the University of Delhi.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Priya Singh', 
      role: 'Program Director', 
      avatar: 'PS', 
      image: 'https://placehold.co/500x500.png',
      description: 'Manages and oversees all our field projects, ensuring maximum impact and efficiency.',
      longDescription: 'Priya Singh is an expert in project management and community engagement. She is responsible for the end-to-end execution of our initiatives, from planning and resource allocation to monitoring and evaluation. Her work ensures that our projects are not only effective but also culturally sensitive and sustainable.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Rohan Mehta', 
      role: 'Community Outreach Coordinator', 
      avatar: 'RM', 
      image: 'https://placehold.co/500x500.png',
      description: 'Connects with local communities to understand their needs and build lasting relationships.',
      longDescription: 'Rohan Mehta is the bridge between our organization and the communities we serve. He spends most of his time in the field, conducting needs assessments, building trust, and ensuring that our programs are designed with the community\'s input and participation. His empathetic approach is key to our success.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Anika Gupta', 
      role: 'Healthcare Initiatives Head', 
      avatar: 'AG', 
      image: 'https://placehold.co/500x500.png',
      description: 'Leads our health programs, from medical camps to awareness campaigns.',
      longDescription: 'With a background in public health, Anika Gupta designs and implements all our healthcare programs. She works tirelessly to improve access to medical services, promote hygiene, and educate communities on preventive healthcare. Her efforts have significantly reduced the incidence of preventable diseases in our project areas.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Vikram Patel', 
      role: 'Education Lead', 
      avatar: 'VP', 
      image: 'https://placehold.co/500x500.png',
      description: 'Develops and implements our educational curriculum and teacher training programs.',
      longDescription: 'Vikram Patel is a seasoned educator dedicated to making quality education accessible to all. He develops our curriculum, trains our teachers, and establishes learning centers in remote areas. His innovative teaching methods have inspired a love for learning in thousands of children.',
      socials: {
        linkedin: '#',
        twitter: '#'
      }
    },
];

const otherTeamMembers = [
  { name: 'Sameer Khan', role: 'Logistics Manager', avatar: 'SK' },
  { name: 'Neha Desai', role: 'Finance Officer', avatar: 'ND' },
  { name: 'Arjun Reddy', role: 'IT Specialist', avatar: 'AR' },
  { name: 'Kavita Iyer', role: 'Legal Advisor', avatar: 'KI' },
  { name: 'Rajesh Kumar', role: 'Field Officer', avatar: 'RK' },
  { name: 'Sunita Patil', role: 'Admin Assistant', avatar: 'SP' },
  { name: 'Mahesh Babu', role: 'Driver', avatar: 'MB' },
];


export default function AboutPage(): JSX.Element {

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
                 <div className="h-80 md:h-full w-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
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
                <div key={index} className="text-center p-6 bg-background rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
              {teamMembers.map((member, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 flex flex-col cursor-pointer">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint="portrait person" />
                        <AvatarFallback className="text-2xl bg-primary/30 text-primary font-bold">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <h3 className="text-lg font-headline font-semibold">{member.name}</h3>
                          <p className="text-primary font-medium">{member.role}</p>
                          <p className="text-foreground/70 mt-2">{member.description}</p>
                        </div>
                        <div className="mt-4 flex justify-center gap-4">
                            <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <Linkedin className="h-6 w-6 text-foreground/60 hover:text-primary transition-colors"/>
                            </Link>
                             <Link href={member.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <Twitter className="h-6 w-6 text-foreground/60 hover:text-primary transition-colors"/>
                            </Link>
                        </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <div className="relative w-full h-64 rounded-t-lg overflow-hidden mb-4">
                            <Image src={member.image} alt={member.name} data-ai-hint="portrait professional" layout="fill" objectFit="cover" />
                        </div>
                       <DialogTitle className="text-2xl font-bold text-center">{member.name}</DialogTitle>
                       <DialogDescription className="text-center text-primary text-lg">{member.role}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="text-base leading-relaxed text-foreground/80">{member.longDescription}</p>
                    </div>
                    <div className="mt-4 flex justify-center gap-6">
                      <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-8 w-8 text-foreground/60 hover:text-primary transition-colors"/>
                      </Link>
                       <Link href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-8 w-8 text-foreground/60 hover:text-primary transition-colors"/>
                      </Link>
                  </div>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </section>

        {/* Other Team Members Marquee/Carousel */}
        <section className="mb-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">Our Valued Team Members</h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">The dedicated individuals who drive our mission forward every day.</p>
            <Carousel
                plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-6xl mx-auto"
            >
                <CarouselContent>
                    {otherTeamMembers.map((member, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                            <div className="p-1">
                                <Card className="pt-6">
                                    <CardContent className="flex flex-col items-center justify-center space-y-2">
                                        <Avatar className="w-20 h-20">
                                            <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint="portrait person" />
                                            <AvatarFallback className="text-xl bg-secondary text-secondary-foreground font-bold">{member.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center">
                                            <p className="font-semibold text-md">{member.name}</p>
                                            <p className="text-sm text-muted-foreground">{member.role}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex"/>
                <CarouselNext className="hidden sm:flex"/>
            </Carousel>
        </section>
        
        {/* Our Journey Section */}
        <section className="mb-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">{content.journey.title}</h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">{content.journey.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {content.journey.milestones.map((milestone, index) => (
                    <div key={index} className="text-center p-6 bg-secondary/30 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md">
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
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 transition-transform duration-300 hover:scale-105">
             <Link href="/how-to-help">{content.cta.button1}</Link>
           </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105">
             <Link href="/contact">{content.cta.button2}</Link>
           </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
