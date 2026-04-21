# Guide: Práctica de Accesibilidad Implementada

## Cómo Probar las Mejoras de Accesibilidad

### 1. Acceder a la Aplicación

1. **URL:** http://localhost:4201
2. **Navegador recomendado:** Chrome o Firefox
3. **Herramientas necesarias:**
   - Chrome DevTools (F12)
   - Lighthouse (integrado en Chrome)
   - axe DevTools (extensión opcional)

---

## 2. Prueba del Enlace de Salto (Regla 7)

### Pasos:

1. Abre http://localhost:4201
2. Presiona la tecla **Tab** una vez
3. Verás que el foco está en "Saltar al contenido principal"
4. Presiona **Enter**
5. Debes saltar directamente al contenido principal

### Resultado esperado:

- Enlace visible solo cuando tiene foco
- Navegación directa al contenido principal
- Funciona en modo claro y oscuro

---

## 3. Prueba de Estructura Semántica (Regla 1)

### Con NVDA (lector de pantalla):

1. Inicia NVDA
2. Presiona **H** para navegar por encabezados
3. Presiona **D** para navegar por landmarks
4. Debes oír:
   - "Header, landmark"
   - "Navigation, landmark"
   - "Main, landmark"
   - "Nivel 1, [título de la página]"

### Con Chrome DevTools:

1. F12 > Elements
2. Verifica la estructura:
   ```html
   <header>
     <nav aria-label="Menú de navegación principal">
       <main id="main-content" role="main"></main>
     </nav>
   </header>
   ```

---

## 4. Prueba de Contraste de Colores (Regla 3)

### Con Lighthouse:

1. F12 > Lighthouse tab
2. Marca "Accessibility"
3. Click "Analyze page load"
4. Busca "Contrast" en los resultados

### Verificación manual:

1. **Tema claro:**
   - Texto principal: #1a1a1a sobre #fff = 16.43:1
   - Texto secundario: #4a4a4a sobre #fff = 7.63:1

2. **Tema oscuro:**
   - Texto principal: #fff sobre #0d1117 = 15.86:1
   - Texto secundario: #c9d1d9 sobre #0d1117 = 8.59:1

### Cambiar tema:

1. Click en el botón del sol/luna en el header
2. Verifica que el contraste se mantiene

---

## 5. Prueba de Navegación por Teclado (Regla 4)

### Pasos:

1. Presiona **Tab** para navegar hacia adelante
2. Presiona **Shift+Tab** para navegar hacia atrás
3. Presiona **Enter** o **Espacio** para activar elementos
4. Verifica que todos los elementos interactivos son alcanzables

### Elementos que deben tener foco:

- Enlace "Saltar al contenido principal"
- Botón del menú ( )
- Logo (si es interactivo)
- Enlaces de navegación
- Selector de idiomas
- Botón de modo oscuro/claro
- Botón toggle del footer

### Verificación:

- El foco debe ser visible (borde azul)
- El orden debe ser lógico
- No hay "trampas de teclado"

---

## 6. Prueba de Texto Alternativo (Regla 2)

### Con NVDA:

1. Navega sobre las imágenes con las flechas
2. Debes oír las descripciones:
   - "Logo de [nombre app] - Dashboard Angular"

### Verificación manual:

1. Inspecciona el elemento `<img>`
2. Verifica el atributo `alt`:
   ```html
   <img alt="Logo de Angular 21 Performance Lab - Dashboard Angular" />
   ```

---

## 7. Prueba de Jerarquía de Encabezados (Regla 6)

### Con NVDA:

1. Presiona **H** repetidamente
2. Debes oír:
   - "Nivel 1, [título principal]"
   - "Nivel 2, Configuración del Sistema"
   - "Nivel 3, Panel de Depuración"

### Verificación manual:

1. F12 > Elements
2. Busca los encabezados:
   ```html
   <h1 id="page-title">...</h1>
   <h2 id="config-title">...</h2>
   <h3 id="debug-title">...</h3>
   ```

---

## 8. Prueba de ARIA (Regla 10)

### Elementos ARIA implementados:

1. **Enlace de salto:** `href="#main-content"`
2. **Navegación:** `aria-label="Menú de navegación principal"`
3. **Contenido principal:** `id="main-content" role="main"`
4. **Badge de entorno:** `role="status" aria-live="polite"`
5. **Botones:** `aria-label` descriptivos

### Verificación con Chrome Accessibility Tree:

1. F12 > Elements > Accessibility tab
2. Selecciona elementos y verifica sus propiedades

---

## 9. Prueba con Herramientas Automáticas

### Lighthouse:

1. F12 > Lighthouse
2. Marcar solo "Accessibility"
3. Click "Generate report"
4. **Puntuación objetivo:** 95+

### axe DevTools (si está instalado):

1. F12 > axe tab
2. Click "Analyze"
3. No debe haber violaciones críticas

### ESLint:

```bash
npm run lint
```

No debe haber errores de accesibilidad.

---

## 10. Prueba de Zoom (WCAG 1.4.4)

### Pasos:

1. Ctrl + + (aumentar zoom hasta 200%)
2. Verifica que:
   - Todo el contenido sigue visible
   - No hay pérdida de funcionalidad
   - El layout no se rompe
   - La navegación por teclado sigue funcionando

---

## 11. Prueba de Modo Alto Contraste

### En Windows:

1. Configuración > Accesibilidad > Alto contraste
2. Activa un tema de alto contraste
3. Verifica que la aplicación sigue siendo usable

### Verificación:

- Los colores del tema deben respetar la configuración del sistema
- El contraste debe ser aún mayor

---

## 12. Checklist de Validación

### Para cada prueba, marca o :

#### Estructura Semántica:

- [ ] Header con `<header>`
- [ ] Navegación con `<nav>` y `aria-label`
- [ ] Contenido principal con `<main>` y `id`
- [ ] Encabezados jerárquicos (h1, h2, h3)

#### Navegación por Teclado:

- [ ] Enlace de salto funcional
- [ ] Todos los elementos alcanzables con Tab
- [ ] Foco visible y claro
- [ ] Orden lógico de tabulación

#### Contraste de Colores:

- [ ] Texto principal: 16.43:1 (claro) / 15.86:1 (oscuro)
- [ ] Texto secundario: 7.63:1 (claro) / 8.59:1 (oscuro)
- [ ] Colores funcionales: 4.5:1+
- [ ] Modo claro y oscuro funcionales

#### ARIA y Lectores de Pantalla:

- [ ] Etiquetas descriptivas en controles
- [ ] Roles ARIA correctos
- [ ] Estados dinámicos anunciados
- [ ] Estructura comprensible sin CSS

#### Herramientas Automáticas:

- [ ] Lighthouse: 95+
- [ ] axe: 0 violaciones críticas
- [ ] ESLint: 0 errores de accesibilidad

---

## 13. Problemas Comunes y Soluciones

### Si el enlace de salto no funciona:

- Verifica que el `main` tenga `id="main-content"`
- Verifica que el enlace tenga `href="#main-content"`

### Si el contraste no es suficiente:

- Usa las variables CSS definidas en `styles.scss`
- Verifica que no haya estilos inline que sobreescriban

### Si la navegación por teclado falla:

- Verifica que los elementos interactivos no tengan `tabindex="-1"`
- Asegúrate que no haya elementos con `display: none` que deban ser alcanzables

---

## 14. Reporte de Pruebas

### Resultados esperados:

- **WCAG 2.2 AA Compliance:** 100%
- **Lighthouse Accessibility Score:** 95+
- **axe Critical Issues:** 0
- **Keyboard Navigation:** Complete
- **Screen Reader Support:** Full

### Documenta tus resultados:

```markdown
## Pruebas Realizadas - [Fecha]

### Herramientas Automáticas:

- Lighthouse: [puntuación]/100
- axe: [número] violaciones
- ESLint: [número] errores

### Pruebas Manuales:

- Navegación por teclado: /
- Contraste de colores: /
- Lector de pantalla: /
- Zoom 200%: /

### Problemas Encontrados:

1. [Descripción del problema]
   - Severidad: Alta/Media/Baja
   - Solución propuesta: [solución]

### Mejoras Sugeridas:

1. [Mejora sugerida]
```

---

## 15. Siguientes Pasos

Una vez validadas estas mejoras:

1. **Documentar** los resultados en el checklist
2. **Implementar** las reglas pendientes (formularios, enlaces descriptivos)
3. **Automatizar** las pruebas en el pipeline de CI/CD
4. **Capacitar** al equipo en accesibilidad
5. **Establecer** accesibilidad como requisito en todos los PRs

---
