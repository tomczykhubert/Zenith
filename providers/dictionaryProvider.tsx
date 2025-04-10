"use client";
import {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/shared/elements/spinner";

type RecursiveRecord = {
  [key: string]: RecursiveRecord | string;
};

type DictionaryType = RecursiveRecord;
type TranslationKey = string;

interface DictionaryContextType {
  t: (key: TranslationKey) => string;
  dictionary: DictionaryType | null;
  isLoading: boolean;
}

interface DictionaryProviderProps {
  children: ReactNode;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

const loadTranslationFiles = async (locale: string) => {
  try {
    const translations = await import(`@/dictionaries/${locale}/index`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return {};
  }
};

export function DictionaryProvider({ children }: DictionaryProviderProps) {
  const [dictionary, setDictionary] = useState<DictionaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useParams().lang as string;

  useEffect(() => {
    const loadDictionary = async () => {
      if (!locale) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await loadTranslationFiles(locale);
        setDictionary(result);
      } catch (error) {
        console.error(`Failed to load dictionary for locale: ${locale}`, error);
        setDictionary(null);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadDictionary();
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey): string => {
      if (!dictionary) return key;

      const keys = key.split(".");
      let value: RecursiveRecord | string = dictionary;

      for (const k of keys) {
        if (typeof value === "string") return key;
        value = value[k];
        if (value === undefined) return key;
      }

      return typeof value === "string" ? value : key;
    },
    [dictionary]
  );

  const contextValue = {
    t,
    dictionary,
    isLoading,
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DictionaryContext.Provider value={contextValue}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }

  return context;
}
