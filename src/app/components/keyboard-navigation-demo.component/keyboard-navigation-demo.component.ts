import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-keyboard-navigation-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-navigation-demo.component.html',
  styleUrls: ['./keyboard-navigation-demo.component.scss'],
})
export class KeyboardNavigationDemoComponent {
  private renderer = inject(Renderer2);

  // Signals para el estado
  isModalOpen = signal(false);
  focusedElement = signal('document');
  tabIndex = signal(0);
  currentTab = signal(0);

  // Gestión del modal
  openModal(): void {
    this.isModalOpen.set(true);
    this.trapFocus();
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  // Atrapar foco en el modal
  private trapFocus(): void {
    setTimeout(() => {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, 100);
  }

  // Manejo de teclas para tabs
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Manejar navegación por flechas en tabs
    if (event.target instanceof HTMLElement && event.target.classList.contains('tab-btn')) {
      this.handleTabNavigation(event);
    }

    // Cerrar modal con Escape
    if (event.key === 'Escape' && this.isModalOpen()) {
      this.closeModal();
    }

    // Actualizar estado del foco
    this.updateFocusInfo(event);
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    const tabs = Array.from(document.querySelectorAll('.tab-btn'));
    const currentIndex = tabs.findIndex((tab) => tab === event.target);

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      this.switchTab(nextIndex, tabs);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      this.switchTab(prevIndex, tabs);
    }
  }

  private switchTab(newIndex: number, tabs: Element[]): void {
    // Actualizar estados ARIA
    tabs.forEach((tab, index) => {
      const tabElement = tab as HTMLElement;
      const isSelected = index === newIndex;

      tabElement.setAttribute('aria-selected', isSelected.toString());
      tabElement.setAttribute('tabindex', isSelected ? '0' : '-1');

      // Actualizar panel correspondiente
      const panelId = tabElement.getAttribute('aria-controls');
      if (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
          if (isSelected) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', '');
          }
        }
      }
    });

    // Enfocar tab seleccionado
    (tabs[newIndex] as HTMLElement).focus();
    this.currentTab.set(newIndex);
  }

  private updateFocusInfo(event: KeyboardEvent): void {
    if (event.target instanceof HTMLElement) {
      const element = event.target;
      const tagName = element.tagName.toLowerCase();
      const tabIndexValue = element.getAttribute('tabindex') || '0';

      this.focusedElement.set(`${tagName} (id: ${element.id || 'none'})`);
      this.tabIndex.set(parseInt(tabIndexValue, 10));
    }
  }

  // Manejo de acciones sin alertas
  handleAction(): void {
    // Implementación accesible sin alertas
    const message = 'Acción ejecutada correctamente';
    this.showAccessibleMessage(message);
  }

  private showAccessibleMessage(message: string): void {
    // Crear un mensaje accesible en lugar de alert()
    const messageDiv = this.renderer.createElement('div');
    messageDiv.setAttribute('role', 'alert');
    messageDiv.setAttribute('aria-live', 'polite');
    messageDiv.className = 'accessible-message';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Remover después de 3 segundos
    setTimeout(() => {
      this.renderer.removeChild(document.body, messageDiv);
    }, 3000);
  }
}
