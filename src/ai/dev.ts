import { config } from 'dotenv';
config();

// This line imports the chatbot flow, making it available to the Genkit dev server.
import '@/ai/flows/chat-flow.ts';
