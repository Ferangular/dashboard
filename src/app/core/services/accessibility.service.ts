import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { ThemeService } from './theme.service';

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrastMode:
    | 'normal'
    | 'high-dark'
    | 'high-light'
    | 'black-yellow'
    | 'yellow-black'
    | 'white-blue'
    | 'blue-white'
    | 'green-black'
    | 'black-green'
    | 'black-cyan'
    | 'cyan-black'
    | 'purple-white'
    | 'white-purple'
    | 'orange-black'
    | 'black-orange'
    | 'magenta-black'
    | 'black-magenta';
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
    console.log('updateContrastMode called with:', mode);
    this.settingsSignal.update((settings) => ({ ...settings, contrastMode: mode }));
    console.log('Settings updated, current contrast mode:', this.settingsSignal().contrastMode);
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

    console.log('applyContrast called with mode:', contrastMode);
    console.log('Body classes before:', body.className);

    // Limpiar TODAS las clases de contraste existentes
    const contrastClasses = [
      'contrast-high-dark',
      'contrast-high-light',
      'contrast-black-yellow',
      'contrast-yellow-black',
      'contrast-high',
      'contrast-dark',
    ];

    contrastClasses.forEach((className) => {
      this.renderer.removeClass(body, className);
    });

    // Aplicar nueva clase de contraste
    if (contrastMode !== 'normal') {
      const className = `contrast-${contrastMode}`;
      console.log('Adding class:', className);
      this.renderer.addClass(body, className);

      // Forzar actualización de variables CSS
      this.forceContrastUpdate(contrastMode);
    } else {
      // Limpiar variables CSS cuando es modo normal
      this.clearContrastVariables();
      console.log('Cleared contrast variables for normal mode');
    }

    console.log('Body classes after:', body.className);

    // Sincronizar con tema oscuro/claro si es necesario
    if (contrastMode === 'high-dark' || contrastMode === 'black-yellow') {
      this.themeService.isDarkMode.set(true);
      this.themeService.updateTheme();
    } else if (contrastMode === 'high-light' || contrastMode === 'yellow-black') {
      this.themeService.isDarkMode.set(false);
      this.themeService.updateTheme();
    }
  }

  // Método auxiliar para forzar actualización de contraste
  private forceContrastUpdate(mode: AccessibilitySettings['contrastMode']): void {
    const root = this.document.documentElement;

    // Aplicar variables CSS directamente como fallback
    const contrastSettings: Record<
      AccessibilitySettings['contrastMode'],
      Record<string, string>
    > = {
      normal: {
        '--bg-primary': '',
        '--text-primary': '',
        '--bg-secondary': '',
        '--text-secondary': '',
      },
      'high-dark': {
        '--bg-primary': '#000000',
        '--text-primary': '#ffffff',
        '--bg-secondary': '#1a1a1a',
        '--text-secondary': '#e0e0e0',
      },
      'high-light': {
        '--bg-primary': '#ffffff',
        '--text-primary': '#000000',
        '--bg-secondary': '#f5f5f5',
        '--text-secondary': '#333333',
      },
      'black-yellow': {
        '--bg-primary': '#000000',
        '--text-primary': '#ffff00',
        '--bg-secondary': '#1a1a1a',
        '--text-secondary': '#ffff99',
      },
      'yellow-black': {
        '--bg-primary': '#ffff00',
        '--text-primary': '#000000',
        '--bg-secondary': '#ffff99',
        '--text-secondary': '#333333',
      },
      'white-blue': {
        '--bg-primary': '#ffffff',
        '--text-primary': '#003366',
        '--bg-secondary': '#f8f9fa',
        '--text-secondary': '#004080',
      },
      'blue-white': {
        '--bg-primary': '#003366',
        '--text-primary': '#ffffff',
        '--bg-secondary': '#002244',
        '--text-secondary': '#f0f0f0',
      },
      'green-black': {
        '--bg-primary': '#006600',
        '--text-primary': '#ffffff',
        '--bg-secondary': '#004d00',
        '--text-secondary': '#f0fff0',
      },
      'black-green': {
        '--bg-primary': '#000000',
        '--text-primary': '#00ff00',
        '--bg-secondary': '#1a1a00',
        '--text-secondary': '#66ff66',
      },
      'black-cyan': {
        '--bg-primary': '#000000',
        '--text-primary': '#00ffff',
        '--bg-secondary': '#001a1a',
        '--text-secondary': '#66ffff',
      },
      'cyan-black': {
        '--bg-primary': '#00ffff',
        '--text-primary': '#000000',
        '--bg-secondary': '#66ffff',
        '--text-secondary': '#333333',
      },
      'purple-white': {
        '--bg-primary': '#4b0082',
        '--text-primary': '#ffffff',
        '--bg-secondary': '#37006b',
        '--text-secondary': '#f0f0f0',
      },
      'white-purple': {
        '--bg-primary': '#ffffff',
        '--text-primary': '#4b0082',
        '--bg-secondary': '#f8f0ff',
        '--text-secondary': '#37006b',
      },
      'orange-black': {
        '--bg-primary': '#ff8c00',
        '--text-primary': '#000000',
        '--bg-secondary': '#cc7000',
        '--text-secondary': '#333333',
      },
      'black-orange': {
        '--bg-primary': '#000000',
        '--text-primary': '#ff8c00',
        '--bg-secondary': '#1a0a00',
        '--text-secondary': '#ffaa00',
      },
      'magenta-black': {
        '--bg-primary': '#ff00ff',
        '--text-primary': '#000000',
        '--bg-secondary': '#cc00cc',
        '--text-secondary': '#333333',
      },
      'black-magenta': {
        '--bg-primary': '#000000',
        '--text-primary': '#ff00ff',
        '--bg-secondary': '#1a001a',
        '--text-secondary': '#ff66ff',
      },
    };

    const settings = contrastSettings[mode];
    if (settings && mode !== 'normal') {
      Object.entries(settings).forEach(([property, value]) => {
        if (value) {
          // Solo aplicar si el valor no está vacío
          root.style.setProperty(property, value);
          console.log(`Set CSS variable: ${property} = ${value}`);
        }
      });
    }
  }

  // Método para limpiar variables CSS de contraste
  private clearContrastVariables(): void {
    const root = this.document.documentElement;
    const variablesToClear = [
      '--bg-primary',
      '--text-primary',
      '--bg-secondary',
      '--text-secondary',
    ];

    variablesToClear.forEach((variable) => {
      root.style.removeProperty(variable);
      console.log(`Cleared CSS variable: ${variable}`);
    });
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
    const isEnabled = this.settingsSignal().highContrastFocus;

    console.log('applyFocusStyles called, highContrastFocus:', isEnabled);
    console.log('Body classes before:', body.className);

    if (isEnabled) {
      this.renderer.addClass(body, 'high-contrast-focus');
      console.log('Added high-contrast-focus class');
    } else {
      this.renderer.removeClass(body, 'high-contrast-focus');
      console.log('Removed high-contrast-focus class');
    }

    console.log('Body classes after:', body.className);
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
      'white-blue': 'Blanco sobre Azul (WCAG)',
      'blue-white': 'Azul sobre Blanco (WCAG)',
      'green-black': 'Verde sobre Negro (WCAG)',
      'black-green': 'Negro sobre Verde (WCAG)',
      'black-cyan': 'Negro sobre Cian (WCAG)',
      'cyan-black': 'Cian sobre Negro (WCAG)',
      'purple-white': 'Púrpura sobre Blanco (WCAG)',
      'white-purple': 'Blanco sobre Púrpura (WCAG)',
      'orange-black': 'Naranja sobre Negro (WCAG)',
      'black-orange': 'Negro sobre Naranja (WCAG)',
      'magenta-black': 'Magenta sobre Negro (WCAG)',
      'black-magenta': 'Negro sobre Magenta (WCAG)',
    };
    return labels[this.settingsSignal().contrastMode];
  }
}
