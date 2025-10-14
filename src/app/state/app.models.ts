import { DrinkListItem } from '../models/drink.model';

export interface AppState {
  loading: boolean;
  isAdult: boolean | null;
  language: Language;
  sorting: SortingOption;
  page: number;
  alcoholicDrinks: DrinkListItem[];
  nonAlcoholicDrinks: DrinkListItem[];
  availableDrinks: DrinkListItem[];
  availableIdIngredients: string[];
  error?: string;
}

export type Language = 'en' | 'fr' | 'es' | 'de' | 'it';

export interface LanguageMeta {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

export type SortingOption = 'A-Z' | 'Z-A';
