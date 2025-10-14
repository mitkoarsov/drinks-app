import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { AppState, Language } from './app.models';
import { initialAppState } from './app.initial-state';
import { DrinkListItem } from '../models/drink.model';
import { DrinksService } from '../services/drinks.service';

@Injectable({ providedIn: 'root' })
export class AppStore extends ComponentStore<AppState> {
  private readonly drinksService = inject(DrinksService);

  constructor() {
    super(initialAppState);
  }

  // ----------- SELECTORS -----------
  readonly loading$: Observable<boolean> = this.select(({ loading }) => loading);
  readonly isAdult$: Observable<boolean | null> = this.select(({ isAdult }) => isAdult);
  readonly language$: Observable<Language> = this.select(({ language }) => language);
  readonly page$: Observable<number> = this.select(({ page }) => page);
  readonly availableDrinks$: Observable<DrinkListItem[]> = this.select(
    ({ availableDrinks }) => availableDrinks,
  );

  // ----------- UPDATERS -----------
  readonly setPage = this.updater<number>((state, page) => ({
    ...state,
    page: page > 0 ? page : 1,
  }));

  readonly setLanguage = this.updater<Language>((state, language) => ({
    ...state,
    language,
  }));

  readonly setAdult = this.updater<boolean>((state, isAdult) => {
    const availableDrinks = isAdult
      ? [...state.alcoholicDrinks, ...state.nonAlcoholicDrinks]
      : [...state.nonAlcoholicDrinks];
    return { ...state, isAdult, availableDrinks };
  });

  readonly setSorting = this.updater<string>((state, sorting) => ({
    ...state,
    sorting: sorting === 'A-Z' ? 'A-Z' : 'Z-A',
    availableDrinks: this.sortDrinks(state.availableDrinks, sorting),
  }));

  // ----------- EFFECTS -----------
  readonly loadDrinksIfEmpty = this.effect<void>((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.select((s) => s.availableDrinks)),
      filter(([_, availableDrinks]) => !availableDrinks || availableDrinks.length === 0),
      switchMap(() =>
        combineLatest([
          this.select((s) => s.isAdult),
          this.drinksService.getAlcoholicDrinks$(),
          this.drinksService.getNonAlcoholicDrinks$(),
        ]).pipe(
          take(1),
          tap(([isAdult, alcoholic, nonAlcoholic]) => {
            const drinks = this.aggregateDrinks(isAdult, alcoholic, nonAlcoholic);
            const sorted = this.sortDrinks(drinks, this.get().sorting ?? 'A-Z');
            this.patchState({
              alcoholicDrinks: alcoholic,
              nonAlcoholicDrinks: nonAlcoholic,
              availableDrinks: sorted,
            });
          }),
        ),
      ),
    ),
  );

  // ----------- HELPERS -----------
  private sortDrinks(drinks: DrinkListItem[], sorting: string): DrinkListItem[] {
    return [...drinks].sort((a, b) =>
      sorting === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }

  private aggregateDrinks(
    isAdult: boolean | null,
    alcoholic: DrinkListItem[],
    nonAlcoholic: DrinkListItem[],
  ): DrinkListItem[] {
    if (isAdult === null) return [];
    return isAdult ? [...alcoholic, ...nonAlcoholic] : [...nonAlcoholic];
  }
}
