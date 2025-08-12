# Sarthi Shiksha Roshan Seva Samiti Website

This is the official website for the NGO "Sarthi Shiksha Roshan Seva Samiti," built with Next.js and Firebase Studio. The platform aims to provide comprehensive information about the NGO's mission, projects, and ways to contribute.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices, from mobile phones to desktops.
- **Multi-page Architecture**: Clear and intuitive navigation across different sections of the website:
  - **Home**: An engaging introduction to the NGO's mission and vision.
  - **About Us**: Detailed information about the organization's history, team, and values.
  - **Projects**: A showcase of current and past projects with impact metrics.
  - **How to Help**: Clear guidance on how to donate, volunteer, and support the NGO through interactive forms.
  - **News**: The latest updates, articles, and announcements.
  - **Contact**: Contact information and a dedicated contact form.
- **AI-Powered Chatbot**: An intelligent assistant, powered by Google's Gemini model via Genkit, to help users navigate the site and get information quickly.
- **Modern UI/UX**: Built with a clean, professional design system using shadcn/ui and Tailwind CSS.
- **Interactive Forms**: User-friendly pop-up forms for donations, volunteering, and partnerships.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Gemini via Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: Firebase App Hosting (configured via `apphosting.yaml`)

## Local Development Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm or yarn

### 1. Installation

First, clone the repository and install the necessary dependencies.

```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project directory
cd <project_directory>

# Install NPM packages
npm install
```

### 2. Environment Variables

Next, you need to set up your environment variables for the AI features to work.

1.  Create a new file named `.env` in the root of your project.
2.  Copy the contents of the `.env.example` file into your new `.env` file.
3.  Replace the placeholder with your actual Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

Your `.env` file should look like this:
```
# This is a sample environment file.
# Create a .env file and add your Google AI API key.
GOOGLE_API_KEY=your_api_key_here
```

### 3. Running the Application

The application requires two separate processes to run concurrently: the Next.js web server and the Genkit AI server.

**Terminal 1: Run the Next.js Frontend Server**
This command starts the main web application.
```bash
npm run dev
```
The website will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Run the Genkit AI Server**
This command starts the Genkit server, which powers the AI chatbot.
```bash
npm run genkit:dev
```
This makes the AI flows available to the application.

You are now all set up for local development!

## Project Structure

- `src/app/`: Contains all the pages and routes.
- `src/components/`: Reusable React components.
  - `layout/`: Components for the main site layout (Header, Footer).
  - `ui/`: Core UI components from shadcn/ui.
  - `InquiryFormDialog.tsx`: The reusable pop-up form for donations, etc.
  - `chatbot.tsx`: The AI chatbot component.
- `src/lib/`:
  - `content.ts`: All static text content for the website.
  - `utils.ts`: Utility functions.
- `src/server/`: Contains all backend logic.
  - `actions.ts`: Next.js Server Actions for handling form submissions.
  - `ai/`: Genkit flows and configuration.
- `public/`: Static assets like images and the logo.
```