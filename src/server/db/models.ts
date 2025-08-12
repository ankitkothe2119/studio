/**
 * @fileoverview This file defines the Mongoose schemas and models for the application's database.
 */
import mongoose, { Schema } from 'mongoose';

// Base schema for common fields in form submissions
const submissionSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
}, { timestamps: true });

// Schema for Donors
const donorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
}, { timestamps: true });

// Schema for Volunteers
const volunteerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interest: { type: String, required: true },
    message: { type: String },
}, { timestamps: true });

// Schema for Corporate Partners
const partnerSchema = new Schema({
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

// Schema for General Contact Form Submissions
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

// Schema for Team Members
const teamMemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
});


// Create models from schemas if they don't already exist
export const Donor = mongoose.models.Donor || mongoose.model('Donor', donorSchema);
export const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
export const Partner = mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
