import { useDictionary } from "@/providers/dictionaryProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useMapEnumToSelect = (
  enumObj: { [key: string]: string },
  translationPrefix: string
) => {
  const { t } = useDictionary();

  const mapped = Object.values(enumObj).map((value: string) => ({
    value,
    label: t(getEnumTranslationKey(value, translationPrefix)),
  }));
  return mapped;
};

export const getEnumTranslationKey = (
  value: string,
  translationPrefix: string
) => {
  const transform = (value: string) => {
    const words = value.split("_");
    return words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  return `${translationPrefix}.${transform(value)}`;
};
