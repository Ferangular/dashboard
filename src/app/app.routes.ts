import { Routes } from '@angular/router';
import { AccessibilityDemoComponent } from './components/accessibility-demo.component/accessibility-demo.component';
import { AriaStatesComponent } from './components/aria-states.component/aria-states.component';
import { CheckVersionComponent } from './components/check-version.component/check-version.component';
import { ContactFormComponent } from './components/contact-form.component/contact-form.component';
import { KeyboardNavigationDemoComponent } from './components/keyboard-navigation-demo.component/keyboard-navigation-demo.component';
import { MeaningfulLinksComponent } from './components/meaningful-links.component/meaningful-links.component';
import { SemanticStructure } from './components/semantic-structure/semantic-structure';
import { SkipLinksDemoComponent } from './components/skip-links-demo.component/skip-links-demo.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckVersionComponent,
    title: 'Laboratorio de Accesibilidad - Dashboard Principal',
  },
  {
    path: 'semantic-structure',
    component: SemanticStructure,
    title: 'Demo 1: Estructura Semántica y HTML5',
  },
  {
    path: 'keyboard-navigation',
    component: KeyboardNavigationDemoComponent,
    title: 'Demo 2: Navegación por Teclado',
  },
  {
    path: 'accessible-forms',
    component: ContactFormComponent,
    title: 'Demo 3: Formularios Accesibles',
  },
  {
    path: 'dynamic-components',
    component: AriaStatesComponent,
    title: 'Demo 4: Componentes Dinámicos con ARIA',
  },
  {
    path: 'accessible-tables',
    component: AccessibilityDemoComponent,
    title: 'Demo 5: Tablas y Listados Accesibles',
  },
  {
    path: 'accessible-design',
    component: MeaningfulLinksComponent,
    title: 'Demo 6: Diseño Accesible y Contraste',
  },
  {
    path: 'seo-accessibility',
    component: SkipLinksDemoComponent,
    title: 'Demo 7: SEO y Accesibilidad',
  },
  {
    path: 'accessibility-testing',
    component: CheckVersionComponent,
    title: 'Demo 8: Análisis y Evaluación de Accesibilidad',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
