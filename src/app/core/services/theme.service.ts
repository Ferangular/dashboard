import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;
  private document = inject(DOCUMENT);

  // Signal global para el modo oscuro
  readonly isDarkMode = signal(false);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'true');
      this.updateTheme();
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      this.updateTheme();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('darkMode', this.isDarkMode().toString());
    this.updateTheme();
  }

  updateTheme(): void {
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.documentElement, 'dark');
      this.updateSelectOptions(true);
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
      this.updateSelectOptions(false);
    }
  }

  private updateSelectOptions(isDark: boolean): void {
    setTimeout(() => {
      const select = this.document.querySelector('.header__language-select') as HTMLSelectElement;
      if (select) {
        const options = select.querySelectorAll('option');
        options.forEach((option) => {
          if (isDark) {
            // Modo oscuro: usa variables CSS del tema oscuro
            this.renderer.setStyle(option, 'background', '#0d1117');
            this.renderer.setStyle(option, 'color', '#f0f6fc');
            this.renderer.setStyle(option, 'font-weight', '600');
          } else {
            // Modo claro: usa variables CSS del tema claro
            this.renderer.setStyle(option, 'background', '#ffffff');
            this.renderer.setStyle(option, 'color', '#333333');
            this.renderer.setStyle(option, 'font-weight', '500');
          }
        });
      }
    }, 0);
  }

  // Método para que otros componentes escuchen cambios
  getCurrentTheme(): 'dark' | 'light' {
    return this.isDarkMode() ? 'dark' : 'light';
  }

  // Método para verificar si está en modo oscuro
  isDark(): boolean {
    return this.isDarkMode();
  }

  // Método para resetear el tema (útil para debugging)
  resetTheme(): void {
    localStorage.removeItem('darkMode');
    this.isDarkMode.set(false);
    this.updateTheme();
  }
}
