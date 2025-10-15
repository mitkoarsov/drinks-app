import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AppStore } from '../../state/app.store';
import { SortingOption } from '../../state/app.models';
import { DrinkListItem } from '../../models/drink.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

import { CardComponent } from '../../components/homepage/card.component';
import { SortingComponent } from '../../components/homepage/sorting.component';
import { PaginationComponent } from '../../components/homepage/pagination.component';

/** Homepage component displaying a list of drinks with sorting and pagination. */
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    SortingComponent,
    CardComponent,
    PaginationComponent,
    TranslatePipe,
  ],
  template: `
    <div class="max-w-7xl mx-auto px-2 sm:px-6">
      <div class="flex items-center justify-between mx-4 my-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mr-4 whitespace-nowrap select-none">
          {{ 'homepage.title' | translate }}
        </h2>
        <app-sorting></app-sorting>
      </div>
      @let drinks = availableDrinks$ | async;
      @let page = page$ | async;
      @if (drinks && !!page) {
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mx-4 min-h-[300px]"
        >
          @for (drink of getPagedDrinks(drinks, page!); let i = $index; track drink.id) {
            <app-card
              [id]="drink.id"
              [name]="drink.name"
              [image]="drink.thumb + '/small'"
              [isAlcoholic]="drink.isAlcoholic"
              [loading]="i === 0 ? 'eager' : 'lazy'"
            ></app-card>
          }
        </div>
        @if (drinks.length > pageSize) {
          <app-pagination
            [page]="page!"
            [pageSize]="pageSize"
            [total]="drinks.length"
            (pageChange)="setPage($event)"
            class="mt-8"
          ></app-pagination>
        }
      }
    </div>
  `,
})
export class HomepageComponent {
  private readonly store: AppStore = inject(AppStore);
  readonly page$: Observable<number> = this.store.page$;
  readonly sorting$: Observable<SortingOption> = this.store.select((s) => s.sorting);
  readonly availableDrinks$: Observable<DrinkListItem[]> = this.store.availableDrinks$;
  readonly pageSize: number = 12;

  constructor() {
    this.store.loadDrinksIfEmpty();
  }

  setPage(page: number): void {
    this.store.setPage(page);
  }

  getPagedDrinks(drinks: DrinkListItem[] | null | undefined, page: number): DrinkListItem[] {
    if (!drinks) return [];
    const start: number = (page - 1) * this.pageSize;
    return drinks.slice(start, start + this.pageSize);
  }
}
