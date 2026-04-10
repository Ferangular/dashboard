import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../../../core/interfaces/navigation.interface';
import { AppSettingsService } from '../../../../core/services/app-settings.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  private appSettings = inject(AppSettingsService);
  private sidebarService = inject(SidebarService);
  private i18nService = inject(I18nService);

  isSidebarOpen = signal(false);

  appConfig = computed(() => this.appSettings.config);

  availableLanguages = this.i18nService.getAvailableLanguages();

  currentLanguage = computed(() => this.i18nService.getCurrentLanguage());

  navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'navigation.home',
      path: '/',
      icon: 'home',
      order: 1,
    },
    {
      id: 'list',
      label: 'navigation.list',
      path: '/list',
      icon: 'list',
      order: 2,
    },
    {
      id: 'performance',
      label: 'navigation.performance',
      path: '/performance-lab',
      icon: 'speed',
      order: 3,
    },
    {
      id: 'contact',
      label: 'navigation.contact',
      path: '/contact',
      icon: 'mail',
      order: 4,
    },
    {
      id: 'settings',
      label: 'navigation.settings',
      path: '/settings',
      icon: 'settings',
      order: 5,
    },
  ];

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  changeLanguage(languageCode: string): void {
    this.i18nService.setLanguage(languageCode);
  }

  translate(key: string): string {
    return this.i18nService.translate(key);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    if (window.innerWidth <= 768) {
      this.isSidebarOpen.set(false);
    }
  }
}
