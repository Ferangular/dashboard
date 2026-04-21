import { Routes } from '@angular/router';
import { AccessibilityDemoComponent } from './components/accessibility-demo.component/accessibility-demo.component';
import { AriaStatesComponent } from './components/aria-states.component/aria-states.component';
import { CheckVersionComponent } from './components/check-version.component/check-version.component';
import { ContactFormComponent } from './components/contact-form.component/contact-form.component';
import { ChecklistDocComponent } from './components/docs/checklist-doc.component';
import { FormsDocComponent } from './components/docs/forms-doc.component';
import { LegalDocComponent } from './components/docs/legal-doc.component';
import { NavigationDocComponent } from './components/docs/navigation-doc.component';
import { StructureDocComponent } from './components/docs/structure-doc.component';
import { TestingDocComponent } from './components/docs/testing-doc.component';
import { ToolsDocComponent } from './components/docs/tools-doc.component';
import { KeyboardNavigationDemoComponent } from './components/keyboard-navigation-demo.component/keyboard-navigation-demo.component';
import { MeaningfulLinksComponent } from './components/meaningful-links.component/meaningful-links.component';
import { SemanticStructure } from './components/semantic-structure/semantic-structure';
import { SkipLinksDemoComponent } from './components/skip-links-demo.component/skip-links-demo.component';
import { MarkdownViewerComponent } from './shared/components/markdown-viewer/markdown-viewer.component';

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
    path: 'docs/navigation',
    component: NavigationDocComponent,
    title: 'Navegación Accesible - Documentación',
  },
  {
    path: 'docs/structure',
    component: StructureDocComponent,
    title: 'Estructura y Organización - Documentación',
  },
  {
    path: 'docs/forms',
    component: FormsDocComponent,
    title: 'Formularios Accesibles - Documentación',
  },
  {
    path: 'docs/tools',
    component: ToolsDocComponent,
    title: 'Herramientas de Accesibilidad - Documentación',
  },
  {
    path: 'docs/testing',
    component: TestingDocComponent,
    title: 'Guía de Testing - Documentación',
  },
  {
    path: 'docs/checklist',
    component: ChecklistDocComponent,
    title: 'Checklist WCAG - Documentación',
  },
  {
    path: 'docs/legal',
    component: LegalDocComponent,
    title: 'Marco Legal - Documentación',
  },
  {
    path: 'docs/:path',
    component: MarkdownViewerComponent,
    title: 'Visor de Documentación',
  },
  {
    path: 'docs/**',
    component: MarkdownViewerComponent,
    title: 'Visor de Documentación - Catch All',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
