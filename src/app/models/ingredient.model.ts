export interface IngredientDetails {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
  isAlcoholic: boolean;
  abv: string | null;
}
