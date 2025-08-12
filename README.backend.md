# Sarthi Shiksha Roshan Seva Samiti - Backend Documentation

This document provides an overview of the backend architecture, data schemas, and setup instructions for the Sarthi Shiksha Roshan Seva Samiti website. It also includes a comprehensive prompt for generating the backend functionality using a large language model.

## 1. Backend Architecture

The backend is built using a combination of Next.js Server Actions and Google's Genkit framework for AI-powered features. All backend-related code is organized within the `src/server/` directory.

- **Next.js Server Actions (`src/server/actions.ts`)**: Handles all form submissions and database interactions for the website. This includes processing contact forms and managing the full CRUD lifecycle for team members via the admin panel. In a production environment, this is where you would integrate with a database (like Firestore or MongoDB) or an email service.

- **Genkit (`src/server/ai/`)**: Powers the AI features of the website.
    -   `flows/chat-flow.ts`: Implements a chatbot that uses a generative model to answer user questions based on the content of the current webpage.
    -   `genkit.ts`: Configures the Genkit instance and specifies the AI model to be used.
    -   `dev.ts`: The entry point for running the Genkit development server, which makes the AI flows available for local testing.

## 2. Data Schemas

The application uses `zod` to define and validate the structure of data submitted through forms and managed in the database.

- **Form Submissions**: A single server action, `handleContactForm`, validates form data against a discriminated union of schemas (Donation, Volunteer, Partner, Contact).
- **Team Members**: The `addTeamMember`, `updateTeamMember`, and `deleteTeamMember` server actions validate data against a `teamMemberSchema` before interacting with the database.

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

Generate the backend code for a Next.js application for an NGO called "Sarthi Shiksha Roshan Seva Samiti". The backend will consist of Next.js Server Actions for form handling and database management, and Genkit flows for AI features. All backend code should be placed in a `src/server/` directory.

**Part 1: Database Setup**

1.  Create a database connection file at `src/server/db/mongodb.ts` that uses `mongoose` to connect to a MongoDB database. Use the `MONGODB_URI` environment variable.
2.  Create a models file at `src/server/db/models.ts`. Define Mongoose schemas and models for the following collections: `Donor`, `Volunteer`, `Partner`, `Contact`, and `TeamMember`.
    -   `TeamMember` schema must include: `name`, `role`, `avatar` (2-char string), `description`, and a `category` (enum: 'Founder' or 'Team Member').

**Part 2: Next.js Server Actions (`src/server/actions.ts`)**

1.  **Form Handling:**
    -   Create a single exported function `handleContactForm(formData: any)`.
    -   Use `zod` to define schemas and a discriminated union for four form types: `Donate`, `Volunteer`, `Partner`, and `Contact`.
    -   The function should parse the incoming data and save it to the corresponding MongoDB collection.
    -   Return a JSON object indicating success or failure.

2.  **Team Member Management (for Admin Panel):**
    -   Implement a `getTeamMembers` function to fetch all team members, separating them into `founders` and `teamMembers` based on their category. It should also seed the initial team data if the collection is empty.
    -   Implement an `addTeamMember` function that validates data against a `zod` schema and creates a new document in the `TeamMember` collection.
    -   Implement an `updateTeamMember` function that takes a member ID and data, validates the data, and updates the corresponding document.
    -   Implement a `deleteTeamMember` function that takes a member ID and deletes the document.
    -   Ensure all data-modifying actions call `revalidatePath` to update the frontend cache for `/admin/team` and `/about`.

**Part 3: Genkit AI Flow for a Website Chatbot**

Create a Genkit flow file at `src/server/ai/flows/chat-flow.ts`.

1.  The file must start with the `'use server';` directive.
2.  Import the global `ai` object from `src/server/ai/genkit.ts`.
3.  Define Zod schemas for the flow's input (`ChatWithWebsiteInputSchema`) with `query: string` and `context: string`, and output (`ChatWithWebsiteOutputSchema`) with `response: string`.
4.  Create and export an `async` wrapper function `chatWithWebsite` that calls the Genkit flow.
5.  Define a Genkit prompt named `chatWithWebsitePrompt` that instructs the model to act as a friendly chatbot for "Sarthi Shiksha Roshan Seva Samiti", using the provided `context` to answer the user's `query`. It should not invent information.
6.  Define a Genkit flow named `chatWithWebsiteFlow` that takes the input, calls the prompt, and returns the structured output.
***
