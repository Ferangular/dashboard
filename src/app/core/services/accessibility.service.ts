import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { ThemeService } from './theme.service';

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrastMode: 'normal' | 'high-dark' | 'high-light' | 'black-yellow' | 'yellow-black';
  lineHeight: 'normal' | 'wide' | 'extra-wide';
  letterSpacing: 'normal' | 'wide' | 'extra-wide';
  wordSpacing: 'normal' | 'wide' | 'extra-wide';
  highContrastFocus: boolean;
  underlineLinks: boolean;
  reduceAnimations: boolean;
  showSkipLinks: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private themeService = inject(ThemeService);
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;

  // Signals para estado de accesibilidad
  private settingsSignal = signal<AccessibilitySettings>({
    fontSize: 'medium',
    contrastMode: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    highContrastFocus: false,
    underlineLinks: false,
    reduceAnimations: false,
    showSkipLinks: true,
  });

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.loadSettings();
    this.applySettings();
  }

  // Signals públicos
  readonly settings = this.settingsSignal.asReadonly();
  readonly currentFontSize = computed(() => this.settingsSignal().fontSize);
  readonly currentContrast = computed(() => this.settingsSignal().contrastMode);
  readonly isHighContrastFocus = computed(() => this.settingsSignal().highContrastFocus);
  readonly shouldUnderlineLinks = computed(() => this.settingsSignal().underlineLinks);
  readonly shouldReduceAnimations = computed(() => this.settingsSignal().reduceAnimations);
  readonly shouldShowSkipLinks = computed(() => this.settingsSignal().showSkipLinks);

  // Métodos de configuración
  updateFontSize(size: AccessibilitySettings['fontSize']): void {
    this.settingsSignal.update((settings) => ({ ...settings, fontSize: size }));
    this.applyFontSize();
    this.saveSettings();
  }

  updateContrastMode(mode: AccessibilitySettings['contrastMode']): void {
    this.settingsSignal.update((settings) => ({ ...settings, contrastMode: mode }));
    this.applyContrast();
    this.saveSettings();
  }

  updateLineHeight(height: AccessibilitySettings['lineHeight']): void {
    this.settingsSignal.update((settings) => ({ ...settings, lineHeight: height }));
    this.applyLineHeight();
    this.saveSettings();
  }

  updateLetterSpacing(spacing: AccessibilitySettings['letterSpacing']): void {
    this.settingsSignal.update((settings) => ({ ...settings, letterSpacing: spacing }));
    this.applyLetterSpacing();
    this.saveSettings();
  }

  updateWordSpacing(spacing: AccessibilitySettings['wordSpacing']): void {
    this.settingsSignal.update((settings) => ({ ...settings, wordSpacing: spacing }));
    this.applyWordSpacing();
    this.saveSettings();
  }

  toggleHighContrastFocus(): void {
    this.settingsSignal.update((settings) => ({
      ...settings,
      highContrastFocus: !settings.highContrastFocus,
    }));
    this.applyFocusStyles();
    this.saveSettings();
  }

  toggleUnderlineLinks(): void {
    this.settingsSignal.update((settings) => ({
      ...settings,
      underlineLinks: !settings.underlineLinks,
    }));
    this.applyLinkStyles();
    this.saveSettings();
  }

  toggleReduceAnimations(): void {
    this.settingsSignal.update((settings) => ({
      ...settings,
      reduceAnimations: !settings.reduceAnimations,
    }));
    this.applyAnimationSettings();
    this.saveSettings();
  }

  toggleSkipLinks(): void {
    this.settingsSignal.update((settings) => ({
      ...settings,
      showSkipLinks: !settings.showSkipLinks,
    }));
    this.saveSettings();
  }

  // Getters para valores computados
  getFontSizePercentage(): number {
    const sizeMap: Record<AccessibilitySettings['fontSize'], number> = {
      small: 80,
      medium: 100,
      large: 120,
      'extra-large': 150,
    };
    const currentSize = this.settingsSignal().fontSize;
    const percentage = sizeMap[currentSize];
    console.log('getFontSizePercentage:', currentSize, '=>', percentage);
    return percentage;
  }

  // Reset de configuración
  resetSettings(): void {
    this.settingsSignal.set({
      fontSize: 'medium',
      contrastMode: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      wordSpacing: 'normal',
      highContrastFocus: false,
      underlineLinks: false,
      reduceAnimations: false,
      showSkipLinks: true,
    });
    this.applySettings();
    this.saveSettings();
  }

  // Métodos privados de aplicación
  private applySettings(): void {
    this.applyFontSize();
    this.applyContrast();
    this.applyLineHeight();
    this.applyLetterSpacing();
    this.applyWordSpacing();
    this.applyFocusStyles();
    this.applyLinkStyles();
    this.applyAnimationSettings();
  }

  private applyFontSize(): void {
    const root = this.document.documentElement;
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px',
    };
    const currentSize = this.settingsSignal().fontSize;
    const fontSizeValue = fontSizes[currentSize];

    console.log('Applying font size:', currentSize, '=>', fontSizeValue);
    root.style.setProperty('--base-font-size', fontSizeValue);

    // También aplicarlo directamente al body para asegurar que funcione
    this.document.body.style.fontSize = fontSizeValue;
  }

  private applyContrast(): void {
    const body = this.document.body;
    const contrastMode = this.settingsSignal().contrastMode;

    // Limpiar clases de contraste existentes
    this.renderer.removeClass(body, 'contrast-high-dark');
    this.renderer.removeClass(body, 'contrast-high-light');
    this.renderer.removeClass(body, 'contrast-black-yellow');
    this.renderer.removeClass(body, 'contrast-yellow-black');

    // Aplicar nueva clase de contraste
    if (contrastMode !== 'normal') {
      this.renderer.addClass(body, `contrast-${contrastMode}`);
    }

    // Sincronizar con tema oscuro/claro si es necesario
    if (contrastMode === 'high-dark' || contrastMode === 'black-yellow') {
      this.themeService.isDarkMode.set(true);
      this.themeService.updateTheme();
    } else if (contrastMode === 'high-light' || contrastMode === 'yellow-black') {
      this.themeService.isDarkMode.set(false);
      this.themeService.updateTheme();
    }
  }

  private applyLineHeight(): void {
    const root = this.document.documentElement;
    const lineHeights = {
      normal: '1.5',
      wide: '1.75',
      'extra-wide': '2',
    };
    root.style.setProperty('--line-height-base', lineHeights[this.settingsSignal().lineHeight]);
  }

  private applyLetterSpacing(): void {
    const root = this.document.documentElement;
    const letterSpacings = {
      normal: '0',
      wide: '0.05em',
      'extra-wide': '0.1em',
    };
    root.style.setProperty(
      '--letter-spacing-base',
      letterSpacings[this.settingsSignal().letterSpacing],
    );
  }

  private applyWordSpacing(): void {
    const root = this.document.documentElement;
    const wordSpacings = {
      normal: '0',
      wide: '0.1em',
      'extra-wide': '0.2em',
    };
    root.style.setProperty('--word-spacing-base', wordSpacings[this.settingsSignal().wordSpacing]);
  }

  private applyFocusStyles(): void {
    const body = this.document.body;
    if (this.settingsSignal().highContrastFocus) {
      this.renderer.addClass(body, 'high-contrast-focus');
    } else {
      this.renderer.removeClass(body, 'high-contrast-focus');
    }
  }

  private applyLinkStyles(): void {
    const body = this.document.body;
    if (this.settingsSignal().underlineLinks) {
      this.renderer.addClass(body, 'underline-links');
    } else {
      this.renderer.removeClass(body, 'underline-links');
    }
  }

  private applyAnimationSettings(): void {
    const root = this.document.documentElement;
    if (this.settingsSignal().reduceAnimations) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0.1s');
      this.renderer.addClass(this.document.body, 'reduce-animations');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
      this.renderer.removeClass(this.document.body, 'reduce-animations');
    }
  }

  // Persistencia
  private saveSettings(): void {
    localStorage.setItem('accessibility-settings', JSON.stringify(this.settingsSignal()));
  }

  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.settingsSignal.set({ ...this.settingsSignal(), ...settings });
      }
    } catch (error) {
      console.warn('Error loading accessibility settings:', error);
    }
  }

  // Utilidades
  getContrastLabel(): string {
    const labels = {
      normal: 'Normal',
      'high-dark': 'Alto Contraste Oscuro',
      'high-light': 'Alto Contraste Claro',
      'black-yellow': 'Negro sobre Amarillo',
      'yellow-black': 'Amarillo sobre Negro',
    };
    return labels[this.settingsSignal().contrastMode];
  }
}
