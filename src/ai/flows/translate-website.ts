// This file uses server-side code.
'use server';

/**
 * @fileOverview A Genkit flow to translate website content into a specified language.
 *
 * - translateWebsiteContent - A function that translates the input text into the target language.
 * - TranslateWebsiteContentInput - The input type for the translateWebsiteContent function.
 * - TranslateWebsiteContentOutput - The return type for the translateWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateWebsiteContentInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The target language for translation.'),
});
export type TranslateWebsiteContentInput = z.infer<
  typeof TranslateWebsiteContentInputSchema
>;

const TranslateWebsiteContentOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateWebsiteContentOutput = z.infer<
  typeof TranslateWebsiteContentOutputSchema
>;

export async function translateWebsiteContent(
  input: TranslateWebsiteContentInput
): Promise<TranslateWebsiteContentOutput> {
  return translateWebsiteContentFlow(input);
}

const translateWebsiteContentPrompt = ai.definePrompt({
  name: 'translateWebsiteContentPrompt',
  input: {
    schema: TranslateWebsiteContentInputSchema,
  },
  output: {
    schema: TranslateWebsiteContentOutputSchema,
  },
  prompt: `Translate the following text into {{{targetLanguage}}}:\n\n{{text}}`,
});

const translateWebsiteContentFlow = ai.defineFlow(
  {
    name: 'translateWebsiteContentFlow',
    inputSchema: TranslateWebsiteContentInputSchema,
    outputSchema: TranslateWebsiteContentOutputSchema,
  },
  async input => {
    const {output} = await translateWebsiteContentPrompt(input);
    return output!;
  }
);
