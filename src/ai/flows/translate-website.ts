// This file uses server-side code.
'use server';

/**
 * @fileOverview A Genkit flow to translate website content into a specified language using the Google Cloud Translation API.
 *
 * - translateWebsiteContent - A function that translates the input text into the target language.
 * - TranslateWebsiteContentInput - The input type for the translateWebsiteContent function.
 * - TranslateWebsiteContentOutput - The return type for the translateWebsiteContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Translate } from '@google-cloud/translate/build/src/v2';

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

// Initialize the Google Cloud Translate client.
const translateClient = new Translate();

// A map for language codes if needed, as the API expects ISO-639-1 codes.
const languageCodeMap: { [key: string]: string } = {
    'Hindi': 'hi',
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Mandarin Chinese': 'zh-CN',
    'Arabic': 'ar'
};

const translateWebsiteContentFlow = ai.defineFlow(
  {
    name: 'translateWebsiteContentFlow',
    inputSchema: TranslateWebsiteContentInputSchema,
    outputSchema: TranslateWebsiteContentOutputSchema,
  },
  async ({ text, targetLanguage }) => {
    try {
        const languageCode = languageCodeMap[targetLanguage] || targetLanguage;
        
        const [translation] = await translateClient.translate(text, languageCode);
        
        return { translatedText: translation };

    } catch (error) {
        console.error('Error during translation:', error);
        throw new Error('Failed to translate content using Google Translate API.');
    }
  }
);
