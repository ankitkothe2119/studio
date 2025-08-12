# Sarthi Shiksha - Backend Documentation

This document provides an overview of the backend architecture, data schemas, and setup instructions for the Sarthi Shiksha website. It also includes a comprehensive prompt for generating the backend functionality using a large language model.

## 1. Backend Architecture

The backend is built using a combination of Next.js Server Actions and Google's Genkit framework for AI-powered features. All backend-related code is organized within the `src/server/` directory.

-   **Next.js Server Actions (`src/server/actions.ts`)**: Handles all form submissions from the website. It receives data from the client, validates it using Zod, and processes it. In a production environment, this is where you would integrate with a database (like Firestore) or an email service.

-   **Genkit (`src/server/ai/`)**: Powers the AI features of the website.
    -   `flows/chat-flow.ts`: Implements a chatbot that uses a generative model to answer user questions based on the content of the current webpage.
    -   `genkit.ts`: Configures the Genkit instance and specifies the AI model to be used.
    -   `dev.ts`: The entry point for running the Genkit development server, which makes the AI flows available for local testing.

## 2. Data Schemas

The application uses `zod` to define and validate the structure of data submitted through forms. All form submissions are processed by a single server action, `handleContactForm`, which validates the data against a discriminated union of schemas.

-   **Contact Form:** `name`, `email`, `message`
-   **Donation Form:** `name`, `email`, `amount`, `message` (optional)
-   **Volunteer Form:** `name`, `email`, `phone`, `interest`, `message` (optional)
-   **Corporate Partnership Form:** `companyName`, `contactPerson`, `email`, `phone`, `message`

## 3. Setup and Running the Backend

To run the project locally, you need two separate terminal sessions.

### 1. Run the Next.js Frontend/Backend Server:
This command starts the main web application.
```bash
npm run dev
```

### 2. Run the Genkit AI Development Server:
This command starts the Genkit server, which makes the AI flows (like the chatbot) available to the application.
```bash
npm run genkit:dev
```

Ensure you have a `.env` file in the root directory with your `GOOGLE_API_KEY`. See the main `README.md` for detailed setup instructions.

---

## 4. AI Prompt for Backend Generation

Below is a comprehensive prompt designed to instruct a capable AI coding assistant to generate the backend code for this project.

***

### **Prompt:**

Generate the backend code for a Next.js application for an NGO called "Sarthi Shiksha". The backend will consist of two main parts: Next.js Server Actions for form handling and Genkit flows for AI features. All backend code should be placed in a `src/server/` directory.

**Part 1: Next.js Server Action for Form Submissions**

Create a single server action file at `src/server/actions.ts`. This file must handle submissions from four different forms: a general contact form, a donation form, a volunteer form, and a corporate partnership form.

1.  **Create a single exported function `handleContactForm(formData: any)`**.
2.  Use the `zod` library to define schemas for validating the incoming `formData`. Create a discriminated union to handle the different form types.
3.  The schemas should be as follows:
    -   **Donation Schema**: `formType: 'Donate'`, `name: string`, `email: string`, `amount: number` (positive), `message: string` (optional)
    -   **Volunteer Schema**: `formType: 'Volunteer'`, `name: string`, `email: string`, `phone: string`, `interest: string`, `message: string` (optional)
    -   **Partnership Schema**: `formType: 'Partner'`, `companyName: string`, `contactPerson: string`, `email: string`, `phone: string`, `message: string`
    -   **Contact Schema**: `name: string`, `email: string`, `message: string`. Transform it to include `formType: 'Contact'`.
4.  The `handleContactForm` function should parse the incoming data against these schemas.
5.  For now, the function should just `console.log` the parsed data.
6.  The function must return a JSON object: `{ success: true, message: '...' }` on success, and `{ success: false, message: '...' }` on failure.

**Part 2: Genkit AI Flow for a Website Chatbot**

Create a Genkit flow file at `src/server/ai/flows/chat-flow.ts`.

1.  The file must start with the `'use server';` directive.
2.  Import the global `ai` object from `src/server/ai/genkit.ts`.
3.  Define Zod schemas for the flow's input (`ChatWithWebsiteInputSchema`) with `query: string` and `context: string`, and output (`ChatWithWebsiteOutputSchema`) with `response: string`.
4.  Create and export an `async` wrapper function `chatWithWebsite` that calls the Genkit flow.
5.  Define a Genkit prompt named `chatWithWebsitePrompt` that instructs the model to act as a friendly chatbot for "Sarthi Shiksha", using the provided `context` to answer the user's `query`. It should not invent information.
6.  Define a Genkit flow named `chatWithWebsiteFlow` that takes the input, calls the prompt, and returns the structured output.
***
```