import { Component, computed, inject, signal } from '@angular/core';
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
      id: 'contact',
      label: 'navigation.contact',
      path: '/contact',
      icon: '📧',
      order: 5,
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
}
