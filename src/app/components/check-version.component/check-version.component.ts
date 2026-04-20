import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard.component/dashboard.component';

@Component({
  selector: 'app-check-version.component',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './check-version.component.html',
  styleUrl: './check-version.component.scss',
})
export class CheckVersionComponent {
  // Este componente ahora actúa como contenedor del dashboard principal del laboratorio de accesibilidad
}
