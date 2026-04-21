import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';
import {
  AccessibilityService,
  AccessibilitySettings,
} from '../../core/services/accessibility.service';
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
  private showDocumentationNavSignal = signal(false);

  private accessibilityService = inject(AccessibilityService);
  private themeService = inject(ThemeService);
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // Getters públicos usando el servicio
  isOpen = this.isOpenSignal.asReadonly();
  settings = this.accessibilityService.settings;
  currentFontSize = this.accessibilityService.currentFontSize;
  currentContrast = this.accessibilityService.currentContrast;
  isHighContrastFocus = this.accessibilityService.isHighContrastFocus;
  shouldUnderlineLinks = this.accessibilityService.shouldUnderlineLinks;
  shouldReduceAnimations = this.accessibilityService.shouldReduceAnimations;
  shouldShowSkipLinks = this.accessibilityService.shouldShowSkipLinks;
  isDarkMode = this.themeService.isDarkMode;

  // Propiedades adicionales para compatibilidad con template
  lineSpacing = computed(() => this.settings().lineHeight);
  highContrastFocus = this.isHighContrastFocus;
  contrastMode = computed(() => {
    // Mapear nuevos valores a valores antiguos para compatibilidad con template
    const current = this.currentContrast();
    const reverseMap: Record<AccessibilitySettings['contrastMode'], string> = {
      normal: 'normal',
      'high-dark': 'high',
      'high-light': 'dark',
      'black-yellow': 'high-dark',
      'yellow-black': 'high-light',
      'white-blue': 'white-blue',
      'blue-white': 'blue-white',
      'green-black': 'green-black',
      'black-green': 'black-green',
      'black-cyan': 'black-cyan',
      'cyan-black': 'cyan-black',
      'purple-white': 'purple-white',
      'white-purple': 'white-purple',
      'orange-black': 'orange-black',
      'black-orange': 'black-orange',
      'magenta-black': 'magenta-black',
      'black-magenta': 'black-magenta',
    };
    return reverseMap[current] || 'normal';
  });
  currentFontSizePercentage = computed(() => this.accessibilityService.getFontSizePercentage());

  ngOnInit(): void {
    console.log('AccessibilityWidget initialized');
    console.log('Current font size:', this.currentFontSize());
    console.log('Current font size percentage:', this.currentFontSizePercentage());
  }

  // Control del panel
  togglePanel(): void {
    this.isOpenSignal.set(!this.isOpenSignal());
    if (this.isOpenSignal()) {
      this.renderer.setAttribute(this.document.body, 'aria-hidden', 'true');
    } else {
      this.renderer.removeAttribute(this.document.body, 'aria-hidden');
    }
  }

  closePanel(): void {
    this.isOpenSignal.set(false);
    this.renderer.removeAttribute(this.document.body, 'aria-hidden');
  }

  // Control del tamaño de fuente
  increaseFontSize(): void {
    const sizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large', 'extra-large'];
    const current = this.currentFontSize();
    const currentIndex = sizes.indexOf(current);
    const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
    const newSize = sizes[nextIndex];

    console.log('Increasing font size:', current, '=>', newSize);
    this.accessibilityService.updateFontSize(newSize);
  }

  decreaseFontSize(): void {
    const sizes: AccessibilitySettings['fontSize'][] = ['small', 'medium', 'large', 'extra-large'];
    const current = this.currentFontSize();
    const currentIndex = sizes.indexOf(current);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const newSize = sizes[prevIndex];

    console.log('Decreasing font size:', current, '=>', newSize);
    this.accessibilityService.updateFontSize(newSize);
  }

  // Control del contraste
  setContrastMode(mode: string): void {
    console.log('setContrastMode called with:', mode);

    // Mapear valores antiguos a nuevos valores
    const modeMap: Record<string, AccessibilitySettings['contrastMode']> = {
      normal: 'normal',
      high: 'high-light', // Alto contraste = blanco sobre negro
      dark: 'high-dark', // Oscuro = negro sobre blanco
      'high-dark': 'high-dark',
      'high-light': 'high-light',
      'black-yellow': 'black-yellow',
      'yellow-black': 'yellow-black',
      'white-blue': 'white-blue',
      'blue-white': 'blue-white',
      'green-black': 'green-black',
      'black-green': 'black-green',
      'black-cyan': 'black-cyan',
      'cyan-black': 'cyan-black',
      'purple-white': 'purple-white',
      'white-purple': 'white-purple',
      'orange-black': 'orange-black',
      'black-orange': 'black-orange',
      'magenta-black': 'magenta-black',
      'black-magenta': 'black-magenta',
    };

    const newMode = modeMap[mode] || 'normal';
    console.log('Mapped mode:', mode, '=>', newMode);

    this.accessibilityService.updateContrastMode(newMode);
  }

  // Control del espaciado
  setLineHeight(height: AccessibilitySettings['lineHeight']): void {
    this.accessibilityService.updateLineHeight(height);
  }

  setLineSpacing(spacing: AccessibilitySettings['lineHeight']): void {
    this.accessibilityService.updateLineHeight(spacing);
  }

  setLetterSpacing(spacing: AccessibilitySettings['letterSpacing']): void {
    this.accessibilityService.updateLetterSpacing(spacing);
  }

  setWordSpacing(spacing: AccessibilitySettings['wordSpacing']): void {
    this.accessibilityService.updateWordSpacing(spacing);
  }

  // Control del foco
  toggleHighContrastFocus(): void {
    console.log('toggleHighContrastFocus called');
    console.log('Current highContrastFocus:', this.highContrastFocus());
    this.accessibilityService.toggleHighContrastFocus();
  }

  toggleUnderlineLinks(): void {
    this.accessibilityService.toggleUnderlineLinks();
  }

  toggleReduceAnimations(): void {
    this.accessibilityService.toggleReduceAnimations();
  }

  toggleSkipLinks(): void {
    this.accessibilityService.toggleSkipLinks();
  }

  // Reset de configuración
  resetSettings(): void {
    this.accessibilityService.resetSettings();
    this.closePanel(); // Cerrar panel después de resetear
  }

  // Métodos para navegación de documentación
  showDocumentationNav() {
    return this.showDocumentationNavSignal();
  }

  toggleDocumentationNav(): void {
    this.showDocumentationNavSignal.set(!this.showDocumentationNavSignal());
  }

  closeDocumentationNav(): void {
    this.showDocumentationNavSignal.set(false);
  }

  // Cerrar panel con Escape
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpenSignal()) {
      this.closePanel();
    }
    if (this.showDocumentationNavSignal()) {
      this.closeDocumentationNav();
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
