import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-tools-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class ToolsDocComponent extends BaseDocComponent {
  protected currentIndex = 3; // Cuarto documento en la lista

  getMarkdownFile(): string {
    return 'herramientas-accesibilidad.md';
  }
}
