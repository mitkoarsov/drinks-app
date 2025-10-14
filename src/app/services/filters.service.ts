import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { API_BASE_URL } from '../constants';
import { RawAlcoholicFilter, RawCategory, RawGlass } from '../models/filters.model';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly getFiltersUrl = (filterName: string): string =>
    `${API_BASE_URL}/list.php?${filterName[0]}=list`;

  /** Fetches the list of drink categories. */
  getCategoryFilters$(): Observable<string[]> {
    return this.http.get<{ drinks: RawCategory[] }>(this.getFiltersUrl('categories')).pipe(
      map((result) => (result?.drinks ?? []).map(({ strCategory }: RawCategory) => strCategory)),
      shareReplay(1),
    );
  }

  /** Fetches the list of glass types. */
  getGlassFilters$(): Observable<string[]> {
    return this.http.get<{ drinks: RawGlass[] }>(this.getFiltersUrl('glasses')).pipe(
      map((result) => (result?.drinks ?? []).map(({ strGlass }: RawGlass) => strGlass)),
      shareReplay(1),
    );
  }

  /** Fetches the list of alcohol filters. */
  getAlcoholicFilters$(): Observable<string[]> {
    return this.http.get<{ drinks: RawAlcoholicFilter[] }>(this.getFiltersUrl('a')).pipe(
      map((result) =>
        (result?.drinks ?? []).map(({ strAlcoholic }: RawAlcoholicFilter) => strAlcoholic),
      ),
      shareReplay(1),
    );
  }
}
