# Sarthi Shiksha Roshan Seva Samiti Website

This is the official website for the NGO "Sarthi Shiksha Roshan Seva Samiti," built with Next.js and Firebase Studio. The platform aims to provide comprehensive information about the NGO's mission, projects, and ways to contribute, while also featuring an AI-powered translation service to make the content accessible to a global audience.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices, from mobile phones to desktops.
- **Multi-page Architecture**: Clear and intuitive navigation across different sections of the website:
  - **Home**: An engaging introduction to the NGO's mission and vision.
  - **About Us**: Detailed information about the organization's history, team, and values.
  - **Projects**: A showcase of current and past projects with impact metrics.
  - **How to Help**: Clear guidance on how to donate, volunteer, and support the NGO.
  - **News**: The latest updates, articles, and announcements.
  - **Contact**: Contact information, a contact form, and location map.
- **AI-Powered Translation**: A prominent feature in the navigation bar allows users to translate the entire website's content into multiple languages using Google's generative AI.
- **Modern UI/UX**: Built with a clean, professional design system using shadcn/ui and Tailwind CSS, featuring subtle animations and a user-friendly experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Gemini via Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: Firebase App Hosting (configured via `apphosting.yaml`)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**
   ```bash
s   cd <project_directory>
   ```

3. **Install NPM packages:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

5. **Run the development server:**
   The application and the AI backend run on different processes.

   - To run the Next.js frontend:
     ```bash
     npm run dev
     ```
     Open [http://localhost:9002](http://localhost:9002) to view it in the browser.

   - To run the Genkit AI backend for translation:
     ```bash
     npm run genkit:dev
     ```

## Project Structure

The project follows the standard Next.js App Router structure.

- `src/app/`: Contains all the pages and routes of the application.
  - `(pages)`: Each folder like `about`, `contact`, etc., represents a route.
  - `layout.tsx`: The root layout for the entire application.
  - `page.tsx`: The homepage of the application.
- `src/components/`: Contains all reusable React components.
  - `layout/`: Components specific to the site layout (Header, Footer).
  - `ui/`: Core UI components from shadcn/ui.
  - `language-switcher.tsx`: The component for language translation.
- `src/context/`: Contains React context providers.
  - `translation-context.tsx`: Manages the state for the AI translation feature.
- `src/lib/`: Contains utility functions and server actions.
  - `actions.ts`: Server-side actions, like handling form submissions.
  - `utils.ts`: General utility functions.
- `src/ai/`: Contains all AI-related code (Genkit flows).
  - `flows/translate-website.ts`: The Genkit flow for translating website content.
- `public/`: Contains static assets like images and fonts.

## AI Integration

The language translation feature is powered by Google's Gemini model through the Genkit framework.

- **How it works**:
  1. The content for each page is stored in a structured JSON object.
  2. When a user selects a language and clicks "Translate," the `LanguageSwitcher` component calls a function from the `TranslationContext`.
  3. The context stringifies the JSON content and sends it to a server-side Genkit flow defined in `src/ai/flows/translate-website.ts`.
  4. The Genkit flow uses the Gemini AI model to translate the text values within the JSON object.
  5. The translated JSON string is returned to the client, parsed, and used to update the page's content, providing a seamless translation experience.
