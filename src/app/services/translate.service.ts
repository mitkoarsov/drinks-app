import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppStore } from '../state/app.store';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private language$ = new BehaviorSubject<string>('en');
  private translations: Record<string, any> = {};
  readonly translationsChanged$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.loadTranslations('en');
    // Sync with AppStore language
    const appStore = inject(AppStore);
    appStore.language$.subscribe((lang) => {
      if (lang !== this.language$.value) {
        this.setLanguage(lang);
      }
    });
  }

  setLanguage(lang: string) {
    if (lang !== this.language$.value) {
      this.language$.next(lang);
      this.loadTranslations(lang);
    }
  }

  getLanguage(): Observable<string> {
    return this.language$.asObservable();
  }

  private loadTranslations(lang: string) {
    this.http.get(`assets/i18n/${lang}.json`).subscribe((trans) => {
      this.translations = trans || {};
      this.translationsChanged$.next();
    });
  }

  translate(key: string, params?: Record<string, string | number>): string {
    // Support dot notation for nested keys
    let value: any = this.translations;
    for (const part of key.split('.')) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        value = key;
        break;
      }
    }
    if (params && typeof value === 'string') {
      Object.keys(params).forEach((param) => {
        value = value.replace(new RegExp('{' + param + '}', 'g'), String(params[param]));
      });
    }
    return value;
  }
}
