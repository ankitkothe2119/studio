'use server';

import { z } from 'zod';

/**
 * @fileoverview This file contains server-side actions for the application.
 */

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const inquiryFormSchema = z.union([
  z.object({
    formType: z.literal('Donate'),
    name: z.string(),
    email: z.string().email(),
    amount: z.number(),
    message: z.string().optional(),
  }),
  z.object({
    formType: z.literal('Volunteer'),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    interest: z.string(),
    message: z.string().optional(),
  }),
  z.object({
    formType: z.literal('Partner'),
    companyName: z.string(),
    contactPerson: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string(),
  }),
  // This part is for the original contact form
  z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
    formType: z.undefined()
  }).transform(val => ({...val, formType: 'Contact'}))
]);


/**
 * Processes the contact form submission.
 * In a real application, this would send an email or save to a database.
 * @param {any} formData The validated form data.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function handleContactForm(formData: any) {
  try {
    const parsedData = inquiryFormSchema.parse(formData);
    
    // TODO: Implement actual form submission logic (e.g., send an email, save to a database).
    console.log(`Received ${parsedData.formType} submission:`);
    console.log(parsedData);
    
    // Simulate a successful submission
    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
        console.error('Zod validation error:', error.errors);
         return { success: false, message: 'Invalid form data.' };
    }
    console.error('Error handling contact form:', error);
    return { success: false, message: 'Failed to submit form.' };
  }
}
