import el from './translations/el.json';
import en from './translations/en.json';

export const translations = {
    el,
    en
} as const;

export type TranslationKey = keyof typeof translations.el;
