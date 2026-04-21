import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-forms-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class FormsDocComponent extends BaseDocComponent {
  protected currentIndex = 2; // Tercer documento en la lista

  getMarkdownFile(): string {
    return 'readme-formularios.md';
  }
}
