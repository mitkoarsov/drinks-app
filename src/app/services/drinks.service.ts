import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';

import {
  DrinkDetails,
  DrinkListItem,
  RawDrinkDetails,
  RawDrinkListItem,
} from '../models/drink.model';
import { API_BASE_URL } from '../constants';
import { extractDrinkDetails, extractDrinkItemData } from '../utils/service.utils';

@Injectable({ providedIn: 'root' })
export class DrinksService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly alcoholicUrl: string = `${API_BASE_URL}/filter.php?a=Alcoholic`;
  private readonly nonAlcoholicUrl: string = `${API_BASE_URL}/filter.php?a=Non_Alcoholic`;
  private readonly getDrinkDetailsUrl = (id: string): string =>
    `${API_BASE_URL}/lookup.php?i=${id}`;
  private readonly getSearchDrinkUrl = (name: string): string =>
    `${API_BASE_URL}/search.php?s=${name}`;

  /** Fetches the list of alcoholic drinks. */
  getAlcoholicDrinks$(): Observable<DrinkListItem[]> {
    return this.http.get<{ drinks: RawDrinkListItem[] }>(this.alcoholicUrl).pipe(
      map((result) =>
        (result?.drinks ?? []).map((rawAlcoholDrink: RawDrinkListItem) =>
          extractDrinkItemData(rawAlcoholDrink),
        ),
      ),
      shareReplay(1),
    );
  }

  /** Fetches the list of non-alcoholic drinks. */
  getNonAlcoholicDrinks$(): Observable<DrinkListItem[]> {
    return this.http.get<{ drinks: RawDrinkListItem[] }>(this.nonAlcoholicUrl).pipe(
      map((result) =>
        (result?.drinks ?? []).map((rawNonAlcoholicDrink: RawDrinkListItem) =>
          extractDrinkItemData(rawNonAlcoholicDrink),
        ),
      ),
      shareReplay(1),
    );
  }

  /** Fetches a drink by its ID. */
  getDrinkById$(id: string): Observable<DrinkDetails | null> {
    return this.http.get<{ drinks: RawDrinkListItem[] }>(this.getDrinkDetailsUrl(id)).pipe(
      map((result) => {
        const rawDrinkDetails = (result?.drinks?.[0] ?? {}) as RawDrinkDetails;

        return rawDrinkDetails ? extractDrinkDetails(rawDrinkDetails) : null;
      }),
    );
  }

  /** Searches for drinks by name. */
  searchDrinksByName$(name: string): Observable<DrinkListItem[]> {
    return this.http
      .get<{ drinks: RawDrinkListItem[] }>(this.getSearchDrinkUrl(name))
      .pipe(
        map((result) =>
          (result?.drinks ?? []).map((rawDrinkItem: RawDrinkListItem) =>
            extractDrinkItemData(rawDrinkItem),
          ),
        ),
      );
  }
}
