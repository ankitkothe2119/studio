# Sarthi Shiksha - Backend Documentation

This document provides an overview of the backend architecture, data schemas, and setup instructions for the Sarthi Shiksha website. It also includes a comprehensive prompt for generating the backend functionality using a large language model.

## 1. Backend Architecture

The backend is built using a combination of Next.js Server Actions and Google's Genkit framework for AI-powered features.

-   **Next.js Server Actions (`src/server/actions.ts`)**: Handles all form submissions from the website. It receives data from the client, validates it using Zod, and processes it. In a production environment, this is where you would integrate with a database (like Firestore) or an email service.

-   **Genkit (`src/server/ai/flows/`)**: Powers the AI features of the website.
    -   `chat-flow.ts`: Implements a chatbot that uses a generative model to answer user questions based on the content of the current webpage.
    -   `genkit.ts`: Configures the Genkit instance and specifies the AI model to be used.

-   **Dev Server (`src/server/ai/dev.ts`)**: The entry point for running the Genkit development server, which makes the AI flows available for local testing.

## 2. Data Schemas

The application uses `zod` to define and validate the structure of data submitted through forms.

### Contact & Inquiry Forms

All form submissions are processed by a single server action, `handleContactForm`, which validates the data against the following schemas:

-   **Contact Form:**
    -   `name`: `string`
    -   `email`: `string` (valid email format)
    -   `message`: `string`

-   **Donation Form:**
    -   `formType`: `'Donate'`
    -   `name`: `string`
    -   `email`: `string` (valid email format)
    -   `amount`: `number` (positive)
    -   `message`: `string` (optional)

-   **Volunteer Form:**
    -   `formType`: `'Volunteer'`
    -   `name`: `string`
    -   `email`: `string` (valid email format)
    -   `phone`: `string`
    -   `interest`: `string` (e.g., "Teaching", "Events")
    -   `message`: `string` (optional)

-   **Corporate Partnership Form:**
    -   `formType`: `'Partner'`
    -   `companyName`: `string`
    -   `contactPerson`: `string`
    -   `email`: `string` (valid email format)
    -   `phone`: `string`
    -   `message`: `string`

## 3. Setup and Running the Backend

To run the backend locally, you need two separate terminal sessions.

1.  **Run the Next.js Frontend/Backend Server:**
    This command starts the main web application.
    ```bash
    npm run dev
    ```

2.  **Run the Genkit AI Development Server:**
    This command starts the Genkit server, which makes the AI flows (like the chatbot) available to the application.
    ```bash
    npm run genkit:dev
    ```

Ensure you have a `.env.local` file in the root directory with your `GOOGLE_API_KEY`.

---

## 4. AI Prompt for Backend Generation

Below is a comprehensive prompt designed to instruct a capable AI coding assistant to generate the backend code for this project.

***

### **Prompt:**

Generate the backend code for a Next.js application for an NGO called "Sarthi Shiksha". The backend will consist of two main parts: Next.js Server Actions for form handling and Genkit flows for AI features.

**Part 1: Next.js Server Action for Form Submissions**

Create a single server action file at `src/server/actions.ts`. This file must handle submissions from four different forms: a general contact form, a donation form, a volunteer form, and a corporate partnership form.

1.  **Create a single exported function `handleContactForm(formData: any)`**.
2.  Use the `zod` library to define schemas for validating the incoming `formData`. Create a discriminated union to handle the different form types.
3.  The schemas should be as follows:
    -   **Donation Schema**:
        -   `formType`: A literal string `'Donate'`
        -   `name`: `string`
        -   `email`: `string` (email format)
        -   `amount`: `number` (must be positive)
        -   `message`: `string` (optional)
    -   **Volunteer Schema**:
        -   `formType`: A literal string `'Volunteer'`
        -   `name`: `string`
        -   `email`: `string` (email format)
        -   `phone`: `string`
        -   `interest`: `string`
        -   `message`: `string` (optional)
    -   **Partnership Schema**:
        -   `formType`: A literal string `'Partner'`
        -   `companyName`: `string`
        -   `contactPerson`: `string`
        -   `email`: `string` (email format)
        -   `phone`: `string`
        -   `message`: `string`
    -   **Contact Schema**:
        -   `name`: `string`
        -   `email`: `string` (email format)
        -   `message`: `string`
        -   Must be transformed to include a `formType` of `'Contact'`.
4.  The `handleContactForm` function should parse the incoming data against these schemas.
5.  For now, the function should just `console.log` the parsed data to simulate a successful submission. It should not contain any real database or email logic.
6.  The function must return a JSON object: `{ success: true, message: '...' }` on success, and `{ success: false, message: '...' }` on failure.

**Part 2: Genkit AI Flow for a Website Chatbot**

Create a Genkit flow file at `src/server/ai/flows/chat-flow.ts` that provides a chatbot to answer questions about the NGO based on the current page's content.

1.  The file must start with the `'use server';` directive.
2.  Import the global `ai` object from `src/server/ai/genkit.ts`.
3.  Define a Zod schema for the flow's input, `ChatWithWebsiteInputSchema`, containing:
    -   `query`: `string`, described as "The user's question."
    -   `context`: `string`, described as "A JSON string containing the content of the current webpage."
4.  Define a Zod schema for the flow's output, `ChatWithWebsiteOutputSchema`, containing:
    -   `response`: `string`, described as "The chatbot's answer to the user's query."
5.  Create and export an `async` wrapper function `chatWithWebsite` that takes the input and calls the Genkit flow.
6.  Define a Genkit prompt named `chatWithWebsitePrompt`.
    -   The prompt should instruct the model to act as a friendly chatbot for "Sarthi Shiksha Roshan Seva Samiti".
    -   It must use the `context` JSON to answer the `query`.
    -   It should be instructed **not** to make up information and to state when it doesn't know the answer.
    -   Use Handlebars syntax `{{{context}}}` and `{{{query}}}` to inject the input into the prompt string.
7.  Define a Genkit flow named `chatWithWebsiteFlow` that takes the input, calls the prompt, and returns the structured output.

Do not create any other files.
***
