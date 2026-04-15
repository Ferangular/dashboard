import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../../../core/interfaces/navigation.interface';
import { I18nService } from '../../../../core/services/i18n.service';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private i18nService = inject(I18nService);

  isCollapsed = this.sidebarService.isCollapsed;
  isMobileOpen = signal(false);

  navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'navigation.home',
      path: '/',
      icon: '🏠',
      order: 1,
    },
    {
      id: 'list',
      label: 'navigation.list',
      path: '/list',
      icon: '📋',
      order: 2,
    },
    {
      id: 'detail',
      label: 'navigation.detail',
      path: '/detail/1',
      icon: '📄',
      order: 3,
    },
    {
      id: 'performance',
      label: 'navigation.laboratory',
      path: '/performance-lab',
      icon: '⚡',
      order: 4,
    },
    {
      id: 'accessibility',
      label: 'navigation.accessibility',
      path: '/accessibility',
      icon: '♿',
      order: 5,
      children: [
        {
          id: 'accessibility-demo',
          label: 'navigation.accessibilityDemo',
          path: '/accessibility',
          icon: '✨',
          order: 1,
        },
        {
          id: 'contact-form',
          label: 'navigation.contactForm',
          path: '/contact-form',
          icon: '??',
          order: 2,
        },
        {
          id: 'keyboard-navigation',
          label: 'navigation.keyboardNavigation',
          path: '/keyboard-navigation',
          icon: '⌨️',
          order: 3,
        },
        {
          id: 'semantic-structure',
          label: 'navigation.semanticStructure',
          path: '/semantic-structure',
          icon: '??',
          order: 4,
        },
      ],
    },
    {
      id: 'settings',
      label: 'navigation.settings',
      path: '/settings',
      icon: '⚙️',
      order: 6,
    },
  ];

  currentPath = computed(() => this.router.url);

  // Submenu management
  expandedItems = signal<Set<string>>(new Set());
  isToggling = signal(false);

  toggleSubmenu(itemId: string): void {
    // Prevenir múltiples clicks rápidos
    if (this.isToggling()) return;
    this.isToggling.set(true);

    const current = new Set(this.expandedItems());
    if (current.has(itemId)) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this.expandedItems.set(current);

    // Usar signal con efecto para limpiar el estado después de la animación
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isToggling.set(false);
      });
    });
  }

  isExpanded(itemId: string): boolean {
    return this.expandedItems().has(itemId);
  }

  handleParentClick(item: NavigationItem): void {
    if (item.children && item.children.length > 0) {
      this.toggleSubmenu(item.id);
      return;
    }

    this.closeAllSubmenus();
    this.navigateTo(item.path);
  }

  // Cerrar todos los submenús
  closeAllSubmenus(): void {
    this.expandedItems.set(new Set());
  }

  // Manejar clic en elementos del submenú
  handleChildClick(path: string): void {
    this.closeAllSubmenus();
    (document.activeElement as HTMLElement | null)?.blur();
    this.navigateTo(path);
  }

  toggleCollapse(): void {
    this.sidebarService.toggle();
  }

  closeMobileSidebar(): void {
    this.isMobileOpen.set(false);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeMobileSidebar();
  }

  isActive(path: string): boolean {
    const current = this.currentPath();
    return current === path || (path !== '/' && current.startsWith(path));
  }

  translate(key: string): string {
    return this.i18nService.translate(key);
  }

  // Cerrar submenús al hacer clic fuera
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    const isClickInsideSidebar = target?.closest('.sidebar');

    if (!isClickInsideSidebar) {
      this.closeAllSubmenus();
    }
  }
}
