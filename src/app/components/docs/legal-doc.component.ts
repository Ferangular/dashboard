import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-legal-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class LegalDocComponent extends BaseDocComponent {
  protected currentIndex = 6; // Séptimo documento en la lista

  getMarkdownFile(): string {
    return 'marco_legal_accesibilidad.md';
  }
}
