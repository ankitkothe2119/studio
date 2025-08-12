'use server';

import { z } from 'zod';
import connectToDatabase from '@/server/db/mongodb';
import { Contact, Donor, Partner, TeamMember, Volunteer } from '@/server/db/models';
import { aboutPageContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';

/**
 * @fileoverview This file contains server-side actions for the application,
 * including form handling and database interactions.
 */

// Schema for the general contact form
const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
}).transform(val => ({...val, formType: 'Contact' as const}));


// A discriminated union of all possible form schemas
const inquiryFormSchema = z.union([
  // Donation Form Schema
  z.object({
    formType: z.literal('Donate'),
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    amount: z.number().positive({ message: 'Amount must be a positive number.' }),
    message: z.string().optional(),
  }),
  // Volunteer Form Schema
  z.object({
    formType: z.literal('Volunteer'),
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    interest: z.string(),
    message: z.string().optional(),
  }),
  // Partnership Form Schema
  z.object({
    formType: z.literal('Partner'),
    companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
    contactPerson: z.string().min(2, { message: 'Contact person must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    message: z.string(),
  }),
  // General Contact Form Schema
  contactFormSchema,
]);

/**
 * Processes form submissions, validates them, and saves them to the MongoDB database.
 * @param {any} formData The form data, which will be parsed.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function handleContactForm(formData: any) {
  try {
    // Determine which schema to use based on formType or lack thereof
    const schemaToUse = formData.formType ? inquiryFormSchema : contactFormSchema;
    const parsedData = schemaToUse.parse(formData);
    
    await connectToDatabase();

    // Save data to the appropriate collection based on formType
    switch (parsedData.formType) {
        case 'Donate':
            await Donor.create(parsedData);
            break;
        case 'Volunteer':
            await Volunteer.create(parsedData);
            break;
        case 'Partner':
            await Partner.create(parsedData);
            break;
        case 'Contact':
            await Contact.create(parsedData);
            break;
    }
    
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


/**
 * Seeds the database with initial team member data if it's empty.
 */
async function seedTeamData() {
    await connectToDatabase();
    const count = await TeamMember.countDocuments();
    if (count === 0) {
        console.log('Seeding team members...');
        await TeamMember.insertMany(aboutPageContent.team.members);
    }
}

/**
 * Fetches all team members from the database.
 * @returns {Promise<any[]>} An array of team members.
 */
export async function getTeamMembers() {
    try {
        await seedTeamData(); // Ensure data is seeded if db is empty
        const members = await TeamMember.find().lean();
        // Mongoose returns BSON objects, so we need to convert them to plain objects
        // and ObjectId to string for client-side consumption.
        return JSON.parse(JSON.stringify(members));
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return []; // Return empty array on error
    }
}
