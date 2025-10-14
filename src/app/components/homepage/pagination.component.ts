import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 *  Navigates through pages of items.
 *  Displays current range of items and total count.
 *  Emits pageChange event when navigating to previous or next page.
 */
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    @if (pageCount > 1) {
      <div class="flex flex-col items-center gap-4 mt-8 select-none">
        <div class="text-xs text-gray-500">
          {{ 'pagination.showing' | translate }}
          <span class="font-semibold">{{ range.from }}</span
          >–<span class="font-semibold">{{ range.to }}</span>
          {{ 'pagination.of' | translate }}
          <span class="font-semibold">{{ total }}</span>
          {{ 'pagination.drinks' | translate }}
        </div>
        <div class="flex items-center justify-center gap-4">
          <button
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            (click)="goToPrev()"
            [disabled]="page === 1"
          >
            {{ 'pagination.back' | translate }}
          </button>
          <span class="text-sm text-gray-600">
            {{ 'pagination.page' | translate }} <span class="font-bold">{{ page }}</span>
            {{ 'pagination.of' | translate }}
            <span class="font-bold">{{ pageCount }}</span>
          </span>
          <button
            class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            (click)="goToNext()"
            [disabled]="page === pageCount"
          >
            {{ 'pagination.next' | translate }}
          </button>
        </div>
      </div>
    }
  `,
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() pageSize = 12;
  @Input() total = 0;

  @Output() pageChange = new EventEmitter<number>();

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get range() {
    if (this.total === 0) return { from: 0, to: 0 };
    const from = (this.page - 1) * this.pageSize + 1;
    const to = Math.min(this.page * this.pageSize, this.total);
    return { from, to };
  }

  goToPrev() {
    if (this.page > 1) this.pageChange.emit(this.page - 1);
  }

  goToNext() {
    if (this.page < this.pageCount) this.pageChange.emit(this.page + 1);
  }
}
