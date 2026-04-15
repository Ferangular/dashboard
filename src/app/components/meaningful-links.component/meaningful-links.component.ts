import { Component } from '@angular/core';

@Component({
  selector: 'app-meaningful-links',
  standalone: true,
  imports: [],
  templateUrl: './meaningful-links.component.html',
  styleUrl: './meaningful-links.component.scss',
})
export class MeaningfulLinksComponent {
  badExamples = [
    {
      title: 'Enlace Ambiguo',
      badText: 'Haz clic aquí',
      problem: 'No indica a dónde lleva el enlace',
      goodText: 'Descargar el informe anual 2024',
      explanation: 'El texto describe claramente el destino',
    },
    {
      title: 'Enlace Genérico',
      badText: 'Leer más',
      problem: 'No proporciona contexto',
      goodText: 'Leer más sobre las nuevas características de accesibilidad',
      explanation: 'Especifica el contenido adicional',
    },
    {
      title: 'URL como Texto',
      badText: 'https://ejemplo.com/documento.pdf',
      problem: 'Diffícil de entender en lectores de pantalla',
      goodText: 'Guía completa de WCAG 2.1 (PDF)',
      explanation: 'Describe el contenido y formato',
    },
  ];

  goodExamples = [
    {
      title: 'Enlaces Descriptivos',
      examples: [
        'Descargar la presentación del congreso (PDF, 2.5 MB)',
        'Ver todos los cursos de formación',
        'Contactar con el departamento de soporte técnico',
      ],
    },
    {
      title: 'Enlaces con Contexto',
      examples: [
        'Continuar leyendo el artículo sobre accesibilidad web',
        'Suscribirse a nuestro boletín mensual',
        'Comprar entradas para el evento del 15 de junio',
      ],
    },
    {
      title: 'Enlaces con Iconos y Texto',
      examples: [
        '📧 Enviar correo a soporte@ejemplo.com',
        '📞 Llamar al +34 900 123 456',
        '📍 Ver nuestra ubicación en Google Maps',
      ],
    },
  ];

  wcagCriteria = [
    {
      criterion: '2.4.4 Propósito del enlace',
      description:
        'El propósito de cada enlace puede determinarse a partir del texto del enlace alone o del texto del enlace junto con su contexto de software determinado por programa',
      level: 'A',
      techniques: ['H30', 'H91', 'ARIA7', 'ARIA8'],
    },
    {
      criterion: '2.4.9 Propósito del enlace (en contexto)',
      description:
        'El propósito de cada enlace puede determinarse a partir del texto del enlace junto con el contexto del enlace',
      level: 'AAA',
      techniques: ['H30', 'H91', 'ARIA7', 'ARIA8'],
    },
  ];

  testingMethods = [
    {
      name: 'Sin CSS',
      description:
        'Desactiva los estilos CSS para verificar que los enlaces siguen siendo comprensibles',
      steps: [
        'Desactiva CSS en el navegador',
        'Revisa cada enlace',
        'Verifica que el texto es descriptivo',
      ],
    },
    {
      name: 'Lector de Pantalla',
      description: 'Usa un lector de pantalla para escuchar cómo se anuncian los enlaces',
      steps: [
        'Activa NVDA o JAWS',
        'Navega por los enlaces',
        'Verifica que cada enlace es comprensible',
      ],
    },
    {
      name: 'Lista de Enlaces',
      description: 'Extrae todos los enlaces de la página y vérifícalos fuera de contexto',
      steps: [
        'Usa herramientas de desarrollo',
        'Extrae la lista de enlaces',
        'Verifica que cada uno es único y descriptivo',
      ],
    },
  ];
}
