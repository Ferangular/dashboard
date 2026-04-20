import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccessibilityWidgetComponent } from './components/accessibility-widget.component/accessibility-widget.component';
import { AppSettingsService } from './core/services/app-settings.service';
import { SidebarService } from './core/services/sidebar.service';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { SidebarComponent } from './shared/components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AccessibilityWidgetComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private appSettings = inject(AppSettingsService);
  private sidebarService = inject(SidebarService);
  private router = inject(Router);

  appConfig = computed(() => this.appSettings.config);
  isSidebarCollapsed = this.sidebarService.isCollapsed;
  isFooterVisible = signal(true); // Estado para controlar visibilidad del footer

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  toggleFooter(): void {
    this.isFooterVisible.update((visible) => !visible);
    // Anunciar cambio para lectores de pantalla
    this.announceToScreenReader(
      this.isFooterVisible() ? 'Pie de página mostrado' : 'Pie de página oculto',
    );
  }

  // Métodos para navegación accesible
  showBreadcrumb(): boolean {
    const url = this.router.url;
    return url !== '/' && url !== '/dashboard';
  }

  getCurrentPageTitle(): string {
    const url = this.router.url;
    const titleMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/semantic-structure': 'Estructura Semántica',
      '/keyboard-navigation': 'Navegación por Teclado',
      '/accessible-forms': 'Formularios Accesibles',
      '/dynamic-components': 'Componentes Dinámicos',
      '/accessible-tables': 'Tablas Accesibles',
      '/accessible-design': 'Diseño Accesible',
      '/seo-accessibility': 'SEO y Accesibilidad',
      '/accessibility-testing': 'Testing de Accesibilidad',
    };
    return titleMap[url] || 'Página actual';
  }

  // Utilidad para anunciar cambios a lectores de pantalla
  private announceToScreenReader(message: string): void {
    const announcement = document.getElementById('page-announcements');
    if (announcement) {
      announcement.textContent = message;
      // Limpiar después de un tiempo para permitir repetir el mismo mensaje
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }
}
