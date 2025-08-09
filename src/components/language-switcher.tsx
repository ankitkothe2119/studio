'use client';
/**
 * @fileoverview This component provides the UI for translating the website's content.
 * It uses the TranslationContext to trigger translations and displays the current state.
 */

import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/context/translation-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const supportedLanguages = [
  { code: 'Hindi', name: 'Hindi' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Mandarin Chinese', name: 'Chinese' },
  { code: 'Arabic', name: 'Arabic' },
];

/**
 * A UI component that allows users to select a language and translate the page.
 * @returns {JSX.Element} The rendered language switcher component.
 */
export function LanguageSwitcher(): JSX.Element {
  const { translate, isLoading, isTranslated, resetTranslation, pageContent } = useTranslation();
  const [targetLanguage, setTargetLanguage] = useState(supportedLanguages[0].code);

  const handleTranslate = () => {
    if (pageContent) {
        translate(pageContent, targetLanguage);
    }
  };

  if (isTranslated) {
    return (
      <Button onClick={resetTranslation} variant="outline" size="sm" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
        Show Original
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage}>
        <SelectTrigger className="w-auto md:w-[120px] h-9 text-sm">
           <Languages className="h-4 w-4 mr-1 hidden md:inline-block"/>
           <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleTranslate}
        disabled={isLoading}
        size="sm"
        variant="default"
        className="transition-all duration-300"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>
    </div>
  );
}
