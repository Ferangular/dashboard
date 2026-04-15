import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-accessibility-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility-widget.component.html',
  styleUrls: ['./accessibility-widget.component.scss'],
})
export class AccessibilityWidgetComponent implements OnInit {
  // Signals para el estado del panel
  private isOpenSignal = signal(false);
  private currentFontSizeSignal = signal(100);
  private contrastModeSignal = signal<'normal' | 'high' | 'dark'>('normal');
  private lineSpacingSignal = signal<'normal' | 'wide' | 'extra-wide'>('normal');
  private highContrastFocusSignal = signal(false);

  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  // Getters públicos
  isOpen = this.isOpenSignal.asReadonly();
  currentFontSize = this.currentFontSizeSignal.asReadonly();
  contrastMode = this.contrastModeSignal.asReadonly();
  lineSpacing = this.lineSpacingSignal.asReadonly();
  highContrastFocus = this.highContrastFocusSignal.asReadonly();

  // Computed properties para clases CSS específicas del widget
  fontSizeClass = computed(() => `font-size-${this.currentFontSizeSignal()}`);
  contrastClass = computed(() => {
    const mode = this.contrastModeSignal();
    return mode === 'normal' ? '' : `accessibility-contrast-${mode}`;
  });
  spacingClass = computed(() => `spacing-${this.lineSpacingSignal()}`);
  focusClass = computed(() => (this.highContrastFocusSignal() ? 'high-contrast-focus' : ''));

  ngOnInit(): void {
    // Cargar preferencias guardadas al iniciar
    this.loadPreferences();
    // Aplicar clases iniciales al body
    this.applyAccessibilityClasses();
  }

  // Control del panel
  togglePanel(): void {
    this.isOpenSignal.set(!this.isOpenSignal());
    if (this.isOpenSignal()) {
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.removeAttribute('aria-hidden');
    }
  }

  closePanel(): void {
    this.isOpenSignal.set(false);
    document.body.removeAttribute('aria-hidden');
  }

  // Control del tamaño de fuente
  increaseFontSize(): void {
    const newSize = Math.min(this.currentFontSizeSignal() + 10, 150);
    this.currentFontSizeSignal.set(newSize);
    this.updateFontSize();
    this.savePreferences();
  }

  decreaseFontSize(): void {
    const newSize = Math.max(this.currentFontSizeSignal() - 10, 80);
    this.currentFontSizeSignal.set(newSize);
    this.updateFontSize();
    this.savePreferences();
  }

  // Control del contraste
  setContrastMode(mode: 'normal' | 'high' | 'dark'): void {
    this.contrastModeSignal.set(mode);
    this.updateContrast();
    this.savePreferences();
  }

  // Control del espaciado
  setLineSpacing(spacing: 'normal' | 'wide' | 'extra-wide'): void {
    this.lineSpacingSignal.set(spacing);
    this.updateLineSpacing();
    this.savePreferences();
  }

  // Control del foco
  toggleHighContrastFocus(): void {
    this.highContrastFocusSignal.set(!this.highContrastFocusSignal());
    this.updateFocusStyle();
    this.savePreferences();
  }

  // Reset de configuración
  resetSettings(): void {
    this.currentFontSizeSignal.set(100);
    this.contrastModeSignal.set('normal');
    this.lineSpacingSignal.set('normal');
    this.highContrastFocusSignal.set(false);

    this.updateFontSize();
    this.updateContrast();
    this.updateLineSpacing();
    this.updateFocusStyle();

    this.savePreferences();
  }

  // Métodos privados para aplicar estilos
  private updateFontSize(): void {
    const root = document.documentElement;
    root.style.setProperty('--font-size-multiplier', `${this.currentFontSizeSignal() / 100}`);
    this.applyAccessibilityClasses();
  }

  private updateContrast(): void {
    this.applyAccessibilityClasses();
  }

  private updateLineSpacing(): void {
    const root = document.documentElement;
    const spacingMap = {
      normal: '1.5',
      wide: '1.75',
      'extra-wide': '2',
    };
    root.style.setProperty('--line-height-multiplier', spacingMap[this.lineSpacingSignal()]);
    this.applyAccessibilityClasses();
  }

  private updateFocusStyle(): void {
    this.applyAccessibilityClasses();
  }

  private applyAccessibilityClasses(): void {
    const body = document.body;
    const classes = [
      this.fontSizeClass(),
      this.contrastClass(),
      this.spacingClass(),
      this.focusClass(),
    ].filter(Boolean);

    // Limpiar solo clases de accesibilidad, no tocar clases del tema
    body.className = body.className.replace(
      /font-size-\d+|accessibility-contrast-\w+|spacing-\w+|high-contrast-focus/g,
      '',
    );

    // Aplicar nuevas clases de accesibilidad
    body.classList.add(...classes);
  }

  // Guardar y cargar preferencias
  private savePreferences(): void {
    const preferences = {
      fontSize: this.currentFontSizeSignal(),
      contrastMode: this.contrastModeSignal(),
      lineSpacing: this.lineSpacingSignal(),
      highContrastFocus: this.highContrastFocusSignal(),
    };
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }

  private loadPreferences(): void {
    try {
      const saved = localStorage.getItem('accessibility-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        this.currentFontSizeSignal.set(preferences.fontSize || 100);
        this.contrastModeSignal.set(preferences.contrastMode || 'normal');
        this.lineSpacingSignal.set(preferences.lineSpacing || 'normal');
        this.highContrastFocusSignal.set(preferences.highContrastFocus || false);
      }
    } catch (error) {
      console.warn('Error loading accessibility preferences:', error);
    }
  }

  // Cerrar panel con Escape
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpenSignal()) {
      this.closePanel();
    }
  }

  // Cerrar panel al hacer clic fuera
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (this.isOpenSignal()) {
      const target = event.target as HTMLElement;
      if (!target.closest('.accessibility-widget')) {
        this.closePanel();
      }
    }
  }
}
