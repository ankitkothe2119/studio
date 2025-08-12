# Sarthi Shiksha Roshan Seva Samiti Website

This is the official website for the NGO "Sarthi Shiksha Roshan Seva Samiti," built with Next.js and Firebase Studio. The platform aims to provide comprehensive information about the NGO's mission, projects, and ways to contribute.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices, from mobile phones to desktops.
- **Multi-page Architecture**: Clear and intuitive navigation across different sections of the website.
- **Dynamic Content**: Team member data is fetched directly from a MongoDB database.
- **AI-Powered Chatbot**: An intelligent assistant, powered by Google's Gemini model via Genkit, to help users navigate the site and get information quickly.
- **Modern UI/UX**: Built with a clean, professional design system using shadcn/ui and Tailwind CSS.
- **Interactive Forms**: User-friendly pop-up forms for donations, volunteering, and partnerships that save data directly to MongoDB.
- **Admin Panel**: A dedicated dashboard at `/admin` to manage database content, starting with full CRUD (Create, Read, Update, Delete) functionality for team members.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
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
- A MongoDB database (you can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

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

Next, you need to set up your environment variables.

1.  Create a new file named `.env` in the root of your project.
2.  Add the following content to your new `.env` file.
3.  Replace the placeholder values with your actual Google AI API key and your MongoDB connection string.

Your `.env` file should look like this:
```
# Get your Google AI API key from https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=your_google_api_key_here

# Get your MongoDB connection string from your MongoDB Atlas dashboard
MONGODB_URI=your_mongodb_connection_string_here
```

### 3. Running the Application

The application requires two separate processes to run concurrently: the Next.js web server and the Genkit AI server.

**Terminal 1: Run the Next.js Frontend/Backend Server**
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

You are now all set up for local development! The first time you load the "About Us" page, the database will be seeded with initial team member data.

## Project Structure

- `src/app/`: Contains all the pages and routes, including `/admin`.
- `src/components/`: Reusable React components, including `admin` components.
- `src/lib/`:
  - `content.ts`: All static text content for the website.
- `src/server/`: Contains all backend logic.
  - `actions.ts`: Next.js Server Actions for handling form submissions and database interactions.
  - `ai/`: Genkit flows and configuration.
  - `db/`: Database connection and Mongoose models.
- `public/`: Static assets like images and the logo.
