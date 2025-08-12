'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleContactForm } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type FormType = 'Donate' | 'Volunteer' | 'Partner';

const volunteerSchema = z.object({
  formType: z.literal('Volunteer'),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  interest: z.string().min(3, { message: 'Please specify your interest.'}),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).optional(),
});

const donateSchema = z.object({
  formType: z.literal('Donate'),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: 'Amount must be a positive number.' })
  ),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).optional(),
});

const partnerSchema = z.object({
  formType: z.literal('Partner'),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  contactPerson: z.string().min(2, { message: 'Contact person must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Please describe your partnership proposal.' }),
});

const formSchemas = {
  Donate: donateSchema,
  Volunteer: volunteerSchema,
  Partner: partnerSchema,
};

type FormData = z.infer<typeof volunteerSchema> | z.infer<typeof donateSchema> | z.infer<typeof partnerSchema>;

interface InquiryFormDialogProps {
  formType: FormType;
  trigger: React.ReactNode;
}

export function InquiryFormDialog({ formType, trigger }: InquiryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const formSchema = formSchemas[formType];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        formType: formType,
        ...(formType === 'Donate' && { name: '', email: '', amount: 0, message: '' }),
        ...(formType === 'Volunteer' && { name: '', email: '', phone: '', interest: '', message: '' }),
        ...(formType === 'Partner' && { companyName: '', contactPerson: '', email: '', phone: '', message: '' }),
    },
  });

  async function onSubmit(values: FormData) {
    const result = await handleContactForm(values);
    if (result.success) {
      toast({ title: 'Submission Successful!', description: 'Thank you for reaching out. We will get back to you soon.' });
      form.reset();
      setIsOpen(false);
    } else {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    }
  }

  const renderFormFields = () => {
    switch (formType) {
      case 'Donate':
        return (
          <>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="amount" render={({ field }) => (
              <FormItem><FormLabel>Donation Amount ($)</FormLabel><FormControl><Input type="number" placeholder="50" {...field} onChange={e => field.onChange(e.target.value)} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem><FormLabel>Message (Optional)</FormLabel><FormControl><Textarea placeholder="A personal message to our team..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </>
        );
      case 'Volunteer':
        return (
           <>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Smith" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="jane.smith@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="interest" render={({ field }) => (
               <FormItem>
                <FormLabel>Area of Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an area you want to contribute to" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="teaching">Teaching & Education</SelectItem>
                    <SelectItem value="events">Event Management</SelectItem>
                    <SelectItem value="healthcare">Healthcare Camps</SelectItem>
                    <SelectItem value="admin">Administrative Support</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Why do you want to volunteer? (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us a bit about your motivation..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </>
        );
      case 'Partner':
        return (
           <>
            <FormField control={form.control} name="companyName" render={({ field }) => (
              <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Global Corp Inc." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="contactPerson" render={({ field }) => (
              <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Alex Chen" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input placeholder="alex.chen@globalcorp.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Work Phone</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Partnership Proposal</FormLabel><FormControl><Textarea placeholder="Describe how your company would like to partner with us..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{formType === 'Partner' ? 'Corporate Partnership' : formType}</DialogTitle>
          <DialogDescription>
            Please fill out the form below. We appreciate your interest and support.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderFormFields()}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
