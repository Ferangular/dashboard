import { Component } from '@angular/core';

@Component({
  selector: 'app-skip-links-demo',
  standalone: true,
  imports: [],
  templateUrl: './skip-links-demo.component.html',
  styleUrl: './skip-links-demo.component.scss',
})
export class SkipLinksDemoComponent {
  examples = [
    {
      title: 'Skip Link Básico',
      description: 'Enlace para saltar directamente al contenido principal',
      code: `<a href="#main-content" class="skip-link">Saltar al contenido principal</a>`,
    },
    {
      title: 'Múltiples Skip Links',
      description: 'Varios enlaces para saltar a diferentes secciones',
      code: `<a href="#navigation" class="skip-link">Ir a navegación</a>
<a href="#main-content" class="skip-link">Ir al contenido principal</a>
<a href="#search" class="skip-link">Ir a búsqueda</a>`,
    },
    {
      title: 'Skip Link con ARIA',
      description: 'Con atributos ARIA para mejor accesibilidad',
      code: `<a href="#main" class="skip-link" 
       role="button" 
       aria-label="Saltar al contenido principal">
  Saltar al contenido
</a>`,
    },
  ];

  wcagCriteria = [
    {
      criterion: '2.4.1 Bloques de omisión',
      description: 'Debe haber mecanismos para saltar bloques de contenido repetido',
      level: 'A',
      examples: ['Skip links', 'Navegación por encabezados', 'Landmarks ARIA'],
    },
    {
      criterion: '2.4.2 Títulos de página',
      description: 'Las páginas web deben tener títulos descriptivos',
      level: 'A',
      examples: ['Títulos únicos', 'Contexto claro', 'Jerarquía lógica'],
    },
  ];

  bestPractices = [
    {
      title: 'Posicionamiento',
      description:
        'Los skip links deben estar al inicio del documento y ser visibles solo cuando reciben foco',
    },
    {
      title: 'Estilo',
      description: 'Deben tener alto contraste y ser claramente visibles cuando están activos',
    },
    {
      title: 'Destinos',
      description: 'Los destinos deben tener atributos id únicos y ser elementos enfocables',
    },
  ];
}
