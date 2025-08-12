# Sarthi Shiksha Roshan Seva Samiti - Backend Documentation

This document provides an overview of the backend architecture, data schemas, and setup instructions for the Sarthi Shiksha Roshan Seva Samiti website. It also includes a comprehensive prompt for generating the backend functionality using a large language model.

## 1. Backend Architecture

The backend is built using a combination of Next.js Server Actions and Google's Genkit framework for AI-powered features. All backend-related code is organized within the `src/server/` directory.

- **Next.js Server Actions (`src/server/actions.ts`)**: Handles all form submissions and data interactions for the website.
    - **Form Handling**: A single server action, `handleContactForm`, validates and processes data from various forms (Donation, Volunteer, Partner, Contact) and saves it to the appropriate MongoDB collection.
    - **Team Member CRUD**: A full set of actions (`getTeamMembers`, `addTeamMember`, `updateTeamMember`, `deleteTeamMember`) manages the team member data for the admin panel.
    - **User Authentication**: The `signup` and `login` actions manage user accounts. New sign-ups are automatically assigned a 'user' role, while the login action verifies credentials for both 'user' and 'admin' roles.

- **Genkit (`src/server/ai/`)**: Powers the AI features of the website.
    -   `flows/chat-flow.ts`: Implements a chatbot that uses a generative model to answer user questions based on the content of the current webpage.
    -   `genkit.ts`: Configures the Genkit instance and specifies the AI model to be used.
    -   `dev.ts`: The entry point for running the Genkit development server, which makes the AI flows available for local testing.

## 2. Data Schemas

The application uses `zod` for validation and `mongoose` for database schemas.

- **Form Submissions**: The `handleContactForm` action validates form data against a discriminated union of Zod schemas.
- **Team Members**: Team member actions validate data against a `teamMemberSchema` before interacting with the database.
- **Users**: The `User` model (`src/server/db/models.ts`) defines the schema for users, which includes a `role` field ('user' or 'admin') to distinguish between user types.

## 3. Setup and Running the Backend

To run the project locally, you need two separate terminal sessions.

### 1. Run the Next.js Frontend/Backend Server:
This command starts the main web application, including the server actions.
```bash
npm run dev
```

### 2. Run the Genkit AI Development Server:
This command starts the Genkit server, which makes the AI flows (like the chatbot) available to the application.
```bash
npm run genkit:dev
```

Ensure you have a `.env` file in the root directory with your `GOOGLE_API_KEY` and `MONGODB_URI`. See the main `README.md` for detailed setup instructions.

---

## 4. AI Prompt for Backend Generation

Below is a comprehensive prompt designed to instruct a capable AI coding assistant to generate the backend code for this project.

***

### **Prompt:**

Generate the backend code for a Next.js application for an NGO called "Sarthi Shiksha Roshan Seva Samiti". The backend will consist of Next.js Server Actions for form handling, database management, and user authentication. It will also include a Genkit flow for an AI chatbot. All backend code should be placed in a `src/server/` directory.

**Part 1: Database Setup**

1.  Create a database connection file at `src/server/db/mongodb.ts` that uses `mongoose` to connect to a MongoDB database using the `MONGODB_URI` environment variable.
2.  Create a models file at `src/server/db/models.ts`. Define Mongoose schemas and models for the following collections:
    -   `Donor`, `Volunteer`, `Partner`, `Contact`: For form submissions.
    -   `TeamMember`: Must include `name`, `role`, `avatar` (2-char string), `description`, and a `category` (enum: 'Founder' or 'Team Member').
    -   `User`: A unified model for users and admins. It must include `name`, `email` (unique), `password` (hashed), and a `role` (enum: 'user' or 'admin').

**Part 2: Next.js Server Actions (`src/server/actions.ts`)**

1.  **Form Handling:**
    -   Create a single exported function `handleContactForm(formData: any)` that uses a `zod` discriminated union to validate and save data to the correct MongoDB collection (`Donor`, `Volunteer`, `Partner`, or `Contact`).

2.  **Team Member Management (for Admin Panel):**
    -   `getTeamMembers`: Fetches all team members and seeds initial data if the collection is empty.
    -   `addTeamMember`, `updateTeamMember`, `deleteTeamMember`: Implement full CRUD functionality, validating data with a `zod` schema and calling `revalidatePath` for `/admin/team` and `/about` on data changes.

3.  **User Authentication:**
    -   `signup`: Takes user data, validates it, hashes the password using `bcryptjs`, and creates a new document in the `User` collection with the `role` set to 'user'.
    -   `login`: Takes credentials, finds the user, compares the hashed password, and returns the user's details (including their role) upon success.

**Part 3: Genkit AI Flow for a Website Chatbot (`src/server/ai/flows/chat-flow.ts`)**

1.  The file must start with the `'use server';` directive.
2.  Define Zod schemas for the flow's input (`ChatWithWebsiteInputSchema`) with `query: string` and `context: string`, and output (`ChatWithWebsiteOutputSchema`) with `response: string`.
3.  Create an `async` wrapper function `chatWithWebsite` that calls the Genkit flow.
4.  Define a Genkit prompt named `chatWithWebsitePrompt` that instructs the model to act as a friendly chatbot, using the provided `context` (webpage content) to answer the user's `query`. It should not invent information.
5.  Define the Genkit flow `chatWithWebsiteFlow` that executes the prompt.
***
