import { AppState } from './app.models';

export const initialAppState: AppState = {
  loading: false,
  isAdult: null,
  language: 'en',
  sorting: 'A-Z',
  page: 1,
  alcoholicDrinks: [],
  nonAlcoholicDrinks: [],
  availableDrinks: [],
  availableIdIngredients: [],
};
