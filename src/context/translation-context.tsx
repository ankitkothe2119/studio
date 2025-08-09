'use client';
/**
 * @fileoverview This file defines the TranslationContext for managing website content translation.
 * It provides a hook `useTranslation` to access and manipulate translation state across the application.
 * It communicates with a Genkit flow to perform the translation using an AI model.
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { translateWebsiteContent } from '@/ai/flows/translate-website';
import { useToast } from '@/hooks/use-toast';

// Define the shape of the context's state.
interface TranslationContextType {
  pageContent: any;
  setPageContent: (content: any) => void;
  translatedContent: any;
  isLoading: boolean;
  isTranslated: boolean;
  translate: (targetLanguage: string) => Promise<void>;
  resetTranslation: () => void;
}

// Create the context with a default undefined value.
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * A provider component that wraps the application and provides translation state.
 * @param {{ children: ReactNode }} props The component props.
 * @returns {JSX.Element} The rendered provider.
 */
export function TranslationProvider({ children }: { children: ReactNode }): JSX.Element {
  const [pageContent, setPageContent] = useState<any>(null);
  const [originalContent, setOriginalContent] = useState<any>(null);
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslated, setIsTranslated] = useState<boolean>(false);
  const { toast } = useToast();

  const setAndStoreInitialContent = useCallback((content: any) => {
    // Always update originalContent when new page content is set
    setOriginalContent(content);
    if (isTranslated && translatedContent) {
      // If already in translated mode, show the translated content for the new page
      // This assumes translatedContent is an object with keys matching page content structure
      // A more robust solution might require re-translation or a different state structure
    } else {
      setPageContent(content);
    }
  }, [isTranslated, translatedContent]);

  const translate = useCallback(async (targetLanguage: string) => {
    if (!originalContent) return;

    setIsLoading(true);
    try {
      // The AI expects a string, so we stringify the JSON content.
      const contentString = JSON.stringify(originalContent, null, 2);
      
      const result = await translateWebsiteContent({ 
        text: contentString, 
        targetLanguage 
      });

      // The AI might wrap the response in markdown, so we clean it.
      const cleanedJsonString = result.translatedText
        .replace(/^```json\s*/, '')
        .replace(/```$/, '');
      
      const parsed = JSON.parse(cleanedJsonString);
      setTranslatedContent(parsed);
      setPageContent(parsed); // Update pageContent to the translated version
      setIsTranslated(true);
    } catch (error) {
      console.error("Translation failed:", error);
      toast({
        title: "Translation Error",
        description: "Could not translate the page content. Please try again or select a different language.",
        variant: "destructive",
      });
      setTranslatedContent(null);
      setIsTranslated(false);
    } finally {
      setIsLoading(false);
    }
  }, [originalContent, toast]);

  const resetTranslation = useCallback(() => {
    setIsTranslated(false);
    setTranslatedContent(null);
    if (originalContent) {
      setPageContent(originalContent);
    }
  }, [originalContent]);

  const value = {
    pageContent,
    setPageContent: setAndStoreInitialContent,
    translatedContent,
    isLoading,
    isTranslated,
    translate,
    resetTranslation,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * A custom hook to easily access the translation context.
 * Throws an error if used outside of a TranslationProvider.
 * @returns {TranslationContextType} The translation context.
 */
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
