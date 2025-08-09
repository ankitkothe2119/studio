'use server';
/**
 * @fileOverview A Genkit flow for a chatbot that answers questions based on website content.
 *
 * - chatWithWebsite - A function that handles the chatbot interaction.
 * - ChatWithWebsiteInput - The input type for the chatWithWebsite function.
 * - ChatWithWebsiteOutput - The return type for the chatWithWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatWithWebsiteInputSchema = z.object({
    query: z.string().describe('The user\'s question.'),
    context: z.string().describe('A JSON string containing the content of the current webpage.'),
});
export type ChatWithWebsiteInput = z.infer<typeof ChatWithWebsiteInputSchema>;

const ChatWithWebsiteOutputSchema = z.object({
    response: z.string().describe('The chatbot\'s answer to the user\'s query.'),
});
export type ChatWithWebsiteOutput = z.infer<typeof ChatWithWebsiteOutputSchema>;


export async function chatWithWebsite(input: ChatWithWebsiteInput): Promise<ChatWithWebsiteOutput> {
    return chatWithWebsiteFlow(input);
}

const chatPrompt = ai.definePrompt({
    name: 'chatWithWebsitePrompt',
    input: { schema: ChatWithWebsiteInputSchema },
    output: { schema: ChatWithWebsiteOutputSchema },
    prompt: `You are a friendly and helpful chatbot for an NGO called "Sarthi Shiksha Roshan Seva Samiti".
    
Your goal is to answer the user's questions based on the information provided about the NGO from the current webpage content.
Be concise and helpful. If the information is not available in the provided context, say "I'm sorry, I don't have that information. You may find more details on the relevant page or by contacting the NGO directly."

Do not make up information.

Webpage Content (Context):
\`\`\`json
{{{context}}}
\`\`\`

User's Question:
"{{{query}}}"
`,
});

const chatWithWebsiteFlow = ai.defineFlow(
    {
        name: 'chatWithWebsiteFlow',
        inputSchema: ChatWithWebsiteInputSchema,
        outputSchema: ChatWithWebsiteOutputSchema,
    },
    async (input) => {
        const { output } = await chatPrompt(input);
        return output!;
    }
);
