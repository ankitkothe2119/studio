
'use server';

import { z } from 'zod';
import connectToDatabase from '@/server/db/mongodb';
import { Contact, Donor, Partner, TeamMember, Volunteer, Admin } from '@/server/db/models';
import { aboutPageContent } from '@/lib/content';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

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
 * Fetches all team members from the database, categorized into founders and other members.
 * @returns {Promise<{founders: any[], teamMembers: any[], allMembers: any[]}>} An object containing arrays of founders and team members.
 */
export async function getTeamMembers() {
    try {
        await seedTeamData(); // Ensure data is seeded if db is empty
        const members = await TeamMember.find().lean();
        const plainMembers = JSON.parse(JSON.stringify(members));

        const founders = plainMembers.filter((m: any) => m.category === 'Founder');
        const teamMembers = plainMembers.filter((m: any) => m.category === 'Team Member');

        return { founders, teamMembers, allMembers: plainMembers };
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return { founders: [], teamMembers: [], allMembers: [] }; // Return empty arrays on error
    }
}

const memberSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  avatar: z.string().min(2).max(2),
  description: z.string().min(10),
  category: z.enum(['Founder', 'Team Member']),
});

/**
 * Adds a new team member to the database.
 * @param {any} data The team member data.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function addTeamMember(data: unknown) {
    try {
        const parsedData = memberSchema.parse(data);
        await connectToDatabase();
        await TeamMember.create(parsedData);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true, message: 'Team member added successfully.' };
    } catch (error) {
        console.error('Failed to add team member:', error);
        return { success: false, message: 'Failed to add team member.' };
    }
}

/**
 * Updates an existing team member in the database.
 * @param {string} id The ID of the member to update.
 * @param {any} data The new data for the team member.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function updateTeamMember(id: string, data: unknown) {
    try {
        const parsedData = memberSchema.parse(data);
        await connectToDatabase();
        await TeamMember.findByIdAndUpdate(id, parsedData);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true, message: 'Team member updated successfully.' };
    } catch (error) {
        console.error('Failed to update team member:', error);
        return { success: false, message: 'Failed to update team member.' };
    }
}

/**
 * Deletes a team member from the database.
 * @param {string} id The ID of the member to delete.
 * @returns {Promise<{success: boolean, message: string}>} A result object.
 */
export async function deleteTeamMember(id: string) {
    try {
        await connectToDatabase();
        await TeamMember.findByIdAndDelete(id);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true, message: 'Team member deleted successfully.' };
    } catch (error) {
        console.error('Failed to delete team member:', error);
        return { success: false, message: 'Failed to delete team member.' };
    }
}

// Admin Auth Actions

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function adminSignup(data: unknown) {
    try {
        const { name, email, password } = signupSchema.parse(data);
        await connectToDatabase();

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return { success: false, message: 'An admin with this email already exists.' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({ name, email, password: hashedPassword });

        return { success: true, message: 'Admin account created successfully.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        console.error('Signup error:', error);
        return { success: false, message: 'An unexpected error occurred during signup.' };
    }
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export async function adminLogin(data: unknown) {
    try {
        const { email, password } = loginSchema.parse(data);
        await connectToDatabase();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // In a real app, you would create a session/token here.
        // For now, we just return success.
        return { success: true, message: 'Login successful!', user: { name: admin.name, email: admin.email } };
    } catch (error) {
         if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        console.error('Login error:', error);
        return { success: false, message: 'An unexpected error occurred during login.' };
    }
}
