import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations = signal<Translation>({});
  private currentLanguage = signal('es');
  private defaultLanguage = 'es';
  private http = inject(HttpClient);

  constructor() {
    this.loadLanguage(this.defaultLanguage);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage();
  }

  setLanguage(languageCode: string): void {
    if (languageCode !== this.currentLanguage()) {
      this.loadLanguage(languageCode);
    }
  }

  private loadLanguage(languageCode: string): void {
    this.http
      .get<Translation>(`/assets/i18n/${languageCode}.json`)
      .pipe(
        catchError((error) => {
          console.error(`Error loading language ${languageCode}:`, error);
          if (languageCode !== this.defaultLanguage) {
            return this.http.get<Translation>(`/assets/i18n/${this.defaultLanguage}.json`);
          }
          return of({});
        }),
      )
      .subscribe((translations) => {
        this.translations.set(translations);
        this.currentLanguage.set(languageCode);
      });
  }

  translate(key: string, params?: Record<string, string>): string {
    const translation = this.getNestedValue(this.translations(), key);

    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    if (params) {
      return this.interpolate(translation, params);
    }

    return translation;
  }

  private getNestedValue(obj: Translation, path: string): string {
    const result = path.split('.').reduce((current: Translation | string, key) => {
      return current && typeof current === 'object' ? current[key] : '';
    }, obj);

    return typeof result === 'string' ? result : '';
  }

  private interpolate(template: string, params: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] || match;
    });
  }

  getAvailableLanguages(): { code: string; name: string; flag: string }[] {
    return [
      { code: 'es', name: 'ES', flag: '🇪🇸' },
      { code: 'en', name: 'EN', flag: '🇬🇧' },
    ];
  }
}
