import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { DrinkListItem } from '../../../../models/drink.model';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { DrinksService } from '../../../../services/drinks.service';

/**
 *  Search bar component with autocomplete functionality.
 *  Fetches and displays drink suggestions based on user input.
 *  Allows navigation to drink detail pages.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  private readonly router: Router = inject(Router);
  private readonly drinksService: DrinksService = inject(DrinksService);

  searchTerm: string = '';
  isLoading: boolean = false;
  showDropdown: boolean = false;
  highlightedIndex: number = -1;
  searchResults: DrinkListItem[] = [];

  private searchSubject: Subject<string> = new Subject<string>();

  /** Initializes the search functionality with debouncing and distinct checks. */
  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(325),
        distinctUntilChanged(),
        switchMap((term: string): Observable<DrinkListItem[]> => {
          if (!term.trim()) return of([]);
          this.isLoading = true;
          return this.drinksService.searchDrinksByName$(term);
        }),
      )
      .subscribe((results: DrinkListItem[]): void => {
        this.isLoading = false;
        this.searchResults = results.sort((a, b) => a.name.localeCompare(b.name));
        this.showDropdown = !!this.searchTerm && results.length > 0;
        this.highlightedIndex = -1;
      });
  }

  /** Handles input events on the search field. */
  onSearchInput(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;

    this.searchTerm = value;
    this.searchSubject.next(value);
    this.showDropdown = !!value;
  }

  /** Handles focus events on the search field. */
  onSearchFocus(): void {
    if (this.searchTerm.trim()) {
      this.searchSubject.next(this.searchTerm);
      this.showDropdown = true;
    }
  }

  /** Clears the current search results and hides the dropdown. */
  clearResults(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.showDropdown = false;
  }

  /** Navigates to the selected drink's detail page and clears the search. */
  goToDrink(drink: DrinkListItem): void {
    this.router.navigate(['/drink', drink.id]);
    this.searchTerm = '';
    this.clearResults();
  }

  /**
   *  Returns drink name with matched text wrapped in a span for highlighting.
   *  Escapes HTML to prevent XSS.
   */
  highlightMatch(name: string): string {
    if (!this.searchTerm) return this.escapeHtml(name);
    const term: string = this.escapeHtml(this.searchTerm.trim());

    if (!term) return this.escapeHtml(name);
    const regex: RegExp = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');

    return this.escapeHtml(name).replace(regex, '<span class="bg-yellow-200 rounded">$1</span>');
  }

  /** Escapes HTML special characters in a string. */
  escapeHtml(inputString: string): string {
    return inputString.replace(/[&<>"']/g, (character) => {
      switch (character) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return character;
      }
    });
  }

  /** Handles keyboard events for navigation within the search results. */
  onKeyDown(event: KeyboardEvent): void {
    if (!this.showDropdown || !this.searchResults.length) return;

    const { key, preventDefault } = event;

    if (key === 'ArrowDown') {
      this.highlightedIndex = (this.highlightedIndex + 1) % this.searchResults.length;
      preventDefault();
    } else if (key === 'ArrowUp') {
      this.highlightedIndex =
        (this.highlightedIndex + this.searchResults.length - 1) % this.searchResults.length;
      preventDefault();
    } else if (key === 'Enter' && this.highlightedIndex >= 0) {
      this.goToDrink(this.searchResults[this.highlightedIndex]);
      preventDefault();
    }
  }
}
