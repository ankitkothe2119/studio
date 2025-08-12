'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleContactForm } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, CheckCircle } from 'lucide-react';

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
      // Reset state when dialog closes
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

  async function handlePayment(paymentMethod: string) {
    if (!formData) return;
    setIsSubmitting(true);

    // Here you would integrate with a real payment gateway
    console.log(`Processing ${paymentMethod} payment for:`, formData);

    const result = await handleContactForm(formData);
    
    if (result.success) {
      setFormStep('confirmation');
    } else {
      toast({ title: 'Error', description: 'Something went wrong with the submission. Please try again.', variant: 'destructive' });
      setFormStep('form'); // Go back to the form
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

  const getDialogTitle = () => {
    if (formType === 'Donate') {
        if (formStep === 'payment') return 'Select Payment Method';
        if (formStep === 'confirmation') return 'Thank You!';
    }
    return formType === 'Partner' ? 'Corporate Partnership' : formType;
  }

  const getDialogDescription = () => {
     if (formType === 'Donate') {
        if (formStep === 'payment') return `You are donating $${(formData as any)?.amount}. Please choose your preferred payment method.`;
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {renderFormFields()}
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : formType === 'Donate' ? 'Proceed to Payment' : 'Submit'}
                    </Button>
                </form>
            </Form>
        )}

        {formStep === 'payment' && (
            <div className="space-y-4">
                 <Button className="w-full justify-start" size="lg" disabled={isSubmitting} onClick={() => handlePayment('Credit Card')}>
                    <CreditCard className="mr-2 h-5 w-5" /> Credit / Debit Card
                 </Button>
                 <Button className="w-full justify-start" size="lg" disabled={isSubmitting} onClick={() => handlePayment('PayPal')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 fill-current"><title>PayPal</title><path d="M7.076 21.337H2.478l.182-1.183c.232-1.531.6-3.044 1.138-4.499.537-1.454 1.228-2.83 2.05-4.086C6.674 9.82 7.558 8.63 8.56 7.527c1.004-1.102 2.103-2.035 3.27-2.76v-.002c.004-.002.01-.002.014-.004l.014-.005.016-.004.017-.004.019-.003.02-.003.022-.003.023-.002.025-.002.027-.002.028-.002.03-.002.03-.001.033-.001.034-.001.036-.001c.02.001.038.002.057.003l.02.001c.003 0 .005.001.008.001l.033.002.025.002.027.002.023.002c.008.001.017.001.025.002l.022.002.02.003.018.003.016.003.014.004.013.004.01.004c.004.001.007.003.01.004v.002c1.222.756 2.362 1.74 3.41 2.926.113.128.225.257.336.386.99 1.149 1.833 2.426 2.494 3.79.66 1.362 1.125 2.81 1.373 4.308l.142.846h-4.63c-.152-.94-.492-1.834-1.01-2.631-.52- P.798-1.22-1.503-2.064-2.074-.845-.57-1.82-.983-2.88-1.21-.033-.007-.066-.013-.1-.02-.05-.013-.102-.023-.153-.034-.11-.023-.222-.043-.335-.06-.05-.008-.1-.015-.15-.022-.08-.012-.16-.022-.24-.032l-.043-.005c-.06-.008-.118-.015-.178-.02-.05-.004-.098-.008-.147-.012l-.03-.002c-.056-.004-.112-.007-.168-.009-.13-.006-.26-.009-.39-.009H7.076v.003Z M16.304 4.113c.473 1.32.724 2.708.724 4.132 0 1.54-.29 3.033-.85 4.433-.562 1.4-1.343 2.686-2.31 3.78-.97 1.092-2.13 1.956-3.415 2.545-1.287.59-2.658.885-4.06.885H2.23l.562-3.488c.227-1.402.634-2.793 1.205-4.12.57-1.326 1.29-2.585 2.14-3.717.848-1.134 1.82-2.14 2.87-2.98.02-.015.038-.03.057-.044.984-.74 2.05-1.323 3.155-1.724a.423.423 0 0 1 .012-.003c.11-.038.22-.075.33-.11l.01-.003c.08-.025.16-.05.24-.074l.014-.004c.1-.028.2-.055.3-.08.016-.004.032-.008.047-.012l.023-.007c.09-.024.18-.046.27-.068l.02-.004c.1-.024.2-.046.3-.067.018-.004.037-.008.055-.012l.01-.002c.11-.024.22-.045.33-.065.03-.005.06-.01.09-.015.09-.017.18-.033.27-.048.03-.005.06-.01.09-.014.12-.02.24-.038.36-.054.026-.003.053-.006.08-.009.08-.01.16-.02.24-.028.02-.002.04-.004.06-.006.12-.01.24-.017.36-.022.013-.001.025-.001.038-.002.1-.003.2-.004.3-.004h.04c.01 0 .02.001.03.001.13 0 .26.002.39.005.11.002.22.006.33.01l.03.001c.09.003.18.007.27.012l.036.002c.1.005.2.01.3.016l.038.003c.09.005.18.01.27.016l.032.002c.1.007.2.015.3.024l.034.003c.09.008.18.017.27.026l.028.003c.09.01.18.02.27.032l.022.003c.1.013.19.027.28.042l.018.003c.04.008.09.016.13.025.02.004.04.008.06.012Z"/></svg> PayPal
                 </Button>
                 <Button className="w-full justify-start" size="lg" disabled={isSubmitting} onClick={() => handlePayment('UPI')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 fill-current"><title>BHIM</title><path d="M12.595 1.341l-2.096.38-2.032.368-2.096.38c-3.136.568-4.192 1.492-4.192 4.31v10.32c0 2.879 1.056 3.742 4.192 4.31l2.096.38 2.032.368 2.096.38c3.199.568 4.255-1.056 4.255-3.99v-2.15l-4.255-2.21v-1.63l4.255-2.21V5.7c0-2.879-1.056-4.72-4.255-4.36zm-2.096 1.148l1.37.258c1.973.368 2.502 1.12 2.502 2.941v1.63L9.6 9.488V7.858c0-1.82 0-2.816 2.899-3.369zm1.37 13.9l1.37.258c1.973.368 2.502.69 2.502 2.503 0 .75-.064 1.12-.446 1.49-.382.368-1.056.492-2.056.129l-1.37-.258v-4.122zm-2.836-1.554l-1.37-.258c-1.001-.184-1.61-.43-1.989-.753-.38-.31-.51-.626-.51-1.306 0-1.819.529-2.571 2.5-2.94l1.37-.259v5.516z"/></svg> UPI / BHIM
                 </Button>
            </div>
        )}

        {formStep === 'confirmation' && (
            <div className="text-center py-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <DialogFooter>
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
