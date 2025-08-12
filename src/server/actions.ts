'use server';

import { z } from 'zod';

/**
 * @fileoverview This file contains server-side actions for the application.
 */

const inquiryFormSchema = z.union([
  z.object({
    formType: z.literal('Donate'),
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    amount: z.number().positive({ message: 'Amount must be a positive number.' }),
    message: z.string().optional(),
  }),
  z.object({
    formType: z.literal('Volunteer'),
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    interest: z.string(),
    message: z.string().optional(),
  }),
  z.object({
    formType: z.literal('Partner'),
    companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
    contactPerson: z.string().min(2, { message: 'Contact person must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    message: z.string(),
  }),
  // This part handles the general contact form
  z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  }).transform(val => ({...val, formType: 'Contact' as const}))
]);


/**
 * Processes form submissions from contact, donation, volunteer, and partnership forms.
 * @param {any} formData The form data, which will be parsed.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function handleContactForm(formData: any) {
  try {
    const parsedData = inquiryFormSchema.parse(formData);
    
    // In a real application, this is where you would handle the data,
    // e.g., save to a database, send an email, etc.
    console.log(`Received ${parsedData.formType} submission:`);
    console.log(parsedData);
    
    return { success: true, message: 'Form submitted successfully!' };

  } catch (error) {
    if (error instanceof z.ZodError) {
        console.error('Validation error:', error.flatten().fieldErrors);
         return { success: false, message: 'Invalid data provided.' };
    }
    console.error('An unexpected error occurred:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
