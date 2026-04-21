import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-structure-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class StructureDocComponent extends BaseDocComponent {
  protected currentIndex = 1; // Segundo documento en la lista

  getMarkdownFile(): string {
    return 'readme-estructura.md';
  }
}
