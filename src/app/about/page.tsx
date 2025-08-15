
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Goal, Linkedin, Twitter, Mail } from 'lucide-react';
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
      name: 'BABITA KOTHE', 
      role: 'President', 
      avatar: 'BK', 
      image: 'https://res.cloudinary.com/dkkmvurjd/image/upload/v1755245262/WhatsApp_Image_2025-07-26_at_18.17.56_7bc284df_kkito0.jpg',
      description: 'Student and dedicated leader with vision for community empowerment',
      longDescription: 'BABITA KOTHE serves as the President of our organization, bringing fresh perspectives and student leadership to drive our mission forward. As a dedicated student, she combines academic excellence with practical leadership skills to guide our team effectively.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:kothebabita@gmail.com'
      }
    },
    { 
      name: 'ROSHAN PATIL', 
      role: 'Vice President', 
      avatar: 'RP', 
      image: 'https://placehold.co/500x500.png',
      description: 'Businessman with strategic vision and community development expertise',
      longDescription: 'ROSHAN PATIL brings valuable business acumen to our organization as Vice President. His experience as a businessman helps us maintain sustainable operations while expanding our community impact through strategic partnerships and resource management.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:roshpatilo@gmail.com'
      }
    },
    { 
      name: 'SALOMI REDDY', 
      role: 'Secretary', 
      avatar: 'SR', 
      image: 'https://placehold.co/500x500.png',
      description: 'Working professional with excellent organizational and communication skills',
      longDescription: 'SALOMI REDDY serves as our Secretary, leveraging her professional experience to maintain efficient operations and clear communication channels. Her background as a working professional brings valuable organizational expertise to our team.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:Salomir30005@gmail.com'
      }
    },
    { 
      name: 'ANKIT KOTHE', 
      role: 'Treasurer', 
      avatar: 'AK', 
      image: 'https://placehold.co/500x500.png',
      description: 'Student with strong financial management and accountability skills',
      longDescription: 'ANKIT KOTHE manages our financial operations as Treasurer. Despite being a student, he demonstrates exceptional responsibility in managing funds and maintaining transparent financial records for our organization.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:ankiitkothe@gmail.com'
      }
    },
    { 
      name: 'SHREHARSH DUBEY', 
      role: 'Joint Secretary', 
      avatar: 'SD', 
      image: 'https://placehold.co/500x500.png',
      description: 'Student leader with collaborative approach and administrative skills',
      longDescription: 'SHREHARSH DUBEY serves as Joint Secretary, supporting the Secretary in maintaining smooth operations. His student perspective brings fresh ideas while his leadership skills help coordinate team activities effectively.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:shreash7319@gmail.com'
      }
    },
];

const otherTeamMembers =  [
    { 
      name: 'RENUKA PATIL', 
      role: 'Member', 
      avatar: 'RP', 
      image: 'https://placehold.co/500x500.png',
      description: 'Active student member contributing to community initiatives',
      longDescription: 'RENUKA PATIL is an active member of our organization, contributing her time and energy as a student to support various community initiatives and programs.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:nareshpatil481@gmail.com'
      }
    },
    { 
      name: 'YOGESH PATEL', 
      role: 'Member', 
      avatar: 'YP', 
      image: 'https://res.cloudinary.com/dkkmvurjd/image/upload/v1755245263/WhatsApp_Image_2025-07-26_at_18.15.00_d3a38c8e_jgnkgk.jpg',
      description: 'Dedicated student member passionate about social service',
      longDescription: 'YOGESH PATEL serves as a member of our organization, bringing his passion for social service and commitment as a student to support our community development efforts.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:yogeshpatelamjiri@gmail.com'
      }
    },
    { 
      name: 'NIRMAL KOTHE', 
      role: 'Witness', 
      avatar: 'NK', 
      image: 'https://placehold.co/500x500.png',
      description: 'Student serving as witness and legal advisor for the organization',
      longDescription: 'NIRMAL KOTHE serves as our witness and provides valuable legal guidance to ensure our organization operates within proper frameworks and maintains ethical standards.',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:nirmalkothe9991@gmail.com'
      }
    },
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
          onContextMenu={(e) => e.preventDefault()}
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
                        className="object-contain h-full w-full"
                        onContextMenu={(e) => e.preventDefault()}
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
                    <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 flex flex-col cursor-pointer lg:[&:nth-child(4)]:col-start-2 [&:nth-child(5)]:col-start-auto">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={member.image} alt={member.name} style={{ objectFit: 'contain' }} onContextMenu={(e) => e.preventDefault()} />
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
                            <Link href={member.socials.email} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <Mail className="h-6 w-6 text-foreground/60 hover:text-primary transition-colors"/>
                            </Link>
                        </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <div className="relative w-full h-64 rounded-t-lg overflow-hidden mb-4">
                            <Image src={member.image} alt={member.name} data-ai-hint="portrait professional" layout="fill" objectFit="contain" onContextMenu={(e) => e.preventDefault()} />
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
                      <Link href={member.socials.email} target="_blank" rel="noopener noreferrer">
                          <Mail className="h-8 w-8 text-foreground/60 hover:text-primary transition-colors"/>
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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Card className="pt-6 cursor-pointer">
                                            <CardContent className="flex flex-col items-center justify-center space-y-2">
                                                <Avatar className="w-20 h-20">
                                                    <AvatarImage src={member.image} alt={member.name} style={{ objectFit: 'contain' }} onContextMenu={(e) => e.preventDefault()} />
                                                    <AvatarFallback className="text-xl bg-secondary text-secondary-foreground font-bold">{member.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-center">
                                                    <p className="font-semibold text-md">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                        <DialogHeader>
                                            <div className="relative w-full h-64 rounded-t-lg overflow-hidden mb-4">
                                                <Image src={member.image} alt={member.name} data-ai-hint="portrait professional" layout="fill" objectFit="contain" onContextMenu={(e) => e.preventDefault()} />
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
                                            <Link href={member.socials.email} target="_blank" rel="noopener noreferrer">
                                                <Mail className="h-8 w-8 text-foreground/60 hover:text-primary transition-colors"/>
                                            </Link>
                                        </div>
                                    </DialogContent>
                                </Dialog>
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
