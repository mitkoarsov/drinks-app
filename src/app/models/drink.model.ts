/** Raw drink item from API */
export interface RawDrinkListItem {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

/** Simplified drink item for lists. */
export interface DrinkListItem {
  id: string;
  name: string;
  thumb: string;
  isAlcoholic: boolean;
}

/** Raw detailed drink information from API. */
export interface RawDrinkDetails {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

/** Simplified drink details for display. */
export interface DrinkDetails {
  id: string;
  name: string;
  alternate: string | null;
  tags: string[] | null;
  videoUrl: string | null;
  category: string;
  ibaCategory: string | null;
  alcoholic: boolean;
  glassType: string;
  instructionsByLang: Record<string, string>;
  thumb: string;
  ingredients: DrinkIngredient[];
}

/* Ingredient with optional measure */
export interface DrinkIngredient {
  name: string;
  measure: string | null;
}
