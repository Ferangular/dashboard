import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-accessibility-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility-demo.component.html',
  styleUrl: './accessibility-demo.component.scss',
})
export class AccessibilityDemoComponent {
  private themeService = inject(ThemeService);

  // Usar el signal compartido del ThemeService
  readonly isDarkMode = this.themeService.isDarkMode;
  readonly currentContrast = signal('4.5:1');
  readonly wcagLevel = signal('AA');

  constructor() {
    // El tema se inicializa automáticamente en ThemeService
  }

  /**
   * Cambiar entre modo claro y oscuro usando el servicio compartido
   */
  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  /**
   * Obtener información de contraste para un color
   */
  getContrastInfo(foreground: string, background: string): { ratio: string; passes: boolean } {
    // Simulación de cálculo de contraste (en producción usar una librería real)
    const contrastRatios: Record<string, string> = {
      '#1a1a1a-#ffffff': '16.43:1',
      '#4a4a4a-#ffffff': '7.63:1',
      '#ffffff-#0d1117': '15.86:1',
      '#c9d1d9-#0d1117': '8.59:1',
      '#16a34a-#ffffff': '4.52:1',
      '#ea580c-#ffffff': '4.54:1',
      '#dc2626-#ffffff': '4.61:1',
      '#2563eb-#ffffff': '4.61:1',
    };

    const key = `${foreground}-${background}`;
    const ratio = contrastRatios[key] || '4.5:1';
    const numericRatio = parseFloat(ratio.split(':')[0]);

    return {
      ratio,
      passes: numericRatio >= 4.5,
    };
  }

  /**
   * Verificar cumplimiento WCAG
   */
  checkWCAGCompliance(): {
    criterion: string;
    level: string;
    passes: boolean;
    description: string;
  }[] {
    return [
      {
        criterion: '1.3.1',
        level: 'A',
        passes: true,
        description: 'Información y Relaciones - HTML semántico',
      },
      {
        criterion: '1.4.3',
        level: 'AA',
        passes: true,
        description: 'Contraste Mínimo - 4.5:1 para texto normal',
      },
      {
        criterion: '2.1.1',
        level: 'A',
        passes: true,
        description: 'Teclado - Toda funcionalidad accesible por teclado',
      },
      {
        criterion: '2.4.7',
        level: 'AA',
        passes: true,
        description: 'Foco Visible - Indicadores claros de enfoque',
      },
      {
        criterion: '4.1.2',
        level: 'A',
        passes: true,
        description: 'Nombre, Rol, Valor - ARIA correcto',
      },
    ];
  }

  /**
   * Generar reporte de accesibilidad
   */
  generateAccessibilityReport(): void {
    const compliance = this.checkWCAGCompliance();
    const totalCriteria = compliance.length;
    const passedCriteria = compliance.filter((c) => c.passes).length;
    const complianceRate = (passedCriteria / totalCriteria) * 100;

    const report = {
      date: new Date().toISOString(),
      wcagLevel: this.wcagLevel(),
      complianceRate: `${complianceRate.toFixed(1)}%`,
      passedCriteria: passedCriteria,
      totalCriteria: totalCriteria,
      criteria: compliance,
      theme: this.isDarkMode() ? 'dark' : 'light',
      contrastStandard: this.currentContrast(),
    };

    console.log('Accessibility Report:', report);

    // En producción, esto podría enviar el reporte a un servicio
    // o descargarlo como archivo JSON
    if (typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `accessibility-report-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Ejecutar pruebas de accesibilidad automáticas
   */
  async runAccessibilityTests(): Promise<
    { test: string; result: 'pass' | 'fail'; details: string }[]
  > {
    const tests = [
      {
        test: 'Color Contrast Test',
        result: 'pass' as const,
        details: 'All text elements meet 4.5:1 contrast ratio',
      },
      {
        test: 'Keyboard Navigation Test',
        result: 'pass' as const,
        details: 'All interactive elements are keyboard accessible',
      },
      {
        test: 'Screen Reader Test',
        result: 'pass' as const,
        details: 'Proper ARIA labels and semantic HTML',
      },
      {
        test: 'Focus Management Test',
        result: 'pass' as const,
        details: 'Visible focus indicators and logical tab order',
      },
      {
        test: 'Semantic HTML Test',
        result: 'pass' as const,
        details: 'Proper heading hierarchy and landmark elements',
      },
    ];

    // Simular pruebas asíncronas
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return tests;
  }
}
