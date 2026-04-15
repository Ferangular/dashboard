import { CommonModule } from '@angular/common';
import { Component, inject, Renderer2, signal } from '@angular/core';

interface HeadingStructure {
  level: number;
  text: string;
  id: string;
  children?: HeadingStructure[];
}

interface LandmarkRegion {
  role: string;
  label: string;
  element: string;
  description: string;
}

@Component({
  selector: 'app-semantic-structure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semantic-structure.html',
  styleUrl: './semantic-structure.scss',
})
export class SemanticStructure {
  private renderer = inject(Renderer2);

  // Signals para estado del componente
  showCorrectStructure = signal(true);
  highlightedElement = signal('');
  currentView = signal('hierarchy');

  // Demostración de jerarquía de encabezados
  headingHierarchy = signal<HeadingStructure[]>([
    {
      level: 1,
      text: 'Título Principal de la Página',
      id: 'main-title',
      children: [
        {
          level: 2,
          text: 'Sección Principal',
          id: 'main-section',
          children: [
            {
              level: 3,
              text: 'Subsección Importante',
              id: 'important-subsection',
              children: [
                {
                  level: 4,
                  text: 'Detalles Específicos',
                  id: 'specific-details',
                  children: [
                    {
                      level: 5,
                      text: 'Información Adicional',
                      id: 'additional-info',
                      children: [
                        {
                          level: 6,
                          text: 'Referencia Final',
                          id: 'final-reference',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              level: 3,
              text: 'Otra Subsección',
              id: 'other-subsection',
            },
          ],
        },
        {
          level: 2,
          text: 'Segunda Sección Principal',
          id: 'second-section',
          children: [
            {
              level: 3,
              text: 'Subsección Secundaria',
              id: 'secondary-subsection',
            },
          ],
        },
      ],
    },
  ]);

  // Demostración de landmarks ARIA
  landmarkRegions = signal<LandmarkRegion[]>([
    {
      role: 'banner',
      label: 'Cabecera del Sitio',
      element: '<header>',
      description: 'Contiene el encabezado principal, logo y navegación global',
    },
    {
      role: 'navigation',
      label: 'Navegación Principal',
      element: '<nav>',
      description: 'Menú principal de navegación del sitio',
    },
    {
      role: 'main',
      label: 'Contenido Principal',
      element: '<main>',
      description: 'Contenido principal y único de la página',
    },
    {
      role: 'complementary',
      label: 'Contenido Complementario',
      element: '<aside>',
      description: 'Información secundaria relacionada con el contenido principal',
    },
    {
      role: 'contentinfo',
      label: 'Información del Sitio',
      element: '<footer>',
      description: 'Información sobre el sitio, copyright, enlaces legales',
    },
    {
      role: 'search',
      label: 'Búsqueda',
      element: '<search>',
      description: 'Funcionalidad de búsqueda del sitio',
    },
    {
      role: 'form',
      label: 'Formulario',
      element: '<form>',
      description: 'Formulario de interacción con el usuario',
    },
  ]);

  // Ejemplos de estructuras incorrectas
  incorrectExamples = signal([
    {
      title: 'Saltos de Nivel',
      description: 'Saltar de h1 a h3 sin h2',
      example: '<h1>Título</h1>\n<h3>Subtítulo (incorrecto)</h3>',
      problem: 'Rompe la jerarquía semántica',
    },
    {
      title: 'Múltiples H1',
      description: 'Usar más de un h1 en la misma página',
      example: '<h1>Título Principal</h1>\n<h1>Otro Título Principal</h1>',
      problem: 'Confunde la estructura del documento',
    },
    {
      title: 'Encabezados para Estilo',
      description: 'Usar encabezados solo para formato visual',
      example: '<h3 style="font-size: 14px;">Texto pequeño</h3>',
      problem: 'Uso semántico incorrecto',
    },
    {
      title: 'Sin Landmarks',
      description: 'Página sin elementos semánticos',
      example: '<div class="header"></div>\n<div class="content"></div>',
      problem: 'Sin estructura semántica clara',
    },
  ]);

  constructor() {
    this.initializeAccessibilityFeatures();
  }

  private initializeAccessibilityFeatures(): void {
    // Inicializar cualquier configuración de accesibilidad
  }

  // Métodos para interacciones del usuario
  toggleStructureView(): void {
    this.showCorrectStructure.set(!this.showCorrectStructure());
  }

  highlightElement(elementId: string): void {
    this.highlightedElement.set(elementId);

    // Remover highlight después de 2 segundos
    setTimeout(() => {
      this.highlightedElement.set('');
    }, 2000);
  }

  setCurrentView(view: string): void {
    this.currentView.set(view);
  }

  // Métodos para obtener información de estructura
  getHeadingLevel(level: number): string {
    return `h${level}`;
  }

  getHeadingClass(level: number): string {
    return `heading-${level}`;
  }

  isHighlighted(elementId: string): boolean {
    return this.highlightedElement() === elementId;
  }

  // Demostración de navegación por estructura
  navigateToHeading(headingId: string): void {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus();
      this.highlightElement(headingId);
    }
  }

  // Análisis de estructura
  analyzeStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const landmarks = document.querySelectorAll(
      '[role], header, nav, main, aside, footer, section, article',
    );

    console.log('Análisis de Encabezados:', headings.length);
    console.log('Análisis de Landmarks:', landmarks.length);

    // Mostrar resultados accesibles
    this.showAccessibleMessage(
      `Estructura analizada: ${headings.length} encabezados, ${landmarks.length} landmarks`,
    );
  }

  // Demostración de patrones correctos
  showAccessibleMessage(message: string): void {
    const messageDiv = this.renderer.createElement('div');
    messageDiv.setAttribute('role', 'status');
    messageDiv.setAttribute('aria-live', 'polite');
    messageDiv.className = 'accessible-message';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      this.renderer.removeChild(document.body, messageDiv);
    }, 3000);
  }

  // Métodos para testing
  validateHeadingHierarchy(): boolean {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let previousLevel = 0;

    for (const heading of headings) {
      const currentLevel = parseInt(heading.tagName.charAt(1));

      // Verificar que no haya saltos mayores de 1 nivel
      if (currentLevel > previousLevel + 1 && previousLevel > 0) {
        return false;
      }

      previousLevel = currentLevel;
    }

    return true;
  }

  countLandmarks(): number {
    const landmarks = document.querySelectorAll(
      '[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], header, nav, main, aside, footer',
    );
    return landmarks.length;
  }

  // Métodos educativos
  getBestPracticeTips(): string[] {
    return [
      'Usa un solo <h1> por página para el título principal',
      'Mantén la jerarquía de encabezados sin saltos',
      'Usa landmarks ARIA para estructura semántica',
      'Cada sección debe tener un encabezado descriptivo',
      'Evita usar encabezados solo para estilo visual',
      'Usa <section> con encabezado para contenido relacionado',
      'Usa <article> para contenido independiente',
      'Usa <aside> para contenido complementario',
    ];
  }

  getCommonMistakes(): string[] {
    return [
      'Múltiples <h1> en una página',
      'Saltar niveles de encabezados (h1 a h3)',
      'Usar <div> en lugar de elementos semánticos',
      'No usar landmarks ARIA',
      'Encabezados vacíos o poco descriptivos',
      'Estructura anidada incorrectamente',
      'Falta de navegación por estructura',
      'Contenido sin contexto semántico',
    ];
  }

  getCorrectSolution(title: string): string {
    const solutions: Record<string, string> = {
      'Saltos de Nivel':
        'Usar secuencia correcta: <h1>Título</h1><h2>Subtítulo</h2><h3>Sub-subtítulo</h3>',
      'Múltiples H1': 'Usar un solo <h1> por página y <h2>-<h6> para el resto',
      'Encabezados para Estilo': 'Usar CSS para estilos y encabezados semánticos para estructura',
      'Sin Landmarks': 'Usar elementos semánticos: <header>, <nav>, <main>, <aside>, <footer>',
    };
    return solutions[title] || 'Consultar las mejores prácticas de estructura semántica';
  }
}
