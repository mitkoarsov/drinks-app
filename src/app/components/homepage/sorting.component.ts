import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { AppStore } from '../../state/app.store';
import { SortingOption } from '../../state/app.models';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 *  Allows users to select sorting options for the drink list.
 *  Updates the global store with the selected sorting option.
 */
@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="flex items-center gap-3 my-3 p-3 pr-0 rounded-xl w-fit">
      <label
        for="sorting-select"
        class="hidden md:inline-block text-sm font-semibold text-gray-700"
      >
        {{ 'homepage.sortBy' | translate }}
      </label>
      <select
        id="sorting-select"
        class="pr-8 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow border"
        [ngModel]="(sorting$ | async) ?? 'A-Z'"
        (ngModelChange)="setSorting($event)"
      >
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  `,
})
export class SortingComponent {
  private readonly store: AppStore = inject(AppStore);
  sorting$: Observable<SortingOption> = this.store.select((s) => s.sorting);

  setSorting(sorting: string) {
    this.store.setSorting(sorting);
    this.store.setPage(1);
  }
}
