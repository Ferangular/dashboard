import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-doc',
  standalone: true,
  imports: [CommonModule],
  template: '', // Template definido en clases hijas
  styleUrls: ['./base-doc.component.scss'],
})
export abstract class BaseDocComponent implements OnInit {
  content = signal<SafeHtml>('');
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal('');
  pageTitle = signal('');
  wordCount = signal(0);
  readingTime = signal('0 min');
  lastModified = signal('');

  protected router = inject(Router);
  protected sanitizer = inject(DomSanitizer);

  // Lista de todos los documentos para navegación
  protected readonly documentRoutes = [
    { path: '/docs/navigation', title: 'Navegación Accesible' },
    { path: '/docs/structure', title: 'Estructura y Organización' },
    { path: '/docs/forms', title: 'Formularios Accesibles' },
    { path: '/docs/tools', title: 'Herramientas de Accesibilidad' },
    { path: '/docs/testing', title: 'Guía de Testing' },
    { path: '/docs/checklist', title: 'Checklist WCAG' },
    { path: '/docs/legal', title: 'Marco Legal' },
  ];

  // Índice del documento actual (definido en clases hijas)
  protected abstract currentIndex: number;

  ngOnInit() {
    this.loadMarkdownContent();
  }

  abstract getMarkdownFile(): string;

  async loadMarkdownContent(): Promise<void> {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.errorMessage.set('');

    try {
      const filePath = this.getMarkdownFile();
      const fullPath = `/docs/${filePath}`;

      const response = await fetch(fullPath);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const markdownText = await response.text();
      const htmlContent = await this.convertMarkdownToHtml(markdownText);
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

    return `<div class="markdown-content">${html}</div>`;
  }

  extractTitle(markdown: string): string {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }

    const fileName = this.getMarkdownFile();
    return fileName
      .replace(/\.md$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase() + match.toLowerCase());
  }

  countWords(text: string): number {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  calculateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = this.countWords(text);
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  }

  // Métodos de navegación
  navigatePrevious(): void {
    if (this.currentIndex > 0) {
      const previousRoute = this.documentRoutes[this.currentIndex - 1];
      this.router.navigate([previousRoute.path]);
    }
  }

  navigateNext(): void {
    if (this.currentIndex < this.documentRoutes.length - 1) {
      const nextRoute = this.documentRoutes[this.currentIndex + 1];
      this.router.navigate([nextRoute.path]);
    }
  }

  goToIndex(): void {
    this.router.navigate(['/']);
  }

  openInNewTab(): void {
    const filePath = this.getMarkdownFile();
    window.open(`/docs/${filePath}`, '_blank');
  }

  downloadMarkdown(): void {
    const filePath = this.getMarkdownFile();
    const link = document.createElement('a');
    link.href = `/docs/${filePath}`;
    link.download = filePath;
    link.click();
  }

  retryLoad(): void {
    this.loadMarkdownContent();
  }

  canGoToPrevious(): boolean {
    return this.currentIndex > 0;
  }

  canGoToNext(): boolean {
    return this.currentIndex < this.documentRoutes.length - 1;
  }
}
