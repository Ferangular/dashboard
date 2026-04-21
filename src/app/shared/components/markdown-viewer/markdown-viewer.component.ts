import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss'],
})
export class MarkdownViewerComponent implements OnInit {
  content = signal<SafeHtml>('');
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal('');
  pageTitle = signal('');
  wordCount = signal(0);
  readingTime = signal('0 min');
  lastModified = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // Lista de documentos disponibles para navegación
  readonly documentList: string[] = [
    'navigation.md',
    'readme-estructura.md',
    'readme-formularios.md',
    'herramientas-accesibilidad.md',
    'guia-prueba-accesibilidad.md',
    'accessibility-checklist.md',
    'marco_legal_accesibilidad.md',
  ];

  // Señal para el documento actual
  currentDocumentIndex = signal(0);

  ngOnInit() {
    this.loadMarkdownContent();
    this.updateCurrentDocumentIndex();
  }

  async loadMarkdownContent(): Promise<void> {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.errorMessage.set('');

    try {
      const filePath = this.route.snapshot.paramMap.get('path');
      if (!filePath) {
        throw new Error('No se especificó la ruta del archivo');
      }

      // Construir la URL completa del archivo
      const fullPath = `/docs/${filePath}`;

      // Cargar el contenido del archivo markdown
      const response = await fetch(fullPath);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const markdownText = await response.text();

      // Convertir markdown a HTML
      const htmlContent = await this.convertMarkdownToHtml(markdownText);

      // Sanitizar el HTML
      const safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContent);

      this.content.set(safeHtml);
      this.pageTitle.set(this.extractTitle(markdownText));
      this.wordCount.set(this.countWords(markdownText));
      this.readingTime.set(this.calculateReadingTime(markdownText));
      this.lastModified.set(new Date().toLocaleDateString());
    } catch (error: unknown) {
      console.error('Error cargando markdown:', error);
      this.hasError.set(true);
      this.errorMessage.set((error as Error)?.message || 'Error desconocido al cargar el archivo');
    } finally {
      this.isLoading.set(false);
    }
  }

  async convertMarkdownToHtml(markdown: string): Promise<string> {
    // Implementación básica de conversión markdown a HTML
    // En producción, podrías usar una librería como marked.js
    const html = markdown
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')

      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*\*(.*?)\*/g, '<strong>$1</strong>')

      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')

      // Code blocks
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')

      // Lists
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Envolver en un contenedor
    return `<div class="markdown-content">${html}</div>`;
  }

  extractTitle(markdown: string): string {
    // Buscar el primer header (# ## o ###)
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }

    // Si no hay header, usar el nombre del archivo
    const filePath = this.route.snapshot.paramMap.get('path') || '';
    return filePath
      .replace(/\.md$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase() + match.toLowerCase());
  }

  countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  calculateReadingTime(text: string): string {
    const wordsPerMinute = 200; // Promedio de lectura
    const words = this.countWords(text);
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  }

  goBack(): void {
    const currentIndex = this.currentDocumentIndex();
    if (currentIndex > 0) {
      // Si hay un documento anterior, ir al anterior
      this.navigatePrevious();
    } else {
      // Si estamos en el primer documento, ir al índice
      this.goToIndex();
    }
  }

  goToIndex(): void {
    // Navegar al índice principal (home)
    this.router.navigate(['/']);
  }

  openInNewTab(): void {
    const filePath = this.route.snapshot.paramMap.get('path');
    if (filePath) {
      window.open(`/docs/${filePath}`, '_blank');
    }
  }

  downloadMarkdown(): void {
    const filePath = this.route.snapshot.paramMap.get('path');
    if (filePath) {
      window.open(`/docs/${filePath}?download=1`, '_blank');
    }
  }

  retryLoad(): void {
    this.loadMarkdownContent();
  }

  // Métodos para navegación entre documentos
  navigatePrevious(): void {
    const currentIndex = this.currentDocumentIndex();
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousDocument = this.documentList[previousIndex];
      this.router.navigate(['/docs', previousDocument]);
    }
  }

  navigateNext(): void {
    const currentIndex = this.currentDocumentIndex();
    if (currentIndex < this.documentList.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextDocument = this.documentList[nextIndex];
      this.router.navigate(['/docs', nextDocument]);
    }
  }

  canGoToPrevious(): boolean {
    return this.currentDocumentIndex() > 0;
  }

  canGoToNext(): boolean {
    const currentIndex = this.currentDocumentIndex();
    return currentIndex < this.documentList.length - 1;
  }

  // Actualizar el índice del documento actual
  private updateCurrentDocumentIndex(): void {
    const currentPath = this.route.snapshot.paramMap.get('path');
    if (currentPath) {
      const index = this.documentList.indexOf(currentPath);
      if (index !== -1) {
        this.currentDocumentIndex.set(index);
      }
    }
  }
}
