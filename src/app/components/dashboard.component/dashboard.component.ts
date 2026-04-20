import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface DemoCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  wcagPrinciples: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  learningObjectives: string[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private selectedCategorySignal = signal<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  private searchQuerySignal = signal('');

  selectedCategory = this.selectedCategorySignal.asReadonly();
  searchQuery = this.searchQuerySignal.asReadonly();

  readonly demos: DemoCard[] = [
    {
      id: 'semantic-structure',
      title: 'Estructura Semántica y HTML5',
      description: 'Aprende a usar HTML semántico para crear una estructura sólida y accesible.',
      path: '/semantic-structure',
      icon: 'structure',
      wcagPrinciples: ['1.3.1', '2.4.1', '2.4.6'],
      difficulty: 'beginner',
      estimatedTime: '15 min',
      learningObjectives: [
        'Usar landmarks HTML5 correctamente',
        'Crear jerarquía de encabezados',
        'Evitar divitis con semántica apropiada',
      ],
    },
    {
      id: 'keyboard-navigation',
      title: 'Navegación por Teclado',
      description: 'Domina el tab order, focus management y atajos de teclado.',
      path: '/keyboard-navigation',
      icon: 'keyboard',
      wcagPrinciples: ['2.1.1', '2.4.3', '2.4.7'],
      difficulty: 'intermediate',
      estimatedTime: '20 min',
      learningObjectives: [
        'Orden lógico de tabulación',
        'Estilos de foco visibles',
        'Trampas de teclado y escape',
      ],
    },
    {
      id: 'accessible-forms',
      title: 'Formularios Accesibles',
      description:
        'Crea formularios que todos puedan usar con validación clara y feedback accesible.',
      path: '/accessible-forms',
      icon: 'forms',
      wcagPrinciples: ['1.3.1', '3.3.2', '3.3.3'],
      difficulty: 'intermediate',
      estimatedTime: '25 min',
      learningObjectives: [
        'Labels y descripciones claras',
        'Validación accesible',
        'Mensajes de error comprensibles',
      ],
    },
    {
      id: 'dynamic-components',
      title: 'Componentes Dinámicos con ARIA',
      description: 'Implementa tabs, accordions y modales con ARIA apropiado.',
      path: '/dynamic-components',
      icon: 'aria',
      wcagPrinciples: ['1.3.1', '4.1.2', '4.1.3'],
      difficulty: 'advanced',
      estimatedTime: '30 min',
      learningObjectives: [
        'Roles, estados y propiedades ARIA',
        'Componentes custom accesibles',
        'Sincronización de estados',
      ],
    },
    {
      id: 'accessible-tables',
      title: 'Tablas y Listados Accesibles',
      description: 'Diseña tablas complejas que sean comprensibles para lectores de pantalla.',
      path: '/accessible-tables',
      icon: 'tables',
      wcagPrinciples: ['1.3.1', '1.3.2', '4.1.2'],
      difficulty: 'intermediate',
      estimatedTime: '20 min',
      learningObjectives: [
        'Headers y scope proper',
        'Captions y summaries',
        'Ordenación y filtrado accesible',
      ],
    },
    {
      id: 'accessible-design',
      title: 'Diseño Accesible y Contraste',
      description: 'Aplica principios de color, contraste y diseño visual inclusivo.',
      path: '/accessible-design',
      icon: 'design',
      wcagPrinciples: ['1.4.3', '1.4.6', '1.4.11'],
      difficulty: 'beginner',
      estimatedTime: '15 min',
      learningObjectives: [
        'Ratios de contraste WCAG',
        'No depender solo del color',
        'Espaciado y legibilidad',
      ],
    },
    {
      id: 'seo-accessibility',
      title: 'SEO y Accesibilidad',
      description: 'Descubre cómo la accesibilidad mejora el posicionamiento web.',
      path: '/seo-accessibility',
      icon: 'seo',
      wcagPrinciples: ['2.4.2', '2.4.6', '3.1.1'],
      difficulty: 'intermediate',
      estimatedTime: '18 min',
      learningObjectives: [
        'Meta tags accesibles',
        'Estructura y SEO',
        'Structured data y voice search',
      ],
    },
    {
      id: 'accessibility-testing',
      title: 'Análisis y Evaluación',
      description: 'Aprende a usar herramientas y metodologías de testing de accesibilidad.',
      path: '/accessibility-testing',
      icon: 'testing',
      wcagPrinciples: ['Todos', 'Conformance', 'Testing'],
      difficulty: 'advanced',
      estimatedTime: '35 min',
      learningObjectives: [
        'Herramientas automáticas',
        'Testing con lectores',
        'Checklists y auditorías',
      ],
    },
  ];

  filteredDemos = computed(() => {
    let filtered = this.demos;

    // Filtrar por categoría
    if (this.selectedCategorySignal() !== 'all') {
      filtered = filtered.filter((demo) => demo.difficulty === this.selectedCategorySignal());
    }

    // Filtrar por búsqueda
    if (this.searchQuerySignal()) {
      const query = this.searchQuerySignal().toLowerCase();
      filtered = filtered.filter(
        (demo) =>
          demo.title.toLowerCase().includes(query) ||
          demo.description.toLowerCase().includes(query) ||
          demo.learningObjectives.some((obj) => obj.toLowerCase().includes(query)),
      );
    }

    return filtered;
  });

  readonly categories = [
    { value: 'all', label: 'Todas', count: this.demos.length },
    {
      value: 'beginner',
      label: 'Principiante',
      count: this.demos.filter((d) => d.difficulty === 'beginner').length,
    },
    {
      value: 'intermediate',
      label: 'Intermedio',
      count: this.demos.filter((d) => d.difficulty === 'intermediate').length,
    },
    {
      value: 'advanced',
      label: 'Avanzado',
      count: this.demos.filter((d) => d.difficulty === 'advanced').length,
    },
  ];

  setCategory(category: string): void {
    if (
      category === 'all' ||
      category === 'beginner' ||
      category === 'intermediate' ||
      category === 'advanced'
    ) {
      this.selectedCategorySignal.set(category);
    }
  }

  setSearchQuery(query: string): void {
    this.searchQuerySignal.set(query);
  }

  getDifficultyColor(difficulty: string): string {
    const colors = {
      beginner: '#10b981',
      intermediate: '#f59e0b',
      advanced: '#ef4444',
    };
    return colors[difficulty as keyof typeof colors] || '#6b7280';
  }

  getDifficultyLabel(difficulty: string): string {
    const labels = {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  }

  getIconPath(icon: string): string {
    // Simple icon mapping - could be replaced with actual SVG icons
    const iconMap: Record<string, string> = {
      structure: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
      keyboard:
        'M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z',
      forms:
        'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
      aria: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      tables: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z',
      design:
        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      seo: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
      testing:
        'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
    };
    return iconMap[icon] || iconMap['structure'];
  }

  getStats() {
    const completed = 0; // This could be tracked in localStorage
    const total = this.demos.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      percentage,
      nextRecommended: this.demos.find((d) => d.difficulty === 'beginner'),
    };
  }
}
