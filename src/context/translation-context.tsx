'use client';
/**
 * @fileoverview This file defines the TranslationContext for managing website content translation.
 * It provides a hook `useTranslation` to access and manipulate translation state across the application.
 * It communicates with a Genkit flow to perform the translation using an AI model.
 */

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { translateWebsiteContent } from '@/ai/flows/translate-website';
import { useToast } from '@/hooks/use-toast';

import { 
    homePageContent, 
    aboutPageContent, 
    projectsPageContent, 
    howToHelpPageContent, 
    newsPageContent, 
    contactPageContent 
} from '@/lib/content';

const pageContentMap: { [key: string]: any } = {
    '/': homePageContent,
    '/about': aboutPageContent,
    '/projects': projectsPageContent,
    '/how-to-help': howToHelpPageContent,
    '/news': newsPageContent,
    '/contact': contactPageContent
};


// Define the shape of the context's state.
interface TranslationContextType {
  originalContent: any;
  translatedContent: any;
  pageContent: any;
  isLoading: boolean;
  isTranslated: boolean;
  translate: (contentToTranslate: any, targetLanguage: string) => Promise<void>;
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
  const [originalContent, setOriginalContent] = useState<any>(null);
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslated, setIsTranslated] = useState<boolean>(false);
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    const newContent = pageContentMap[pathname] || null;
    setOriginalContent(newContent);
    setIsTranslated(false);
    setTranslatedContent(null);
  }, [pathname]);

  const translate = useCallback(async (contentToTranslate: any, targetLanguage: string) => {
    if (!contentToTranslate) return;

    setIsLoading(true);
    setTranslatedContent(null);
    try {
      // The AI expects a string, so we stringify the JSON content.
      const contentString = JSON.stringify(contentToTranslate, null, 2);
      
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
  }, [toast]);

  const resetTranslation = useCallback(() => {
    setIsTranslated(false);
    setTranslatedContent(null);
  }, []);

  const pageContent = isTranslated ? translatedContent : originalContent;

  const value = {
    originalContent,
    translatedContent,
    pageContent,
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
