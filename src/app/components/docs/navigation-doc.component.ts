import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDocComponent } from './base-doc.component';

@Component({
  selector: 'app-navigation-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-doc.component.html',
  styleUrls: ['./base-doc.component.scss'],
})
export class NavigationDocComponent extends BaseDocComponent {
  protected currentIndex = 0; // Primer documento en la lista

  getMarkdownFile(): string {
    return 'navigation.md';
  }
}
