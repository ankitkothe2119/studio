'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleContactForm } from '@/server/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

type FormType = 'Donate' | 'Volunteer' | 'Partner';
type FormStep = 'form' | 'payment' | 'confirmation';

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
  const [formStep, setFormStep] = useState<FormStep>('form');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        form.reset();
        setFormStep('form');
        setFormData(null);
        setIsSubmitting(false);
      }, 300);
    }
  }

  async function onSubmit(values: FormData) {
    if (formType === 'Donate') {
      setFormData(values);
      setFormStep('payment');
    } else {
      setIsSubmitting(true);
      const result = await handleContactForm(values);
      if (result.success) {
        toast({ title: 'Submission Successful!', description: 'Thank you for reaching out. We will get back to you soon.' });
        handleOpenChange(false);
      } else {
        toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
      }
      setIsSubmitting(false);
    }
  }

  async function handlePayment() {
    if (!formData) return;
    setIsSubmitting(true);

    // Simulate API call to Razorpay/server
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const result = await handleContactForm(formData);
    
    if (result.success) {
      setFormStep('confirmation');
    } else {
      toast({ title: 'Payment Error', description: 'Something went wrong with the submission. Please try again.', variant: 'destructive' });
      setFormStep('form');
    }
    setIsSubmitting(false);
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
              <FormItem><FormLabel>Donation Amount (₹)</FormLabel><FormControl><Input type="number" placeholder="500" {...field} onChange={e => field.onChange(e.target.value)} /></FormControl><FormMessage /></FormItem>
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
              <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>
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
              <FormItem><FormLabel>Work Phone</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>
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

  const getDialogTitle = () => {
    if (formType === 'Donate') {
        if (formStep === 'payment') return 'Complete Your Donation';
        if (formStep === 'confirmation') return 'Thank You!';
    }
    return formType === 'Partner' ? 'Corporate Partnership' : formType;
  }

  const getDialogDescription = () => {
     if (formType === 'Donate') {
        if (formStep === 'payment') return `You are donating ₹${(formData as any)?.amount}. This is a secure Razorpay checkout simulation.`;
        if (formStep === 'confirmation') return 'Your donation has been processed successfully. Thank you for your generosity!';
    }
    return 'Please fill out the form below. We appreciate your interest and support.';
  }


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>

        {formStep === 'form' && (
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    {renderFormFields()}
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isSubmitting}>
                    {isSubmitting ? 'Submitting...' : formType === 'Donate' ? 'Proceed to Payment' : 'Submit'}
                    </Button>
                </form>
            </Form>
        )}

        {formStep === 'payment' && (
            <div className="py-4 space-y-6">
                <div className="rounded-lg border bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-600">Total Donation Amount</p>
                    <p className="text-4xl font-bold text-slate-900">₹{(formData as any)?.amount}</p>
                </div>
                 <div className="space-y-4">
                     <Button className="w-full h-12 bg-[#528FF0] hover:bg-[#528FF0]/90 text-white font-bold" disabled={isSubmitting} onClick={handlePayment}>
                        <CreditCard className="mr-2 h-5 w-5" /> {isSubmitting ? "Processing..." : `Pay Securely`}
                     </Button>
                     <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Secured by</span>
                        <Zap className="h-4 w-4 fill-orange-400 text-orange-400"/>
                        <span className="font-bold">Razorpay</span>
                     </div>
                </div>
            </div>
        )}

        {formStep === 'confirmation' && (
            <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground">A confirmation has been sent to {(formData as any)?.email}.</p>
                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button type="button" className="w-full">Done</Button>
                    </DialogClose>
                </DialogFooter>
            </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
