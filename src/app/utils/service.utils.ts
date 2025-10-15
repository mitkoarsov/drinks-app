import {
  DrinkDetails,
  DrinkIngredient,
  DrinkListItem,
  RawDrinkDetails,
  RawDrinkListItem,
} from '../models/drink.model';
import { IngredientDetails } from '../models/ingredient.model';

/* Extracts a simplified drink item representation */
export const extractDrinkItemData = (
  rawDrinkItem: RawDrinkListItem,
  isAlcoholic: boolean,
): DrinkListItem => ({
  id: rawDrinkItem.idDrink,
  name: rawDrinkItem.strDrink,
  thumb: rawDrinkItem.strDrinkThumb,
  isAlcoholic,
});

/** Extracts detailed information about a specific drink */
export const extractDrinkDetails = (rawDrinkData: RawDrinkDetails): DrinkDetails => ({
  id: rawDrinkData.idDrink,
  name: rawDrinkData.strDrink,
  alternate: rawDrinkData.strDrinkAlternate,
  tags: [],
  videoUrl: rawDrinkData.strVideo,
  category: rawDrinkData.strCategory,
  ibaCategory: rawDrinkData.strIBA,
  alcoholic: rawDrinkData.strAlcoholic === 'Alcoholic',
  glassType: rawDrinkData.strGlass,
  instructionsByLang: extractInstructionsByLang(rawDrinkData),
  thumb: rawDrinkData.strDrinkThumb,
  ingredients: extractIngredients(rawDrinkData),
});

/* Extracts instructions in various languages from raw drink data */
export const extractInstructionsByLang = (raw: Record<string, any>): Record<string, string> =>
  Object.entries(raw)
    .filter(([key, value]) => key.startsWith('strInstructions') && value)
    .reduce(
      (acc, [key, value]) => {
        const lang =
          key === 'strInstructions'
            ? 'en'
            : key.replace('strInstructions', '').replace(/[-_]/g, '').toLowerCase();
        acc[lang] = value as string;
        return acc;
      },
      {} as Record<string, string>,
    );

/* Extracts ingredients and their measures from raw drink data */
export const extractIngredients = (raw: Record<string, any>): DrinkIngredient[] => {
  const ingredients: DrinkIngredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({ name: ingredient, measure: measure ? measure.trim() : null });
    }
  }

  return ingredients;
};

/* Extracts detailed information about a specific ingredient */
export const extractIngredientDetails = (rawIngredient: any): IngredientDetails => ({
  id: rawIngredient.idIngredient,
  name: rawIngredient.strIngredient,
  description: rawIngredient.strDescription,
  type: rawIngredient.strType,
  isAlcoholic: rawIngredient.strAlcohol === 'Yes',
  abv: rawIngredient.strABV,
});
