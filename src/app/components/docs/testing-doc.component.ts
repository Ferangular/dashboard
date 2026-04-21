import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-testing-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class TestingDocComponent extends BaseDocComponent {
  protected currentIndex = 4; // Quinto documento en la lista

  getMarkdownFile(): string {
    return 'guia-prueba-accesibilidad.md';
  }
}
