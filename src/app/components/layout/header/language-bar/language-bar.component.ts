import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AppStore } from '../../../../state/app.store';
import { Language, LanguageMeta, LANGUAGES } from '../../../../state/app.models';

/**
 *  Language selection dropdown.
 *  Displays current language and allows switching between available languages.
 */
@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-bar.component.html',
})
export class LanguageBarComponent {
  private readonly store: AppStore = inject(AppStore);
  readonly languages: LanguageMeta[] = LANGUAGES;
  readonly selectedLanguage$: Observable<Language> = this.store.language$;

  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  selectLanguage(language: Language): void {
    this.store.setLanguage(language);
    this.closeDropdown();
  }

  getLangMeta(code: string | null): LanguageMeta | undefined {
    return this.languages.find((language) => language.code === code);
  }
}
