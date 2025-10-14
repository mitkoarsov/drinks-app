import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

import { API_BASE_URL } from '../constants';
import { IngredientDetails } from '../models/ingredient.model';
import { extractIngredientDetails } from '../utils/service.utils';
import { RawIngredient } from '../models/filters.model';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  private readonly http = inject(HttpClient);
  private readonly getFiltersUrl = (filterName: string): string =>
    `${API_BASE_URL}/list.php?${filterName[0]}=list`;
  private readonly getIngredientDetailsUrl = (id: string): string =>
    `${API_BASE_URL}/lookup.php?iid=${id}`;

  /** Fetches the list of ingredient names. */
  getIngredients$(): Observable<string[]> {
    return this.http.get<{ drinks: RawIngredient[] }>(this.getFiltersUrl('ingredients')).pipe(
      map((result) =>
        (result?.drinks ?? []).map(({ strIngredient1 }: RawIngredient) => strIngredient1),
      ),
      shareReplay(1),
    );
  }

  /** Fetches an ingredient by its ID. */
  getIngredientById$(id: string): Observable<IngredientDetails | null> {
    return this.http.get<{ ingredients: unknown[] }>(this.getIngredientDetailsUrl(id)).pipe(
      map((result) => {
        const rawDrinkData = (result?.ingredients?.[0] ?? {}) as Record<string, unknown>;

        return rawDrinkData ? extractIngredientDetails(rawDrinkData) : null;
      }),
    );
  }
}
