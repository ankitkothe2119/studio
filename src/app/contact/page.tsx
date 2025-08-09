'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useTranslation } from '@/context/translation-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { handleContactForm } from '@/lib/actions';
import { contactPageContent } from '@/lib/content';

/**
 * @fileoverview This is the Contact page for the Sarthi Shiksha NGO website.
 * It provides a contact form, address, and other contact details.
 */

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

/**
 * Renders the Contact page.
 * @returns {JSX.Element} The Contact page component.
 */
export default function ContactPage(): JSX.Element {
  const { pageContent: content, isLoading, isTranslated } = useTranslation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleContactForm(values);
    if (result.success) {
      toast({ title: content.form.successTitle, description: content.form.successDescription });
      form.reset();
    } else {
      toast({ title: content.form.errorTitle, description: content.form.errorDescription, variant: 'destructive' });
    }
  }

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
      
      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.form.nameLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={content.form.namePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.form.emailLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={content.form.emailPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.form.messageLabel}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={content.form.messagePlaceholder} className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : content.form.submitButton}
              </Button>
            </form>
          </Form>
        </div>
        
        {/* Contact Info and Map */}
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p>{content.contactInfo.address}</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <p>{content.contactInfo.phone}</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <p>{content.contactInfo.email}</p>
                </div>
            </div>
          <div>
            <h3 className="text-2xl font-headline font-semibold mb-4">{content.map.title}</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-primary/20">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Map showing NGO location"
                data-ai-hint="map location"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
