import { Routes } from '@angular/router';
import { AccessibilityDemoComponent } from './components/accessibility-demo.component/accessibility-demo.component';
import { CheckVersionComponent } from './components/check-version.component/check-version.component';
import { ContactFormComponent } from './components/contact-form.component/contact-form.component';
import { KeyboardNavigationDemoComponent } from './components/keyboard-navigation-demo.component/keyboard-navigation-demo.component';
import { SemanticStructure } from './components/semantic-structure/semantic-structure';

export const routes: Routes = [
  {
    path: '',
    component: CheckVersionComponent,
    title: 'Dashboard - Angular 21 Performance Lab',
  },
  {
    path: 'accessibility',
    component: AccessibilityDemoComponent,
    title: 'Demostración de Accesibilidad WCAG 2.2 AA',
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
    title: 'Formulario de Contacto Accesible',
  },
  {
    path: 'keyboard-navigation',
    component: KeyboardNavigationDemoComponent,
    title: 'Regla 4: Navegación por Teclado',
  },
  {
    path: 'semantic-structure',
    component: SemanticStructure,
    title: 'Regla 6: Encabezados y Estructura Semántica',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
