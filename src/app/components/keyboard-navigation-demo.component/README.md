# Demo de Navegación por Teclado - Regla 4 WCAG 2.1

## Overview

Componente de demostración interactiva que enseña la implementación correcta de navegación por teclado según la Regla 4 de WCAG 2.1. Esta página muestra patrones accesibles y permite probar funcionalidades completas de navegación sin ratón.

## Características Principales

- **Skip Links**: Enlaces de salto para navegación rápida
- **Tab Order Lógico**: Orden secuencial de navegación
- **Focus Visible**: Indicadores visuales claros
- **Keyboard Patterns**: Tabs, modales, y atajos de teclado
- **Estado en Tiempo Real**: Monitor de foco y tab index
- **Ejemplos Correctos/Incorrectos**: Comparación visual de implementaciones

## Cómo Probar la Página

### 1. Acceso a la Demo

Abre tu navegador y ve a:

```
http://localhost:4202/keyboard-navigation
```

### 2. Pruebas de Teclado Recomendadas

#### Prueba Básica - Navegación con Tab

- Presiona `Tab` repetidamente para ver el orden de navegación
- Observa cómo los elementos reciben foco visible
- Presiona `Shift + Tab` para navegar hacia atrás

#### Prueba de Skip Links

- Presiona `Tab` hasta que aparezcan los enlaces de salto
- Presiona `Enter` en "Saltar al contenido principal"
- Verifica que el foco salta directamente a esa sección

#### Prueba de Tabs con Flechas

- Navega hasta los tabs (Tab 1, Tab 2, Tab 3)
- Usa `Arrow Right` y `Arrow Left` para cambiar entre tabs
- Observa cómo los paneles se muestran/ocultan

#### Prueba del Modal

- Navega hasta el botón "Abrir Modal"
- Presiona `Enter` para abrirlo
- Intenta navegar dentro del modal (foco atrapado)
- Presiona `Escape` para cerrarlo

#### Prueba de Estados en Tiempo Real

- Navega por diferentes elementos
- Observa el footer que muestra:
  - Elemento enfocado actualmente
  - Posición del tab index

### 3. Verificaciones de Accesibilidad

#### **Lo que deberías ver:**

- Outline azul visible en todos elementos enfocados
- Orden lógico de navegación
- Funcionamiento completo sin ratón
- Estados ARIA actualizados dinámicamente
- Focus trapping en modales

#### **Problemas comunes a detectar:**

- Elementos sin foco visible
- Orden de tabulación ilógico
- Foco atrapado incorrectamente
- Estados ARIA desincronizados

### 4. Herramientas Adicionales

#### Para testing avanzado:

- **NVDA/JAWS**: Activar lector de pantalla
- **Chrome DevTools**: Inspeccionar estados ARIA
- **axe DevTools**: Auditoría automática

## Implementación Técnica

### Estructura del Componente

```typescript
export class KeyboardNavigationDemoComponent {
  // Signals para el estado
  isModalOpen = signal(false);
  focusedElement = signal('document');
  tabIndex = signal(0);
  currentTab = signal(0);
}
```

### Eventos de Teclado

```typescript
@HostListener('document:keydown', ['$event'])
handleKeyboard(event: KeyboardEvent): void {
  // Navegación por flechas en tabs
  // Cerrar modal con Escape
  // Actualizar estado del foco
}
```

### Patrones ARIA Implementados

- **Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Modal**: `role="dialog"`, `aria-modal="true"`
- **Skip Links**: Enlaces con anclas y posicionamiento absoluto
- **Focus Management**: `tabindex`, `aria-selected`, `aria-controls`

## Estilos CSS Clave

### Focus Indicators

```css
&:focus {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

### Skip Links

```css
.skip-link {
  position: absolute;
  top: -40px;
  &:focus {
    top: 0;
  }
}
```

## Criterios WCAG Cumplidos

- **2.1.1 Teclado**: Operabilidad completa sin ratón
- **2.4.3 Focus Order**: Orden de foco lógico
- **2.4.7 Focus Visible**: Indicadores de foco claros
- **1.3.1 Info and Relationships**: Estructura semántica correcta
- **4.1.2 Name, Role, Value**: ARIA implementado correctamente

## Testing Checklist

### Pruebas Manuales

- [ ] Navegación completa con Tab/Shift+Tab
- [ ] Skip links funcionales
- [ ] Tabs navegables con flechas
- [ ] Modal operable con teclado
- [ ] Focus trapping en modales
- [ ] Estados ARIA sincronizados

### Pruebas Automáticas

- [ ] axe DevTools: 0 violaciones
- [ ] Lighthouse: Accessibility >95%
- [ ] NVDA: Lectura correcta de elementos

## Archivos del Componente

- `keyboard-navigation-demo.component.html` - Template con demostraciones
- `keyboard-navigation-demo.component.ts` - Lógica de navegación y eventos
- `keyboard-navigation-demo.component.scss` - Estilos accesibles
- `README.md` - Esta documentación

## Uso en Producción

Para integrar estos patrones en tus aplicaciones:

1. **Copia los estilos CSS** de focus indicators
2. **Implementa eventos de teclado** similares
3. **Usa la estructura ARIA** de tabs y modales
4. **Añade skip links** en páginas principales
5. **Testing regular** con herramientas recomendadas

## Recursos Adicionales

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

---

**Nota**: Esta demo es parte del curso de accesibilidad digital y cumple con los estándares WCAG 2.1 Nivel AA y la normativa europea de accesibilidad.
