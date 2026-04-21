# Documentación de Navegación

## 📋 Overview

Esta documentación describe la estructura y configuración del sistema de navegación implementado en el dashboard de accesibilidad.

## 🏗️ Estructura de Navegación

### Componentes Principales

#### 1. **Header Component** (`app-header`)

- **Ruta**: `/app/shared/components/layout/header/`
- **Responsabilidades**:
  - Logo y branding
  - Selector de idioma
  - Toggle de modo oscuro
  - Navegación principal
  - Menú de usuario

#### 2. **Sidebar Component** (`app-sidebar`)

- **Ruta**: `/app/shared/components/layout/sidebar/`
- **Responsabilidades**:
  - Menú de navegación colapsable
  - Links de navegación principal
  - Indicador de sección activa
  - Badge de notificaciones

#### 3. **Breadcrumb Component** (`app-breadcrumb`)

- **Ruta**: `/app/shared/components/layout/breadcrumb/`
- **Responsabilidades**:
  - Navegación jerárquica
  - Indicador de página actual
  - Soporte para WCAG 2.4.6

## 🌐 Configuración de Rutas

### Estructura de Navegación

```typescript
interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  badge?: number;
  children?: NavigationItem[];
  isActive?: boolean;
}
```

### Navegación Principal

```typescript
navigationItems: NavigationItem[] = [
  {
    label: 'navigation.home',
    path: '/dashboard',
    icon: 'home'
  },
  {
    label: 'navigation.list',
    path: '/list',
    icon: 'list'
  },
  {
    label: 'navigation.detail',
    path: '/detail/:id',
    icon: 'detail'
  },
  {
    label: 'navigation.performance',
    path: '/performance',
    icon: 'chart'
  }
];
```

### Navegación del Laboratorio

```typescript
laboratoryNavigation: NavigationItem[] = [
  {
    label: 'laboratory',
    path: '/lab',
    icon: 'flask'
  },
  {
    label: 'accessibility',
    path: '/accessibility-demo',
    icon: 'universal-access'
  },
  {
    label: 'accessibilityDemo',
    path: '/accessibility-demo/components',
    icon: 'eye'
  }
];
```

## 📱 Responsive Design

### Breakpoints

- **Desktop**: `> 768px`
  - Header fijo con navegación horizontal
  - Sidebar vertical con ancho completo (250px)
  - Contenido principal con padding compensatorio

### Móvil

- **Móvil**: `≤ 768px`
  - Header compacto con menú hamburguesa
  - Sidebar horizontal debajo del header
  - Navegación optimizada para táctil

## 🎨 Estilos CSS

### Variables Principales

```scss
:root {
  --header-height: 3.75rem; // 60px
  --header-z-index: 1000;
  --sidebar-width: 15.625rem; // 250px
  --sidebar-collapsed-width: 3.75rem; // 60px
}
```

### Header Fijo

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: var(--header-z-index);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Sidebar Responsivo

```scss
.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
  }
}
```

## 🌍 Internacionalización (i18n)

### Estructura JSON

```json
{
  "navigation": {
    "home": "Inicio",
    "list": "Listado",
    "detail": "Detalle",
    "performance": "Rendimiento"
  },
  "laboratory": "Laboratorio",
  "accessibility": "Accesibilidad"
}
```

### Uso en Componentes

```typescript
// Inyectar el servicio de traducción
constructor(private translate: TranslateService) {}

// Usar en el template
<a [routerLink]="item.path">
  {{ item.label | translate }}
</a>

// Con icono
<app-icon [name]="item.icon"></app-icon>
```

## ♿ Accesibilidad WCAG

### Cumplimiento Implementado

#### ✅ WCAG 2.4.6 - Navegación por Pestañas

- **Roles correctos**: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Estados ARIA**: `aria-selected`, `aria-controls`, `aria-expanded`
- **Teclado**: Navegación completa con Tab y flechas

#### ✅ WCAG 2.4.1 - Bloques de Omisión

- **Skip links**: Enlace para saltar al contenido principal
- **Posicionamiento**: `position: absolute`, `top: -40px`
- **Visible al focus**: `transform: translateY(50px)`

#### ✅ WCAG 1.4.3 - Contraste

- **Ratios 4.5:1**: Todos los modos de contraste cumplen
- **15 modos disponibles**: Alto contraste, modos de color específicos
- **Variables CSS**: `!important` para máxima especificidad

#### ✅ WCAG 2.1.1 - Teclado

- **Orden lógico**: Tab order consistente
- **Foco visible**: Estilos de foco amarillo brillantes
- **Sin trampas de teclado**: Navegación fluida sin bloqueos

## 🔄 Estados de Navegación

### Estados del Sidebar

```typescript
enum SidebarState {
  EXPANDED = 'expanded',
  COLLAPSED = 'collapsed',
  HIDDEN = 'hidden',
}
```

### Gestión de Estados

```typescript
@Component({
  selector: 'app-sidebar',
  template: `
    <aside [class]="getSidebarClass()" [attr.aria-hidden]="isHidden">
      <!-- Navigation content -->
    </aside>
  `,
})
export class SidebarComponent {
  isSidebarCollapsed = signal(false);

  getSidebarClass(): string {
    return `sidebar sidebar--${this.isSidebarCollapsed() ? 'collapsed' : 'expanded'}`;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }
}
```

## 📊 Métricas y Rendimiento

### Lazy Loading

```typescript
const routes: Routes = [
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then((m) => m.DetailModule),
    data: { preload: false },
  },
];
```

### Code Splitting

```typescript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      vendor: ['@angular/common', '@angular/platform-browser'],
      commons: ['app/shared/components'],
      navigation: ['app/shared/components/layout'],
    },
  },
};
```

## 🧪 Testing y QA

### Checklist de Navegación

- [ ] **Header responsivo** en todos los breakpoints
- [ ] **Sidebar colapsable** con animación suave
- [ ] **Breadcrumbs funcionando** con WCAG 2.4.6
- [ ] **Skip links** posicionados correctamente
- [ ] **Navegación por teclado** completa
- [ ] **Contraste de colores** funcionando
- [ ] **Traducciones** cargando correctamente
- [ ] **Performance** > 90 en Lighthouse

### Testing Automatizado

```bash
# Ejecutar tests de navegación
npm run test:navigation

# Tests E2E
npm run test:e2e:navigation

# Accesibilidad
npm run test:a11y:navigation
```

## 🚀 Mejoras Futuras

### Planeado

1. **Navegación Virtual**
   - Implementar scroll virtual para listas largas
   - Lazy loading de imágenes en navegación

2. **Search Integrado**
   - Búsqueda global en header
   - Filtros de navegación
   - Historial de navegación

3. **Analytics de Navegación**
   - Track de rutas más visitadas
   - Tiempo de carga por sección
   - Click-through rate

4. **Micro-interacciones**
   - Animaciones suaves al expandir/colapsar
   - Feedback táctil inmediato
   - Estados de carga optimizados

## 📚 Referencias

### Documentación Relacionada

- [Component Documentation](./component-documentation.md)
- [Style Guide](./style-guide.md)
- [Accessibility Guide](./accessibility-guide.md)
- [Performance Guide](./performance-guide.md)

### Estándares WCAG

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Angular Accessibility Guide](https://angular.io/guide/accessibility)

---

_Última actualización: 20 de abril de 2026_
