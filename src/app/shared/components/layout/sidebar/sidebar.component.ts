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
          icon: '📄',
          order: 4,
        },
        {
          id: 'skip-links',
          label: 'navigation.skipLinks',
          path: '/skip-links',
          icon: '⏭️',
          order: 5,
        },
        {
          id: 'meaningful-links',
          label: 'navigation.meaningfulLinks',
          path: '/meaningful-links',
          icon: '🔗',
          order: 6,
        },
        {
          id: 'aria-states',
          label: 'navigation.ariaStates',
          path: '/aria-states',
          icon: '🎯',
          order: 7,
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
    const wasExpanded = current.has(itemId);

    if (wasExpanded) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this.expandedItems.set(current);

    // Anunciar cambio de estado
    const item = this.navigationItems.find((navItem) => navItem.id === itemId);
    if (item) {
      this.announceSubmenuToggle(item, !wasExpanded);
    }

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

  // Gestión de navegación por teclado
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const menuitem = target.closest('[role="menuitem"]') as HTMLElement | null;

    if (!menuitem) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextMenuItem(menuitem);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousMenuItem(menuitem);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.handleArrowRight(menuitem);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.handleArrowLeft(menuitem);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        menuitem.click();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeAllSubmenus();
        break;
    }
  }

  private focusNextMenuItem(currentItem: HTMLElement): void {
    const allMenuitems = Array.from(
      document.querySelectorAll('[role="menuitem"]:not([tabindex="-1"])'),
    ) as HTMLElement[];
    const currentIndex = allMenuitems.indexOf(currentItem);
    const nextIndex = (currentIndex + 1) % allMenuitems.length;
    allMenuitems[nextIndex]?.focus();
  }

  private focusPreviousMenuItem(currentItem: HTMLElement): void {
    const allMenuitems = Array.from(
      document.querySelectorAll('[role="menuitem"]:not([tabindex="-1"])'),
    ) as HTMLElement[];
    const currentIndex = allMenuitems.indexOf(currentItem);
    const previousIndex = currentIndex === 0 ? allMenuitems.length - 1 : currentIndex - 1;
    allMenuitems[previousIndex]?.focus();
  }

  private handleArrowRight(menuitem: HTMLElement): void {
    // Si tiene submenu, expandirlo
    const hasPopup = menuitem.getAttribute('aria-haspopup') === 'true';
    if (hasPopup && menuitem.getAttribute('aria-expanded') === 'false') {
      menuitem.click();
    } else {
      // Si no, mover al siguiente item
      this.focusNextMenuItem(menuitem);
    }
  }

  private handleArrowLeft(menuitem: HTMLElement): void {
    // Si está en un submenu, cerrarlo
    const submenu = menuitem.closest('.sidebar__submenu');
    if (submenu) {
      const parentButton = document.querySelector(`[aria-controls="${submenu.id}"]`) as HTMLElement;
      if (parentButton) {
        this.closeAllSubmenus();
        parentButton.focus();
      }
    } else {
      // Si no, mover al item anterior
      this.focusPreviousMenuItem(menuitem);
    }
  }

  // Mensajes para aria-live
  ariaLiveMessage = signal('');

  getAriaLiveMessage(): string {
    return this.ariaLiveMessage();
  }

  // Generar etiquetas aria-label mejoradas
  getAriaLabelForItem(item: NavigationItem): string {
    const label = this.translate(item.label);
    const isActive = this.isActive(item.path);
    return isActive ? `${label} - página actual` : label;
  }

  getAriaLabelForChild(child: NavigationItem, parent: NavigationItem): string {
    const childLabel = this.translate(child.label);
    const parentLabel = this.translate(parent.label);
    const isActive = this.isActive(child.path);
    const baseLabel = `${childLabel} - ${parentLabel}`;
    return isActive ? `${baseLabel} - página actual` : baseLabel;
  }

  // Anunciar cambios en submenús
  announceSubmenuToggle(item: NavigationItem, isExpanded: boolean): void {
    const label = this.translate(item.label);
    const message = isExpanded ? `Menú ${label} expandido` : `Menú ${label} contraído`;
    this.ariaLiveMessage.set(message);

    // Limpiar mensaje después de un tiempo
    setTimeout(() => {
      this.ariaLiveMessage.set('');
    }, 1000);
  }
}
