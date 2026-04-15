import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-aria-states',
  standalone: true,
  imports: [],
  templateUrl: './aria-states.component.html',
  styleUrl: './aria-states.component.scss',
})
export class AriaStatesComponent {
  // Demo states for interactive examples
  isExpanded = signal(false);
  isChecked = signal(false);
  isSelected = signal(false);
  isDisabled = signal(false);
  isInvalid = signal(false);
  isVisible = signal(true);
  currentTab = signal('tab1');
  currentValue = signal('50');
  isPressed = signal(false);

  // Accordion items
  accordionItems = [
    {
      id: 'item1',
      title: '¿Qué es ARIA?',
      content:
        'ARIA (Accessible Rich Internet Applications) es un conjunto de atributos que definen formas de hacer que el contenido web y las aplicaciones web sean más accesibles para personas con discapacidades.',
    },
    {
      id: 'item2',
      title: 'Estados ARIA',
      content:
        'Los estados ARIA (aria-*) son atributos que cambian dinámicamente para indicar el estado actual de un elemento, como aria-expanded, aria-selected, aria-disabled, etc.',
    },
    {
      id: 'item3',
      title: 'Propiedades ARIA',
      content:
        'Las propiedades ARIA son atributos que describen características de un elemento que no cambian, como aria-label, aria-describedby, aria-required, etc.',
    },
  ];

  // Tabs data
  tabs = [
    {
      id: 'tab1',
      label: 'Introducción',
      content:
        'ARIA ayuda a que las tecnologías de asistencia comprendan mejor el contenido web dinámico.',
    },
    {
      id: 'tab2',
      label: 'Estados',
      content:
        'Los estados indican condiciones que pueden cambiar durante la interacción del usuario.',
    },
    {
      id: 'tab3',
      label: 'Propiedades',
      content: 'Las propiedades describen características estáticas de los elementos.',
    },
  ];

  // Form fields
  formFields = [
    { id: 'name', label: 'Nombre', required: true, type: 'text' },
    { id: 'email', label: 'Correo electrónico', required: true, type: 'email' },
    { id: 'phone', label: 'Teléfono', required: false, type: 'tel' },
  ];

  // Methods for interactive demos
  toggleAccordion() {
    this.isExpanded.set(!this.isExpanded());
  }

  selectTab(tabId: string) {
    this.currentTab.set(tabId);
  }

  toggleCheckbox() {
    this.isChecked.set(!this.isChecked());
  }

  toggleRadio() {
    this.isSelected.set(!this.isSelected());
  }

  toggleButton() {
    this.isPressed.set(!this.isPressed());
  }

  toggleDisable() {
    this.isDisabled.set(!this.isDisabled());
  }

  toggleVisibility() {
    this.isVisible.set(!this.isVisible());
  }

  updateValue(value: string) {
    this.currentValue.set(value);
  }

  validateForm() {
    this.isInvalid.set(!this.isInvalid());
  }

  ariaExamples = [
    {
      category: 'Estados (States)',
      examples: [
        {
          attribute: 'aria-expanded',
          description: 'Indica si un elemento está expandido o colapsado',
          usage: 'aria-expanded="true/false"',
        },
        {
          attribute: 'aria-selected',
          description: 'Indica si un elemento está seleccionado',
          usage: 'aria-selected="true/false"',
        },
        {
          attribute: 'aria-disabled',
          description: 'Indica si un elemento está deshabilitado',
          usage: 'aria-disabled="true/false"',
        },
        {
          attribute: 'aria-checked',
          description: 'Indica el estado de un checkbox o radio',
          usage: 'aria-checked="true/false/mixed"',
        },
        {
          attribute: 'aria-pressed',
          description: 'Indica si un botón toggle está presionado',
          usage: 'aria-pressed="true/false"',
        },
        {
          attribute: 'aria-hidden',
          description: 'Oculta elementos de tecnologías de asistencia',
          usage: 'aria-hidden="true/false"',
        },
      ],
    },
    {
      category: 'Propiedades (Properties)',
      examples: [
        {
          attribute: 'aria-label',
          description: 'Proporciona una etiqueta accesible',
          usage: 'aria-label="Cerrar menú"',
        },
        {
          attribute: 'aria-describedby',
          description: 'Referencia a elemento que describe',
          usage: 'aria-describedby="help-text"',
        },
        {
          attribute: 'aria-required',
          description: 'Indica si un campo es requerido',
          usage: 'aria-required="true"',
        },
        {
          attribute: 'aria-invalid',
          description: 'Indica si el valor es inválido',
          usage: 'aria-invalid="true"',
        },
        {
          attribute: 'aria-current',
          description: 'Indica el elemento actual',
          usage: 'aria-current="page"',
        },
        {
          attribute: 'aria-live',
          description: 'Región para anuncios dinámicos',
          usage: 'aria-live="polite/assertive"',
        },
      ],
    },
  ];

  bestPractices = [
    {
      title: 'No sobreusar ARIA',
      description:
        'Usa HTML semántico nativo antes que ARIA. Si un elemento HTML ya tiene el significado necesario, no necesitas ARIA.',
      example: '<button> es mejor que <div role="button">',
    },
    {
      title: 'Mantén sincronizados los estados',
      description: 'Los estados ARIA deben reflejar el estado visual real del elemento.',
      example: 'Si aria-expanded="true", el contenido debe estar visible',
    },
    {
      title: 'Usaroles apropiados',
      description: 'Los roles deben coincidir con la función esperada del elemento.',
      example: 'role="navigation" para menús, role="main" para contenido principal',
    },
    {
      title: 'Proporciona nombres descriptivos',
      description: 'Usa aria-label o aria-labelledby para dar nombres claros a los elementos.',
      example: 'aria-label="Menú principal de navegación"',
    },
  ];
}
