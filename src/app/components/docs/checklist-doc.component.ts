import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-checklist-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class ChecklistDocComponent extends BaseDocComponent {
  protected currentIndex = 5; // Sexto documento en la lista

  getMarkdownFile(): string {
    return 'accessibility-checklist.md';
  }
}
